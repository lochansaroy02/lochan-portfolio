import logging
from collections.abc import Iterator

from groq import Groq
from mem0 import Memory

from app.configs.memory import add_to_memory, get_memories
from app.core.config import GROQ_API_KEY

logger = logging.getLogger(__name__)

client = Groq(api_key=GROQ_API_KEY)

model = "openai/gpt-oss-120b"

# How many past turns of a conversation to keep. Keeps the prompt (and the bill)
# bounded no matter how long a visitor keeps chatting.
MAX_HISTORY_MESSAGES = 12

STREAM_ERROR_MESSAGE = (
    "Sorry, something went wrong on my end. Please try asking that again."
)


config = {
    "llm": {
        "provider": "groq",
        "config": {
            "model": model,
            "temperature": 0,
            "max_tokens": 1000,
        },
    }
}


def get_response(messages, temp=0):
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temp,
        extra_body={"reasoning_format": "hidden"},
    )

    return response.choices[0].message.content


def get_response_by_prompt(user_id: str, system_prompt, user_prompt, is_stream: bool):
    add_to_memory(user_id, user_prompt)
    memories = get_memories(user_id)
    memory_text = ""

    if memories:
        memory_text = "\n".join(f"- {memory}" for memory in memories)

    final_system_prompt = f"""{system_prompt} Here are some things you remember about the user: {memory_text}"""

    messages = [
        {"role": "system", "content": final_system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    response = client.chat.completions.create(
        stream=is_stream,
        model=model,
        messages=messages,
        extra_body={"reasoning_format": "hidden"},
    )
    if is_stream:
        return response
    return response.choices[0].message.content


def stream_chat(system_prompt: str, history: list[dict]) -> Iterator[str]:
    """Stream an answer for a multi turn conversation.

    `history` is the running conversation from the client, oldest first, as
    {"role": "user" | "assistant", "content": str}. Only the last
    MAX_HISTORY_MESSAGES turns are sent on.
    """

    messages = [
        {"role": "system", "content": system_prompt},
        *history[-MAX_HISTORY_MESSAGES:],
    ]

    try:
        stream = client.chat.completions.create(
            stream=True,
            model=model,
            messages=messages,
            temperature=0.3,
            max_tokens=800,
            extra_body={"reasoning_format": "hidden"},
        )

        for chunk in stream:
            if not chunk.choices:
                continue

            content = chunk.choices[0].delta.content

            if content:
                yield content
    except Exception:
        # The response has already started, so we cannot switch to a 500 here.
        # Log it for us and give the visitor something readable.
        logger.exception("Groq stream failed")
        yield STREAM_ERROR_MESSAGE


def stream_response(system_prompt, user_prompt) -> Iterator[str]:
    """Stream an answer to a single prompt, with no conversation history."""

    return stream_chat(system_prompt, [{"role": "user", "content": user_prompt}])

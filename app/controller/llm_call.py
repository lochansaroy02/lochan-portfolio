from groq import Groq
from mem0 import Memory

from app.configs.memory import add_to_memory, get_memories
from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

model = "openai/gpt-oss-120b"


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


def stream_response(system_prompt, user_prompt):
    stream = get_response_by_prompt(
        system_prompt,
        user_prompt,
        is_stream=True,
    )

    for chunk in stream:
        content = chunk.choices[0].delta.content

        if content:
            yield content

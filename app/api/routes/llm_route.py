from typing import Literal

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.configs.memory import add_to_memory
from app.controller.llm_call import get_response_by_prompt, stream_chat
from app.prompts.llm import system_prompt
from app.prompts.resume import resume_system_prommpt
from app.utils.parse_json import parse_to_json
from app.utils.read_file import read_resume

router = APIRouter(prefix="/llm")


class chatRequest(BaseModel):
    user_prompt: str
    user_id: str


class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatStreamRequest(BaseModel):
    messages: list[Message] = Field(min_length=1, max_length=40)


@router.post("/chat")
def get_users(req: chatRequest):

    data = get_response_by_prompt(
        system_prompt=system_prompt,
        user_id=req.user_id,
        user_prompt=req.user_prompt,
        is_stream=False,
    )
    add_to_memory(user_id=req.user_id, content=data)
    return data


@router.post("/chat/stream")
def chat_stream(req: ChatStreamRequest):
    """Public portfolio chatbot. Streams the answer back as plain text."""

    if req.messages[-1].role != "user":
        raise HTTPException(
            status_code=400, detail="The last message must be from the user"
        )

    history = [message.model_dump() for message in req.messages]

    return StreamingResponse(
        stream_chat(system_prompt, history),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-store",
            # Stops nginx from buffering the stream into one lump.
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/resume")
def get_resume():
    resume_text = read_resume()
    user_prompt = f"analyse this resume {resume_text}"
    user_id = "232"
    data = get_response_by_prompt(
        system_prompt=resume_system_prommpt,
        user_id=user_id,
        user_prompt=user_prompt,
        is_stream=False,
    )
    parsed_data = parse_to_json(data)
    return parsed_data

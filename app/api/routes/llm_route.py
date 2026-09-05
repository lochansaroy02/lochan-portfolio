from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.configs.memory import add_to_memory
from app.controller.llm_call import get_response_by_prompt
from app.prompts.llm import system_prompt
from app.prompts.resume import resume_system_prommpt
from app.utils.parse_json import parse_to_json
from app.utils.read_file import read_resume

router = APIRouter(prefix="/llm")


class chatRequest(BaseModel):
    user_prompt: str
    user_id: str


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
    # return StreamingResponse(
    #     stream_response(system_prompt, req.user_prompt), media_type="text/plain"
    # )


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

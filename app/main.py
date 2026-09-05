from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.llm_route import router as llm_router
from app.configs.memory import init_memory_db
from app.core.config import ALLOWED_ORIGINS
from app.utils.file_reader import router as file_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

init_memory_db()


@app.get("/")
def home():
    return {"message": "Api is running"}


app.include_router(llm_router)
app.include_router(file_router)

from fastapi import FastAPI

from app.api.routes.llm_route import router as llm_router
from app.configs.memory import init_memory_db
from app.utils.file_reader import router as file_router

app = FastAPI()

init_memory_db()


@app.get("/")
def home():
    return {"message": "Api is running"}


app.include_router(llm_router)
app.include_router(file_router)

from io import BytesIO

from docx import Document
from fastapi import APIRouter, File, UploadFile
from pypdf import PdfReader

router = APIRouter(prefix="/files")


def read_uploaded_file(filename: str, file_content: bytes) -> str:

    if filename.lower().endswith(".pdf"):
        reader = PdfReader(BytesIO(file_content))

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        return text

    elif filename.lower().endswith(".docx"):
        document = Document(BytesIO(file_content))

        text = ""

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text

    else:
        raise ValueError("Only PDF and DOCX files are supported")


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    content = await file.read()

    return {"message": "data fetched successfully", "data": content}

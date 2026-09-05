from io import BytesIO

import requests
from pypdf import PdfReader

resume_url = "https://ik.imagekit.io/u1vdxgalxo/full_stack_resume.pdf"


def read_resume():
    response = requests.get(resume_url)
    response.raise_for_status()

    pdf_file = BytesIO(response.content)
    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text

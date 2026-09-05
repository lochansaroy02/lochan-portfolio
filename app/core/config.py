# app/core/config.py

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]

ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# print(GROQ_API_KEY)
if not GROQ_API_KEY:
    raise ValueError(f"GROQ_API_KEY not found. Looking in: {ENV_FILE}")

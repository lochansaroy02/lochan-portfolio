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

# Origins allowed to call this API from a browser.
# Set ALLOWED_ORIGINS in .env as a comma separated list for production, e.g.
# ALLOWED_ORIGINS=https://lochan-saroy.vercel.app,https://lochansaroy.com
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if origin.strip()
]

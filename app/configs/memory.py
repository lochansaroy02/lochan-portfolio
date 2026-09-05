import json
import sqlite3

from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

MODEL = "openai/gpt-oss-120b"

DB_PATH = "memory.db"


def init_memory_db():
    conn = sqlite3.connect(DB_PATH)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            memory TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def extract_memories(content: str) -> list[str]:

    prompt = f"""
You are a memory extraction system.

Extract only useful long-term information about the user
that would be useful in future conversations.

Do NOT save:
- temporary requests
- questions
- greetings
- general facts
- unnecessary conversation details

Return ONLY valid JSON.

Format:
{{
    "memories": [
        "memory 1",
        "memory 2"
    ]
}}

User message:
{content}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You extract long-term user memories."},
            {"role": "user", "content": prompt},
        ],
        temperature=0,
        extra_body={"reasoning_format": "hidden"},
    )

    content = response.choices[0].message.content

    try:
        data = json.loads(content)
        return data.get("memories", [])
    except json.JSONDecodeError:
        return []


def add_to_memory(user_id: str, content: str):

    memories = extract_memories(content)

    if not memories:
        return

    conn = sqlite3.connect(DB_PATH)

    for memory in memories:
        conn.execute(
            """
            INSERT INTO memories (user_id, memory)
            VALUES (?, ?)
            """,
            (user_id, memory),
        )

    conn.commit()
    conn.close()


def get_memories(user_id: str) -> list[str]:

    conn = sqlite3.connect(DB_PATH)

    cursor = conn.execute(
        """
        SELECT memory
        FROM memories
        WHERE user_id = ?
        ORDER BY created_at DESC
        """,
        (user_id,),
    )

    memories = [row[0] for row in cursor.fetchall()]

    conn.close()

    return memories

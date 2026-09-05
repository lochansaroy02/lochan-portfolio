# AI Portfolio

Lochan Saroy's portfolio site and the AI service that powers its chatbot.

```
web/   Next.js 16 portfolio (App Router, Tailwind v4, Motion)
api/   FastAPI service — Groq-backed chatbot that answers questions
       about Lochan from his resume
```

The homepage has an "Ask me anything" launcher. It posts to `web`'s own
`/api/chat` route, which proxies to `api`'s `POST /llm/chat/stream` and
streams the reply back token by token. The browser never talks to `api`
directly, so the service URL stays server-side.

## Running locally

Both halves need to be up.

```bash
# terminal 1 — API on :8000
cd api
uv sync
uv run uvicorn app.main:app --reload

# terminal 2 — web on :3000
cd web
pnpm install
pnpm dev
```

Then open http://localhost:3000/home

## Configuration

Each half has its own `.env`, neither is committed. Copy the examples:

```bash
cp api/.env.example api/.env    # GROQ_API_KEY (required)
cp web/.env.example web/.env    # AI_API_URL, EMAIL_USER, EMAIL_PASS
```

- `api` will refuse to start without `GROQ_API_KEY`.
- `web` falls back to `http://127.0.0.1:8000` if `AI_API_URL` is unset,
  which is fine locally but leaves the chatbot dead in production. Set it
  to the deployed API's public URL.
- `ALLOWED_ORIGINS` on `api` only matters if a browser calls it directly.
  The proxy route means it normally does not.

## Deploying

The two halves deploy separately: `web` to Vercel, `api` anywhere that
runs a Python service. Set `AI_API_URL` in Vercel to the deployed API URL.

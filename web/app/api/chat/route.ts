import { NextResponse } from 'next/server';

// Streaming needs the Node runtime and an uncached, per-request response.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AI_API_URL = process.env.AI_API_URL ?? 'http://127.0.0.1:8000';

// Keep a single visitor from sending an unbounded conversation upstream.
const MAX_MESSAGES = 40;
const MAX_CONTENT_LENGTH = 2000;

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const isValidMessage = (message: unknown): message is Message => {
    if (typeof message !== 'object' || message === null) return false;

    const { role, content } = message as Partial<Message>;

    return (
        (role === 'user' || role === 'assistant') &&
        typeof content === 'string' &&
        content.trim().length > 0 &&
        content.length <= MAX_CONTENT_LENGTH
    );
};

export async function POST(request: Request) {
    let messages: unknown;

    try {
        ({ messages } = await request.json());
    } catch {
        return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
        return NextResponse.json({ message: 'Invalid messages' }, { status: 400 });
    }

    if (!messages.every(isValidMessage)) {
        return NextResponse.json({ message: 'Invalid messages' }, { status: 400 });
    }

    let upstream: Response;

    try {
        upstream = await fetch(`${AI_API_URL}/llm/chat/stream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
            // Pass the abort through, so closing the chat stops the upstream work.
            signal: request.signal,
        });
    } catch (error) {
        console.error('Chat upstream unreachable:', error);
        return NextResponse.json({ message: 'The assistant is offline right now' }, { status: 503 });
    }

    if (!upstream.ok || !upstream.body) {
        console.error('Chat upstream error:', upstream.status);
        return NextResponse.json({ message: 'The assistant could not answer' }, { status: 502 });
    }

    return new Response(upstream.body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Accel-Buffering': 'no',
        },
    });
}

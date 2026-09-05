"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bot, MessageCircle, Send, Square, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const SUGGESTIONS = [
    "What's your tech stack?",
    "Tell me about the Digital Malkhana project",
    "Are you available for freelance work?",
];

const GREETING =
    "Hey! I'm Lochan's assistant. Ask me anything about his work, tech stack or experience.";

// Keeps the request payload bounded; the backend trims again on its side.
const MAX_HISTORY = 20;

// Tailwind has no typography plugin here, so style the markdown nodes directly.
const markdown = {
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1">{children}</ol>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-white">{children}</strong>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
        >
            {children}
        </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
        <code className="rounded bg-white/10 px-1 py-0.5 text-[0.85em] font-mono">{children}</code>
    ),
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // null until mounted: the platform is unknowable during SSR, and rendering
    // a guess would cause a hydration mismatch on the shortcut hint.
    const [isMac, setIsMac] = useState<boolean | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const abortRef = useRef<AbortController | null>(null);

    // Follow the answer as it streams in.
    useEffect(() => {
        const node = scrollRef.current;
        if (node) node.scrollTop = node.scrollHeight;
    }, [messages, isStreaming]);

    useEffect(() => {
        const platform =
            (navigator as Navigator & { userAgentData?: { platform?: string } })
                .userAgentData?.platform ||
            navigator.platform ||
            navigator.userAgent;

        setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
    }, []);

    // Cmd+K (mac) / Ctrl+K (windows, linux) toggles the panel.
    // Browsers bind this to the address bar, but unlike Ctrl+T or Ctrl+W it is
    // cancellable, which is why command palettes everywhere claim it.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const shortcutHeld = isMac
                ? event.metaKey && !event.ctrlKey
                : event.ctrlKey && !event.metaKey;

            if (shortcutHeld && !event.altKey && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setIsOpen((open) => !open);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isMac]);

    // Escape closes the panel.
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    // Never leave a request running after the panel is gone.
    useEffect(() => {
        if (!isOpen) abortRef.current?.abort();
    }, [isOpen]);

    useEffect(() => () => abortRef.current?.abort(), []);

    const stop = () => abortRef.current?.abort();

    const send = async (text: string) => {
        const question = text.trim();
        if (!question || isStreaming) return;

        const history = [...messages, { role: "user" as const, content: question }].slice(
            -MAX_HISTORY,
        );

        setMessages([...history, { role: "assistant", content: "" }]);
        setInput("");
        setError(null);
        setIsStreaming(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: history }),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                throw new Error(`Request failed with ${response.status}`);
            }

            const reader = response.body.getReader();
            // stream: true so multi byte characters split across chunks survive.
            const decoder = new TextDecoder();

            for (;;) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                if (!chunk) continue;

                setMessages((previous) => {
                    const next = [...previous];
                    const last = next[next.length - 1];
                    next[next.length - 1] = { ...last, content: last.content + chunk };
                    return next;
                });
            }
        } catch (caught) {
            if (caught instanceof DOMException && caught.name === "AbortError") {
                // Visitor pressed stop or closed the panel; keep what streamed in.
            } else {
                console.error("Chat failed:", caught);
                setError("Couldn't reach the assistant. Please try again.");
                // Drop the empty assistant bubble we optimistically added.
                setMessages((previous) =>
                    previous[previous.length - 1]?.content === ""
                        ? previous.slice(0, -1)
                        : previous,
                );
            }
        } finally {
            setIsStreaming(false);
            abortRef.current = null;
        }
    };

    return (
        <>
            {/* Launcher. Sits above the mobile nav pill, bottom right on desktop. */}
            <motion.button
                onClick={() => setIsOpen((open) => !open)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close chat" : "Ask me anything"}
                aria-expanded={isOpen}
                className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex h-14 items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-600 text-white shadow-[0_8px_30px_rgba(8,145,178,0.45)] transition-colors hover:bg-cyan-500 ${
                    isOpen ? "w-14" : "w-14 md:w-auto md:px-5"
                }`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isOpen ? "close" : "open"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center"
                    >
                        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
                    </motion.span>
                </AnimatePresence>

                {/* Spelling out what it does makes it far easier to spot. */}
                {!isOpen && (
                    <span className="hidden whitespace-nowrap text-sm font-medium md:inline">
                        Ask me anything
                    </span>
                )}

                {/* Rendered only once the platform is known, so SSR and the
                    client agree on the markup. */}
                {!isOpen && isMac !== null && (
                    <kbd className="hidden rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-sans text-[11px] font-semibold tracking-wide md:inline">
                        {isMac ? "⌘K" : "Ctrl K"}
                    </kbd>
                )}

                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500">
                        <span className="absolute inset-0 animate-ping rounded-full bg-green-500" />
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        role="dialog"
                        aria-modal="false"
                        aria-label="Chat with Lochan's assistant"
                        className="fixed inset-x-3 bottom-44 top-20 md:inset-x-auto md:top-auto md:right-8 md:bottom-28 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-inset ring-white/5 md:h-[520px] md:w-[380px]"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1d2e] text-cyan-400">
                                <Bot size={18} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-white">Ask about Lochan</p>
                                <p className="flex items-center gap-1.5 text-xs text-neutral-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    Usually replies instantly
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                                className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                            <div className="flex gap-2.5">
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a1d2e] text-cyan-400">
                                    <Bot size={15} />
                                </span>
                                <div className="rounded-2xl rounded-tl-sm bg-white/5 px-3.5 py-2.5 text-sm text-neutral-200">
                                    {GREETING}
                                </div>
                            </div>

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : ""}`}
                                >
                                    {message.role === "assistant" && (
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a1d2e] text-cyan-400">
                                            <Bot size={15} />
                                        </span>
                                    )}

                                    <div
                                        className={`max-w-[80%] px-3.5 py-2.5 text-sm ${
                                            message.role === "user"
                                                ? "rounded-2xl rounded-tr-sm bg-cyan-600/90 text-white"
                                                : "rounded-2xl rounded-tl-sm bg-white/5 text-neutral-200"
                                        }`}
                                    >
                                        {message.role === "assistant" ? (
                                            <>
                                                <ReactMarkdown remarkPlugins={[gfm]} components={markdown}>
                                                    {message.content}
                                                </ReactMarkdown>
                                                {isStreaming &&
                                                    index === messages.length - 1 &&
                                                    message.content === "" && (
                                                        <span className="flex gap-1 py-1">
                                                            {[0, 1, 2].map((dot) => (
                                                                <span
                                                                    key={dot}
                                                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500"
                                                                    style={{ animationDelay: `${dot * 0.15}s` }}
                                                                />
                                                            ))}
                                                        </span>
                                                    )}
                                            </>
                                        ) : (
                                            message.content
                                        )}
                                    </div>

                                    {message.role === "user" && (
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-neutral-300">
                                            <User size={15} />
                                        </span>
                                    )}
                                </div>
                            ))}

                            {error && (
                                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                                    {error}
                                </p>
                            )}

                            {messages.length === 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {SUGGESTIONS.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => send(suggestion)}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Composer */}
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                send(input);
                            }}
                            className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                maxLength={2000}
                                placeholder="Ask a question..."
                                aria-label="Your question"
                                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-cyan-500/50"
                            />

                            {isStreaming ? (
                                <button
                                    type="button"
                                    onClick={stop}
                                    aria-label="Stop generating"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                >
                                    <Square size={14} fill="currentColor" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    aria-label="Send message"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Send size={15} />
                                </button>
                            )}
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;

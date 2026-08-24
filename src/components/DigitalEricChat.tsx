import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';

const STARTERS = [
  'What is AGOS?',
  'How did you get into cybersecurity?',
  'What does Full-Stack AI Engineer mean for you?',
  "What's your proudest project?",
];

function apiBase(): string {
  return (import.meta.env.VITE_CHAT_API_URL ?? '').replace(/\/+$/, '');
}

type Msg = { role: 'user' | 'assistant'; content: string };

export function DigitalEricChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [coldStart, setColdStart] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function setLastAssistant(content: string) {
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { role: 'assistant', content };
      return copy;
    });
  }

  useEffect(() => {
    const el = scrollRef.current;
    el?.scrollTo?.({ top: el.scrollHeight });
  }, [messages, coldStart]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || streaming) return;
    setInput('');

    if (!apiBase()) {
      setMessages((m) => [
        ...m,
        { role: 'user', content: question },
        {
          role: 'assistant',
          content:
            "My backend isn't wired up yet — the agent isn't deployed. Eric knows; poke him to ship me.",
        },
      ]);
      return;
    }

    const history = messages.slice(-8);
    setMessages((m) => [
      ...m,
      { role: 'user', content: question },
      { role: 'assistant', content: '' },
    ]);
    setStreaming(true);
    setColdStart(true);

    try {
      const resp = await fetch(`${apiBase()}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history }),
      });
      if (!resp.ok || !resp.body) throw new Error(`HTTP ${resp.status}`);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let answer = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6)) as { token?: string };
          if (payload.token && payload.token !== '[DONE]') {
            answer += payload.token;
            setColdStart(false);
            setLastAssistant(answer);
          }
        }
      }
      if (!answer) {
        setLastAssistant('(empty reply — check the agent logs)');
      }
    } catch {
      setLastAssistant(
        'I hit a snag reaching my backend just now — give it another try in a minute.',
      );
    } finally {
      setStreaming(false);
      setColdStart(false);
    }
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-1">
          <button
            onClick={() => setOpen(true)}
            aria-label="Chat with Digital Eric, Eric's AI double"
            className="w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center border-2 border-[var(--accent-border)]"
          >
            <Bot className="w-7 h-7" />
          </button>
          <span
            className="px-1.5 py-px rounded-full text-[9px] font-mono uppercase tracking-wider bg-white dark:bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
            data-testid="ai-badge-closed"
          >
            AI
          </span>
        </div>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 w-auto sm:w-[380px] rounded-2xl bg-white dark:bg-[var(--bg)] border border-gray-300 dark:border-[var(--border)] shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-[var(--border)] bg-[var(--accent-bg)]">
            <div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text-h)] leading-tight">Digital Eric</p>
              <span
                className="inline-block mt-0.5 px-1.5 py-px rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-[var(--code-bg)] text-[var(--text)] border border-[var(--border)]"
                data-testid="ai-badge"
              >
                AI Avatar
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg hover:bg-[var(--social-bg)] text-[var(--text)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[220px]">
            {messages.length === 0 && !coldStart && (
              <div className="space-y-2">
                <p className="text-sm text-[var(--text)]">
                  Hi! I'm <strong className="text-[var(--text-h)]">Digital Eric</strong> — ask me
                  anything about Eric's projects, security work, or path into AI engineering.
                </p>
                <div className="flex flex-wrap gap-2 pt-1" data-testid="starter-chips">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-2.5 py-1 rounded-full text-xs border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {coldStart && (
              <div
                className="text-xs font-mono text-[var(--text)] animate-pulse"
                data-testid="cold-start"
              >
                waking Digital Eric up… (first message after a nap takes a few seconds)
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                <div
                  className={`inline-block max-w-[85%] text-left text-sm leading-relaxed px-3 py-2 rounded-xl whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-200 dark:border-[var(--border)]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Digital Eric…"
              aria-label="Message Digital Eric"
              maxLength={500}
              className="flex-1 text-sm bg-transparent outline-none text-[var(--text-h)] placeholder:text-[var(--text)] placeholder:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              aria-label="Send"
              className="p-2 rounded-lg bg-[var(--accent)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

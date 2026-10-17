import { useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import ScholarshipCard from "./ScholarshipCard";
import { scholarships as dummyScholarships } from "../data/scholarships";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
).replace(/\/+$/, "");

const suggestions = [
  "Find scholarships for me",
  "What documents are required?",
  "How do I check my eligibility?",
];

const initialMessages = [
  {
    role: "assistant",
    text: "Hello! Welcome to AadiVidya. 🎓 Ask me about scholarships, eligibility, application documents, or financial assistance.",
  },
];

// Search local dummy scholarship data.
function searchDummyScholarships(query) {
  const allScholarships = Array.isArray(dummyScholarships)
    ? dummyScholarships
    : [];

  if (!allScholarships.length) return [];

  const stopWords = new Set([
    "the",
    "a",
    "an",
    "is",
    "are",
    "for",
    "me",
    "my",
    "i",
    "to",
    "of",
    "and",
    "in",
    "on",
    "how",
    "what",
    "do",
    "can",
    "you",
    "find",
    "show",
    "please",
    "about",
  ]);

  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));

  // Rank scholarships according to matching words.
  const ranked = allScholarships
    .map((scholarship) => {
      const searchableText = [
        scholarship.title,
        scholarship.description,
        scholarship.type,
        scholarship.provider,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const score = words.reduce((total, word) => {
        return total + (searchableText.includes(word) ? 1 : 0);
      }, 0);

      return { scholarship, score };
    })
    .sort((a, b) => b.score - a.score);

  const matches = ranked
    .filter((item) => item.score > 0)
    .map((item) => item.scholarship);

  // Always show available scholarships, even when no words match.
  return matches.length ? matches : allScholarships;
}

// Fetch scholarships from Flask when the endpoint is available.
async function findScholarships(query) {
  try {
    const response = await fetch(
      `${API_URL}/api/scholarships/search?q=${encodeURIComponent(query)}`
    );

    if (response.ok) {
      const data = await response.json();

      const results = Array.isArray(data)
        ? data
        : data.scholarships ?? data.results ?? data.data ?? [];

      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
    }
  } catch (error) {
    // Endpoint may not exist yet. Use dummy data below.
    console.info(
      "Scholarship API unavailable. Using local scholarship data."
    );
  }

  return searchDummyScholarships(query);
}

// Get an AI/chatbot answer when the Flask chat endpoint is available.
async function getChatReply(message) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) return null;

    const data = await response.json();

    return data.reply || data.response || data.answer || null;
  } catch {
    return null;
  }
}

export default function ScholarshipChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(initialMessages);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  function handleNewChat() {
    if (loading) return;

    setMessages(initialMessages);
    setQuestion("");
  }

  async function sendMessage(text = question) {
    const message = text.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: message },
    ]);

    setQuestion("");
    setIsOpen(true);
    setLoading(true);

    try {
      // Search scholarships and request an assistant response together.
      const [results, reply] = await Promise.all([
        findScholarships(message),
        getChatReply(message),
      ]);

      const answer =
        reply ||
        (results.length
          ? `I found ${results.length} scholarship${
              results.length === 1 ? "" : "s"
            } that you can explore below. Check the eligibility criteria and deadlines before applying.`
          : "I couldn't find any scholarships in the available data.");

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: answer,
          scholarships: results,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.message ||
            "Something went wrong. Please try again.",
          scholarships: searchDummyScholarships(message),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating chatbot button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={
          isOpen ? "Close scholarship assistant" : "Open scholarship assistant"
        }
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#657A3F] text-white shadow-xl transition hover:scale-105 hover:bg-[#526532]"
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <section
          aria-label="AadiVidya AI scholarship assistant"
          className="fixed bottom-24 right-4 z-50 flex h-[min(650px,80vh)] w-[min(430px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#E8EEDB] bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#657A3F] p-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Bot size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">AadiVidya AI</h2>
              <p className="text-xs text-[#E8EEDB]">
                Your scholarship assistant
              </p>
            </div>

            <button
              type="button"
              onClick={handleNewChat}
              disabled={loading}
              title="Start a new conversation"
              className="flex shrink-0 items-center gap-1 rounded-lg border border-white/30 px-2 py-2 text-xs font-semibold transition hover:bg-white/10 disabled:opacity-50"
            >
              <RotateCcw size={14} />
              New Chat
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="shrink-0 rounded-lg p-2 transition hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conversation */}
          <div
            className="flex-1 space-y-4 overflow-y-auto bg-[#FFFDF7] p-3"
            aria-live="polite"
            aria-busy={loading}
          >
            {messages.map((item, index) => (
              <div
                key={`${index}-${item.role}`}
                className="space-y-3"
              >
                <div
                  className={`flex ${
                    item.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] whitespace-pre-wrap break-words rounded-2xl px-3 py-3 text-sm leading-6 ${
                      item.role === "user"
                        ? "rounded-br-sm bg-[#657A3F] text-white"
                        : "rounded-bl-sm border border-[#E8EEDB] bg-white text-[#293127]"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>

                {/* Scholarship cards returned for this question */}
                {item.role === "assistant" &&
                  item.scholarships?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#657A3F]">
                        SCHOLARSHIPS FOR YOU ({item.scholarships.length})
                      </p>

                      {item.scholarships.map((scholarship) => (
                        <ScholarshipCard
                          key={scholarship.id}
                          scholarship={scholarship}
                        />
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-[#657A3F]">
                <Sparkles size={16} className="animate-pulse" />
                Searching scholarships...
              </div>
            )}

            {!loading && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-[#293127]/60">
                  TRY ASKING
                </p>

                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="block w-full rounded-xl border border-[#E8EEDB] bg-white px-3 py-2.5 text-left text-xs font-medium text-[#657A3F] transition hover:bg-[#E8EEDB]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-2 border-t border-[#E8EEDB] bg-white p-3"
          >
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask your scholarship question..."
              rows={1}
              disabled={loading}
              aria-label="Your scholarship question"
              className="max-h-28 min-w-0 flex-1 resize-y rounded-xl border border-[#E8EEDB] px-3 py-3 text-sm text-[#293127] outline-none focus:border-[#9BB06D] focus:ring-2 focus:ring-[#E8EEDB] disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!question.trim() || loading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#657A3F] text-white transition hover:bg-[#526532] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="bg-white px-3 pb-3 text-center text-[10px] text-slate-500">
            Verify scholarship requirements with the official provider.
          </p>
        </section>
      )}
    </>
  );
}


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

// Backend API URL
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://scholarship-management-system-0hfy.onrender.com"
).replace(/\/+$/, "");

const suggestions = [
  "Find scholarships for me",
  "What documents are required?",
  "How do I check my eligibility?",
];

// Required chatbot profile fields
const createInitialProfile = () => ({
  _pending_question: null,
  _last_results: [],
  _last_offset: 0,
  _last_total: 0,
  _last_filters: {},
});

const createInitialMessages = () => [
  {
    role: "assistant",
    text: "Hello! Welcome to Adivya. 🎓 Ask me about scholarships, eligibility, application documents, or financial assistance.",
    scholarships: [],
  },
];

// Extract scholarship results from different response formats
function getScholarships(data, fallbackProfile) {
  const candidates = [
    data?.scholarships,
    data?.results,
    data?.data?.scholarships,
    data?.data?.results,
    data?.profile?._last_results,
    fallbackProfile?._last_results,
  ];

  return candidates.find(Array.isArray) || [];
}

// Extract a reply from a plain string or JSON object
function getReplyFromData(data) {
  if (typeof data === "string" || typeof data === "number") {
    return String(data);
  }

  if (!data || typeof data !== "object") {
    return "";
  }

  const reply =
    data.reply ??
    data.response ??
    data.answer ??
    data.message ??
    data.msg ??
    data.data?.reply ??
    data.data?.response ??
    data.data?.message;

  if (typeof reply === "string" || typeof reply === "number") {
    return String(reply);
  }

  return "";
}

/**
 * Connect to Flask POST /chatbot.
 *
 * Expected request:
 * {
 *   message: "Hello",
 *   profile: {
 *     _pending_question: null,
 *     _last_results: [],
 *     _last_offset: 0,
 *     _last_total: 0,
 *     _last_filters: {}
 *   }
 * }
 */
async function getChatReply(message, profile) {
  let response;

  try {
    response = await fetch(`${API_URL}/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify({
        message,
        profile: profile ?? createInitialProfile(),
      }),
    });
  } catch {
    throw new Error(
      "Could not connect to the chatbot server. Check your internet connection and confirm that the backend is running."
    );
  }

  // Read as text first to support both plain text and JSON responses.
  const raw = await response.text();

  let data = raw;

  if (raw.trim()) {
    try {
      data = JSON.parse(raw);
    } catch {
      // The server may return plain text instead of JSON.
      data = raw;
    }
  } else {
    data = null;
  }

  if (!response.ok) {
    const serverMessage = getReplyFromData(data);

    throw new Error(
      serverMessage ||
        `Chatbot request failed (HTTP ${response.status}). Please try again.`
    );
  }

  const reply = getReplyFromData(data).trim();

  if (!reply) {
    throw new Error(
      "The chatbot server returned an empty reply. Please try another message."
    );
  }

  const updatedProfile =
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    data.profile &&
    typeof data.profile === "object"
      ? data.profile
      : profile ?? createInitialProfile();

  return {
    reply,
    profile: updatedProfile,
    scholarships: getScholarships(data, updatedProfile),
  };
}

export default function ScholarshipChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(createInitialMessages);
  const [profile, setProfile] = useState(createInitialProfile);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the latest message when the conversation changes.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  // Reset the conversation.
  function handleNewChat() {
    if (loading) return;

    setMessages(createInitialMessages());
    setQuestion("");
    setProfile(createInitialProfile());

    inputRef.current?.focus();
  }

  // Send a message to the backend.
  async function sendMessage(text = question) {
    const message = String(text ?? "").trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: message,
      },
    ]);

    setQuestion("");
    setIsOpen(true);
    setLoading(true);

    try {
      const result = await getChatReply(message, profile);

      setProfile(result.profile);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: result.reply,
          scholarships: result.scholarships,
        },
      ]);
    } catch (error) {
      console.error("Scholarship chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "Unable to connect to the scholarship assistant. Please try again.",
          scholarships: [],
          isError: true,
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
          isOpen
            ? "Close scholarship assistant"
            : "Open scholarship assistant"
        }
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#9BB06D] text-white shadow-xl transition hover:scale-105 hover:bg-[#293127] focus:outline-none focus:ring-4 focus:ring-[#E8EEDB]"
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <section
          aria-label="Adivya AI scholarship assistant"
          className="fixed bottom-24 right-4 z-50 flex h-[min(650px,80vh)] w-[min(430px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#E8EEDB] bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#293127] p-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Bot size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">Adivya AI</h2>
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
            className="flex-1 space-y-4 overflow-y-auto bg-[#E8EEDB] p-3"
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
                        ? "rounded-br-sm bg-[#9BB06D] text-white"
                        : item.isError
                          ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-800"
                          : "rounded-bl-sm border border-[#E8EEDB] bg-white text-[#293127]"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>

                {/* Scholarship cards returned by the backend */}
                {item.role === "assistant" &&
                  item.scholarships?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#293127]">
                        SCHOLARSHIPS FOR YOU (
                        {item.scholarships.length})
                      </p>

                      {item.scholarships.map(
                        (scholarship, scholarshipIndex) => (
                          <ScholarshipCard
                            key={
                              scholarship?.id ??
                              scholarship?._id ??
                              scholarship?.scholarship_id ??
                              scholarshipIndex
                            }
                            scholarship={scholarship}
                          />
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div
                className="flex items-center gap-2 text-sm text-[#293127]"
                role="status"
              >
                <Sparkles size={16} className="animate-pulse" />
                Thinking and searching scholarships...
              </div>
            )}

            {/* Suggested questions */}
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
                    className="block w-full rounded-xl border border-[#E8EEDB] bg-white px-3 py-2.5 text-left text-xs font-medium text-[#293127] transition hover:bg-[#E8EEDB]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-2 border-t border-[#E8EEDB] bg-white p-3"
          >
            <textarea
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent?.isComposing
                ) {
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9BB06D] text-white transition hover:bg-[#293127] disabled:cursor-not-allowed disabled:opacity-50"
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

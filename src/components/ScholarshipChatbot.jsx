import { useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  RotateCcw,
} from "lucide-react";

// Backend API URL
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://scholarship-management-system-0hfy.onrender.com"
).replace(/\/+$/, "");

// Local storage key
const PROFILE_STORAGE_KEY = "adivya_chatbot_profile";

// Suggested questions
const suggestions = [
  "Find scholarships for me",
  "What documents are required?",
  "How do I check my eligibility?",
];

// Default chatbot profile
const createInitialProfile = () => ({
  _pending_question: null,
  _last_results: [],
  _last_offset: 0,
  _last_total: 0,
  _last_filters: {},
});

// Safely read the saved profile
function getSavedProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!saved) {
      return createInitialProfile();
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return createInitialProfile();
    }

    return {
      ...createInitialProfile(),
      ...parsed,
    };
  } catch (error) {
    console.error("Could not read chatbot profile:", error);
    return createInitialProfile();
  }
}

// Save the updated profile
function saveProfile(profile) {
  try {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.error("Could not save chatbot profile:", error);
  }
}

// Reset saved chatbot state
function resetSavedProfile() {
  const initialProfile = createInitialProfile();
  saveProfile(initialProfile);
  return initialProfile;
}

// Initial assistant message
const createInitialMessages = () => [
  {
    role: "assistant",
    text: "Hello! Welcome to Adivya. 🎓 Ask me about scholarships, eligibility, application documents, or financial assistance.",
  },
];

// Extract the actual assistant response.
// Your backend uses details.chat_response_msg.
function getReplyFromData(data) {
  if (typeof data === "string" || typeof data === "number") {
    return String(data);
  }

  if (!data || typeof data !== "object") {
    return "";
  }

  const candidates = [
    data?.details?.chat_response_msg,
    data?.details?.chat_response_followup,
    data?.details?.chat_response,
    data?.chat_response_msg,
    data?.chat_response,
    data?.data?.details?.chat_response_msg,
    data?.data?.details?.chat_response_followup,
    data?.data?.details?.chat_response,
    data?.data?.chat_response_msg,
    data?.data?.chat_response,

    data?.details?.reply,
    data?.details?.response,
    data?.details?.answer,
    data?.reply,
    data?.response,
    data?.answer,
    data?.data?.reply,
    data?.data?.response,
    data?.data?.answer,
  ];

  const reply = candidates.find(
    (value) =>
      typeof value === "string" &&
      value.trim().length > 0
  );

  if (reply) {
    return reply.trim();
  }

  // Generic API messages are a last resort.
  const fallbackCandidates = [
    data?.details?.message,
    data?.details?.msg,
    data?.message,
    data?.msg,
    data?.data?.details?.message,
    data?.data?.details?.msg,
    data?.data?.message,
    data?.data?.msg,
  ];

  const fallback = fallbackCandidates.find(
    (value) =>
      typeof value === "string" &&
      value.trim().length > 0
  );

  return fallback ? fallback.trim() : "";
}

// Extract scholarships from the backend response
function getScholarshipsFromData(data) {
  const scholarships =
    data?.details?.chat_response_scholarships ??
    data?.chat_response_scholarships ??
    data?.data?.details?.chat_response_scholarships ??
    [];

  return Array.isArray(scholarships) ? scholarships : [];
}

// Extract the next question from the backend response
function getFollowupFromData(data) {
  const followup =
    data?.details?.chat_response_followup ??
    data?.chat_response_followup ??
    data?.data?.details?.chat_response_followup ??
    "";

  return typeof followup === "string"
    ? followup.trim()
    : "";
}

// Extract the updated profile
function getUpdatedProfile(data, currentProfile) {
  const updatedProfile =
    data?.details?.updated_profile ??
    data?.updated_profile ??
    data?.details?.profile ??
    data?.profile ??
    data?.data?.details?.updated_profile ??
    data?.data?.updated_profile ??
    data?.data?.profile;

  if (
    updatedProfile &&
    typeof updatedProfile === "object" &&
    !Array.isArray(updatedProfile)
  ) {
    return {
      ...createInitialProfile(),
      ...(currentProfile || {}),
      ...updatedProfile,
    };
  }

  return currentProfile || createInitialProfile();
}

// Format scholarship amounts in Indian currency
function formatAmount(amount) {
  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return "Not specified";
  }

  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Not specified";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

// Format nullable values
function displayValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Not specified";
  }

  return String(value);
}

// Connect to Flask POST /chatbot
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
  } catch (error) {
    throw new Error(
      "Could not connect to the chatbot server. Check your internet connection and confirm that the backend is running."
    );
  }

  const raw = await response.text();
  let data = raw;

  if (raw.trim()) {
    try {
      data = JSON.parse(raw);
    } catch {
      // Support plain-text backend responses.
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

  // Extract the actual chatbot response, not the generic API message.
  const reply = getReplyFromData(data);

  if (!reply) {
    throw new Error(
      "The chatbot server returned an empty reply. Please try another message."
    );
  }

  return {
    reply,
    followup: getFollowupFromData(data),
    scholarships: getScholarshipsFromData(data),
    profile: getUpdatedProfile(data, profile),
  };
}

export default function ScholarshipChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(createInitialMessages);
  const [profile, setProfile] = useState(getSavedProfile);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  // Start a fresh conversation
  function handleNewChat() {
    if (loading) return;

    const initialProfile = resetSavedProfile();

    setMessages(createInitialMessages());
    setQuestion("");
    setProfile(initialProfile);

    inputRef.current?.focus();
  }

  // Close the chatbot and reset the conversation
  function handleCloseChat() {
    if (loading) return;

    const initialProfile = resetSavedProfile();

    setProfile(initialProfile);
    setMessages(createInitialMessages());
    setQuestion("");
    setIsOpen(false);
  }

  // Send a message to the backend
  async function sendMessage(text = question) {
    const message = String(text ?? "").trim();

    if (!message || loading) return;

    const currentProfile = profile;

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
      const result = await getChatReply(
        message,
        currentProfile
      );

      // Save the latest profile returned by the backend
      saveProfile(result.profile);
      setProfile(result.profile);

      // Display the summary, scholarship results, and follow-up
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: result.reply,
          followup: result.followup,
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
        onClick={() => {
          if (isOpen) {
            handleCloseChat();
          } else {
            setIsOpen(true);
          }
        }}
        aria-label={
          isOpen
            ? "Close scholarship assistant"
            : "Open scholarship assistant"
        }
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#657A3F] text-white shadow-xl transition hover:scale-105 hover:bg-[#526332] focus:outline-none focus:ring-4 focus:ring-[#E8EEDB]"
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
          <div className="flex items-center gap-2 bg-[#657A3F] p-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Bot size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">Adivya AI</h2>
              <p className="text-xs text-[#FFF8E7]">
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
              onClick={handleCloseChat}
              disabled={loading}
              aria-label="Close chatbot"
              className="shrink-0 rounded-lg p-2 transition hover:bg-white/10 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conversation */}
          <div
            className="flex-1 space-y-4 overflow-y-auto bg-[#FFF8E7] p-3"
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
                        : item.isError
                          ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-800"
                          : "rounded-bl-sm border border-[#E8EEDB] bg-white text-[#293127]"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>

                {/* Actual scholarships returned by Flask */}
                {item.role === "assistant" &&
                  Array.isArray(item.scholarships) &&
                  item.scholarships.length > 0 && (
                    <div className="space-y-3">
                      {item.scholarships.map(
                        (scholarship, scholarshipIndex) => (
                          <article
                            key={
                              scholarship.scholarship_id ??
                              `${scholarship.name}-${scholarshipIndex}`
                            }
                            className="overflow-hidden rounded-xl border border-[#E8EEDB] bg-white shadow-sm"
                          >
                            <div className="border-b border-[#E8EEDB] bg-[#E8EEDB]/60 p-3">
                              <h3 className="text-sm font-bold text-[#526332]">
                                {scholarship.name ||
                                  "Scholarship"}
                              </h3>

                              <p className="mt-2 text-xl font-bold text-[#293127]">
                                {formatAmount(
                                  scholarship.benefit_amount
                                )}
                              </p>

                              <p className="text-xs text-[#293127]/60">
                                Scholarship benefit
                              </p>
                            </div>

                            <div className="space-y-2 p-3 text-xs text-[#293127]">
                              <div className="flex justify-between gap-3">
                                <span className="font-semibold">
                                  Minimum education
                                </span>
                                <span className="text-right">
                                  {displayValue(
                                    scholarship.min_education_level
                                  )}
                                </span>
                              </div>

                              <div className="flex justify-between gap-3">
                                <span className="font-semibold">
                                  Maximum age
                                </span>
                                <span>
                                  {displayValue(
                                    scholarship.max_age
                                  )}
                                </span>
                              </div>

                              <div className="flex justify-between gap-3">
                                <span className="font-semibold">
                                  Income limit
                                </span>
                                <span className="text-right">
                                  {formatAmount(
                                    scholarship.max_income
                                  )}
                                </span>
                              </div>

                              <div className="flex justify-between gap-3">
                                <span className="font-semibold">
                                  Minimum marks
                                </span>
                                <span>
                                  {scholarship.min_passing_percentage != null
                                    ? `${scholarship.min_passing_percentage}%`
                                    : "Not specified"}
                                </span>
                              </div>

                              {scholarship.deadline && (
                                <div className="flex justify-between gap-3">
                                  <span className="font-semibold">
                                    Deadline
                                  </span>
                                  <span>
                                    {scholarship.deadline}
                                  </span>
                                </div>
                              )}

                              {scholarship.minority_category_req && (
                                <div className="flex justify-between gap-3">
                                  <span className="font-semibold">
                                    Required category
                                  </span>
                                  <span>
                                    {scholarship.minority_category_req}
                                  </span>
                                </div>
                              )}

                              <div className="flex justify-between gap-3">
                                <span className="font-semibold">
                                  Status
                                </span>
                                <span className="rounded-full bg-[#E8EEDB] px-2 py-1 font-semibold capitalize text-[#526332]">
                                  {scholarship.status ||
                                    "Possible"}
                                </span>
                              </div>
                            </div>

                            {/* Eligibility reasons from the backend */}
                            {Array.isArray(scholarship.reasons) &&
                              scholarship.reasons.length > 0 && (
                                <div className="mx-3 mb-3 rounded-lg border border-[#E8EEDB] p-3">
                                  <h4 className="mb-2 text-xs font-bold text-[#526332]">
                                    Eligibility information
                                  </h4>

                                  <ul className="list-inside list-disc space-y-1 text-xs leading-5 text-[#293127]">
                                    {scholarship.reasons.map(
                                      (reason, reasonIndex) => (
                                        <li
                                          key={`${scholarship.scholarship_id ?? scholarshipIndex}-reason-${reasonIndex}`}
                                        >
                                          {reason}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </article>
                        )
                      )}
                    </div>
                  )}

                {/* Follow-up question from the backend */}
                {item.role === "assistant" &&
                  item.followup && (
                    <div className="max-w-[92%] rounded-xl border border-[#E8EEDB] bg-[#E8EEDB] p-3 text-sm leading-6 text-[#293127]">
                      {item.followup}
                    </div>
                  )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div
                className="flex items-center gap-2 text-sm text-[#526332]"
                role="status"
              >
                <Sparkles
                  size={16}
                  className="animate-pulse"
                />
                Thinking and preparing your response...
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
                    className="block w-full rounded-xl border border-[#E8EEDB] bg-white px-3 py-2.5 text-left text-xs font-medium text-[#526332] transition hover:bg-[#E8EEDB]"
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
              onChange={(event) =>
                setQuestion(event.target.value)
              }
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
              className="max-h-28 min-w-0 flex-1 resize-y rounded-xl border border-[#E8EEDB] px-3 py-3 text-sm text-[#293127] outline-none focus:border-[#657A3F] focus:ring-2 focus:ring-[#E8EEDB] disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!question.trim() || loading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#657A3F] text-white transition hover:bg-[#526332] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="bg-white px-3 pb-3 text-center text-[10px] text-[#293127]/60">
            Verify scholarship requirements with the official provider.
          </p>
        </section>
      )}
    </>
  );
}

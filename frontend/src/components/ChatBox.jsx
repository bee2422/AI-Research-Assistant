import { useState } from "react";
import axios from "axios";
import doodle2 from "../assets/doodle2.png";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    setAnswer(""); // reset previous answer

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ask",
        { question }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Error getting answer."
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Enter key se question ask hoga
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div
      id="chat-section"
      className="mt-10 rounded-3xl p-8 shadow-xl relative overflow-hidden"
      style={{
        backgroundImage: `url(${doodle2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl text-[#EDE8C8] mb-4 font-bold"
        >
          Ask Your Research Paper
        </h2>

        {/* TEXTAREA */}
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about the paper..."
          rows="3"
          style={{ fontFamily: "'Lora', serif" }}
          className="w-full p-4 rounded-2xl border border-[#7A8FAD] outline-none resize-none bg-transparent text-[#2C3A5C] placeholder:text-[#2C3A5C]/60"
        />

        {/* BUTTONS */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={askQuestion}
            disabled={loading}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="bg-[#2C3A5C] text-[#EDE8C8] px-6 py-3 rounded-full hover:scale-105 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {/* CLEAR BUTTON */}
          <button
            onClick={() => {
              setQuestion("");
              setAnswer("");
            }}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="bg-[#2C3A5C] text-[#EDE8C8] px-6 py-3 rounded-full hover:scale-105 transition font-semibold"
          >
            Clear
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p
            style={{ fontFamily: "'Lora', serif" }}
            className="mt-4 text-[#EDE8C8]"
          >
            Thinking... 
          </p>
        )}

        {/* ANSWER BOX */}
        {answer && (
          <div className="mt-6 bg-[#F7F1D5] p-6 rounded-2xl shadow-md">
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl text-[#46516D] mb-3 font-bold"
            >
              Answer 
            </h3>

            <p
              style={{ fontFamily: "'Lora', serif" }}
              className="text-gray-700 whitespace-pre-wrap leading-relaxed"
            >
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
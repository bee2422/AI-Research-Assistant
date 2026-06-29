import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import starBg from "../assets/star-bg.png";

function ChatHistory() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  const fetchHistory = () => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then((res) => {
        setPaper(res.data[id]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const deleteChat = (chatIndex) => {
    axios
      .delete(`http://127.0.0.1:8000/history/${id}/chat/${chatIndex}`)
      .then(() => {
        fetchHistory();
      })
      .catch((err) => console.log(err));
  };

  if (!paper) {
    return (
      <div
        className="min-h-screen p-10"
        style={{
          backgroundImage: `url(${starBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "350px",
          backgroundColor: "#F4EFD6",
        }}
      >
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-10"
      style={{
        backgroundImage: `url(${starBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "350px",
        backgroundColor: "#F4EFD6",
      }}
    >
      {/* PDF Name */}
      <div className="bg-[#3F4C74] px-10 py-5 rounded-[35px] inline-block mb-10">
        <h1
          className="text-4xl text-[#F4EFD6] font-bold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {paper.name}
        </h1>
      </div>

      {/* Summary */}
      {paper.summary && (
        <div className="bg-[#FFF8DC]/90 p-6 rounded-3xl shadow mb-6">
          <p className="font-bold text-[#3F4C74] text-lg mb-3">
            📄 Summary
          </p>
          <p className="text-gray-700 whitespace-pre-line">
            {paper.summary}
          </p>
        </div>
      )}

      {/* Chat History */}
      {!paper.chat_history || paper.chat_history.length === 0 ? (
        <p className="text-gray-500 text-lg">No chats yet.</p>
      ) : (
        <div className="space-y-6">
          {paper.chat_history.map((chat, index) => (
            <div
              key={index}
              className="bg-[#FFF8DC]/90 p-6 rounded-3xl shadow relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteChat(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 hover:scale-110 transition text-xl"
                title="Delete this chat"
              >
                🗑️
              </button>

              <p className="font-bold text-[#3F4C74] mb-1">Question:</p>
              <p className="mb-4 text-gray-700">{chat.question}</p>
              <p className="font-bold text-[#3F4C74] mb-1">Answer:</p>
              <p className="text-gray-700">{chat.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatHistory;

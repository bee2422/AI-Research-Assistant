import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import starBg from "../assets/star-bg.png";
import { useSettings } from "../context/SettingsContext";

function ResearchHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { favoritesFirst } = useSettings();

  const fetchHistory = () => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleFavorite = (index) => {
    const updated = !history[index].favorite;

    axios
      .put(
        `http://127.0.0.1:8000/history/${index}/favorite`,
        {
          favorite: updated,
        }
      )
      .then(() => {
        fetchHistory();
      })
      .catch((err) => console.log(err));
  };

  const deletePaper = (e, index) => {
    e.stopPropagation();

    const ok = window.confirm(
      "Delete this paper?"
    );

    if (!ok) return;

    axios
      .delete(
        `http://127.0.0.1:8000/history/${index}`
      )
      .then(() => {
        fetchHistory();
      })
      .catch((err) => console.log(err));
  };

  const displayedHistory = favoritesFirst
    ? [...history].sort(
        (a, b) =>
          Number(b.favorite) -
          Number(a.favorite)
      )
    : history;

  const filteredHistory =
    displayedHistory.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

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
      <div className="flex justify-center mb-12">
        <div className="bg-[#3F4C74] px-16 py-5 rounded-[35px] shadow-xl">
          <h1
            className="text-5xl font-bold text-[#F4EFD6]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Research History ✮˚.⋆
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search papers..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            max-w-3xl
            p-4
            rounded-[25px]
            bg-[#FFF8DC]/90
            border
            border-[#3F4C74]/20
            shadow-md
            outline-none
            text-[#46516D]
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-xl text-gray-500 text-center">
          No matching papers found.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredHistory.map(
            (item, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    `/history/${index}`
                  )
                }
                className="
                  bg-[#FFF8DC]/90
                  p-7
                  rounded-[30px]
                  shadow-lg
                  border
                  border-[#3F4C74]/20
                  cursor-pointer
                  hover:scale-[1.02]
                  transition
                "
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-xl font-bold text-[#3F4C74]"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                    }}
                  >
                    {item.name}
                  </h2>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(
                          index
                        );
                      }}
                      className="text-3xl hover:scale-110 transition"
                    >
                      {item.favorite
                        ? "⭐"
                        : "☆"}
                    </button>

                    <button
                      onClick={(e) =>
                        deletePaper(
                          e,
                          index
                        )
                      }
                      className="text-xl text-red-400 hover:text-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 mt-2 text-base">
                  {item.date}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ResearchHistory;
import { useEffect, useState } from "react";
import axios from "axios";
import starBg from "../assets/star-bg.png";
import { useSettings } from "../context/SettingsContext";

function Settings() {
  const {
    favoritesFirst,
    setFavoritesFirst,
  } = useSettings();

  const [totalPapers, setTotalPapers] = useState(0);
  const [favoritePapers, setFavoritePapers] = useState(0);

  function clearHistory() {
    const ok = window.confirm(
      "Are you sure you want to clear your research history?"
    );

    if (!ok) return;

    axios
      .delete("http://127.0.0.1:8000/history/clear")
      .then(() => {
        setTotalPapers(0);
        setFavoritePapers(0);
        alert("History cleared successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  }

  useEffect(() => {
    const updateStats = () => {
      axios
        .get("http://127.0.0.1:8000/history")
        .then((res) => {
          const data = res.data;

          setTotalPapers(data.length);

          if (favoritesFirst) {
            setFavoritePapers(
              data.filter(
                (paper) => paper.favorite
              ).length
            );
          } else {
            setFavoritePapers(0);
          }
        })
        .catch((err) => console.log(err));
    };

    updateStats();

    const interval = setInterval(
      updateStats,
      2000
    );

    return () => clearInterval(interval);
  }, [favoritesFirst]);

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
      {/* Heading */}
      <div className="inline-block bg-[#3F4C74] px-12 py-5 rounded-[35px] shadow-xl mb-10">
        <h1
          className="text-5xl font-bold text-[#F4EFD6]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Settings Page ✮˚.⋆
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-[#FFF8DC]/90 rounded-[35px] p-10 shadow-xl max-w-5xl text-[#46516D]">

        {/* Research Preferences */}
        <h2
          className="text-3xl mb-8 text-[#46516D]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Research Preferences
        </h2>

        <div className="flex justify-between items-center">
          <span className="text-xl">
            ⋆ Show Favorites
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={favoritesFirst}
              onChange={() =>
                setFavoritesFirst(
                  !favoritesFirst
                )
              }
              className="sr-only peer"
            />

            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#3F4C74] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        <hr className="my-10 border-[#D9D0A9]" />

        {/* Data Management */}
        <h2
          className="text-3xl mb-8 text-[#46516D]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Data Management
        </h2>

        <button
          onClick={clearHistory}
          className="bg-[#E6D37A] text-[#46516D] px-6 py-3 rounded-2xl shadow-md border border-[#D1BD5C] hover:bg-[#DDC95F] hover:scale-105 transition"
        >
          🗑 Clear History
        </button>

        <hr className="my-10 border-[#D9D0A9]" />

        {/* App Statistics */}
        <h2
          className="text-3xl mb-8 text-[#46516D]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          App Statistics
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#F7F1D5] p-6 rounded-2xl shadow">
            <p>Total Papers</p>

            <h3 className="text-4xl font-bold text-[#3F4C74]">
              {totalPapers}
            </h3>
          </div>

          <div className="bg-[#F7F1D5] p-6 rounded-2xl shadow">
            <p>Favorite Papers</p>

            <h3 className="text-4xl font-bold text-[#3F4C74]">
              {favoritePapers}
            </h3>
          </div>
        </div>

        <hr className="my-10 border-[#D9D0A9]" />

        {/* About App */}
        <h2
          className="text-3xl mb-8 text-[#46516D]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          About App
        </h2>

        <div className="bg-[#F7F1D5] p-6 rounded-2xl shadow">
          <p className="text-lg mb-2">
            ⋆ Research Paper Assistant
          </p>

          <p className="text-lg mb-2">
            ⋆ Version 1.0
          </p>

          <p className="text-lg mb-2">
            ⋆ Built with React + FastAPI
          </p>

          <p className="text-lg">
            ⋆ Created by Bhumika, Dakshita and Khushi
          </p>
        </div>

      </div>
    </div>
  );
}

export default Settings;
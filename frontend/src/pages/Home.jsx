import { useNavigate } from "react-router-dom";
import doodle from "../assets/Doodle.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="stars min-h-screen flex flex-col justify-center items-center px-6">
      <div
        className="rounded-3xl shadow-2xl max-w-2xl w-full text-center relative overflow-hidden"
        style={{ backgroundColor: '#F7F1D5' }}
      >
        {/* Background Image */}
        <img
          src={doodle}
          alt="doodle"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />

        {/* Content Container */}
        <div className="relative z-10 p-16">
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl text-[#46516D] mb-6 font-bold"
          >
            AI Research Assistant
          </h1>

          <p
            style={{ fontFamily: "'Lora', serif", letterSpacing: '0.15em' }}
            className="text-xl text-[#46516D] mb-10 font-medium"
          >
            Upload. Explore. Discover.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            style={{ fontFamily: "'Lora', serif" }}
            className="bg-[#7A8FAD] text-[#EDE8C8] px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition duration-300"
          >
            Let's Explore ⋆.˚
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
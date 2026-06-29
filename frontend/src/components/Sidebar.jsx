import { History, Settings, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-[#7A8FAD] text-[#EDE8C8] p-2 rounded-lg hover:opacity-80 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed top-0 left-0 h-full bg-[#7A8FAD] p-6 z-40 transition-transform duration-300 w-64 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h1 className="text-4xl font-serif mb-16 mt-10 text-[#EDE8C8]">
         Research Hub ⋆˚࿔
        </h1>

        <div className="space-y-6">
          <button
            onClick={() => { navigate("/history"); setIsOpen(false); }}
            className="flex items-center gap-4 text-lg text-[#EDE8C8] hover:translate-x-3 transition-transform duration-200"
          >
            <History size={22} />
            History
          </button>

          <button
            onClick={() => { navigate("/settings"); setIsOpen(false); }}
            className="flex items-center gap-4 text-lg text-[#EDE8C8] hover:translate-x-3 transition-transform duration-200"
          >
            <Settings size={22} />
            Settings
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}
    </>
  );
}

export default Sidebar;
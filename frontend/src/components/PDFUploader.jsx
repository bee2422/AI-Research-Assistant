import { useState, useEffect } from "react";
import axios from "axios";
import doodle1 from "../assets/doodle1.png";

// **text** ke stars (**) hata deta hai, bold formatting nahi karta — plain text rehta hai
function stripStars(text) {
  return text.replace(/\*\*/g, "");
}

function PDFUploader() {
  const [fileName, setFileName] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("pdfName");
    const savedSummary = localStorage.getItem("summary");
    const savedUploaded = localStorage.getItem("uploaded");

    if (savedName) setFileName(savedName);
    if (savedSummary) setSummary(savedSummary);

    // ✅ Refresh hone par "Loading..." stuck nahi rahega.
    // Sirf woh PDF "uploaded" maana jayega jiska upload
    // pehle se successfully complete ho chuka tha.
    setUploaded(savedUploaded === "true");
    setLoading(false);
  }, []);

  // ✅ File select hote hi seedha upload start (no separate button)
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setSummary("");
    setUploaded(false);

    localStorage.setItem("pdfName", file.name);
    localStorage.removeItem("summary");
    localStorage.removeItem("chatHistory");
    localStorage.removeItem("uploaded");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/upload-pdf", formData);
      setUploaded(true);
      localStorage.setItem("uploaded", "true");
    } catch (error) {
      console.error(error);
      alert("Error uploading PDF.");
      setUploaded(false);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-summary");
      setSummary(response.data.summary);
      localStorage.setItem("summary", response.data.summary);
    } catch (error) {
      console.error(error);
      alert("Could not generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const removePDF = () => {
    localStorage.removeItem("pdfName");
    localStorage.removeItem("summary");
    localStorage.removeItem("chatHistory");
    localStorage.removeItem("uploaded");
    setFileName("");
    setSummary("");
    setUploaded(false);
  };

  return (
    <div
      className="rounded-3xl shadow-xl px-16 py-16 border-2 border-dashed border-[#7A8FAD] text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${doodle1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {fileName && (
        <button
          onClick={removePDF}
          className="absolute top-4 right-4 bg-[#2C3A5C] text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110"
        >
          ✖
        </button>
      )}

      <div className="relative z-10">
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl text-[#EDE8C8] mb-6 font-bold"
        >
          Upload Research Paper
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdfInput"
        />

        <label
          htmlFor="pdfInput"
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="bg-[#2C3A5C] text-[#EDE8C8] px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition inline-block font-semibold"
        >
          Choose PDF
        </label>

        {fileName && (
          <>
            {!loading && (
              <p
                style={{ fontFamily: "'Lora', serif" }}
                className="mt-4 text-[#EDE8C8]"
              >
                {uploaded ? `✅ ${fileName}` : `📄 ${fileName}`}
              </p>
            )}

            {uploaded && (
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={generateSummary}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="bg-[#2C3A5C] text-[#EDE8C8] px-6 py-3 rounded-full hover:scale-105 transition font-semibold"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("chat-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="bg-[#2C3A5C] text-[#EDE8C8] px-6 py-3 rounded-full hover:scale-105 transition font-semibold"
                >
                  Ask Questions
                </button>
              </div>
            )}
          </>
        )}

        {loading && (
          <p
            style={{ fontFamily: "'Lora', serif" }}
            className="mt-4 text-[#EDE8C8]"
          >
            Loading...
          </p>
        )}

        {summary && (
          <div className="mt-6 text-left bg-[#F7F1D5] p-6 rounded-2xl">
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl text-[#46516D] mb-3 font-bold"
            >
              ⋆⭒˚Summary⭒˚.⋆
            </h3>
            <p
              style={{ fontFamily: "'Lora', serif" }}
              className="text-gray-700 whitespace-pre-wrap"
            >
              {stripStars(summary)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFUploader;

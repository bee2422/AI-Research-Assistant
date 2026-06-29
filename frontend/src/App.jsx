import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ResearchHistory from "./pages/ResearchHistory";
import Settings from "./pages/Settings";
import ChatHistory from "./pages/ChatHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />

        <Route
          path="/history"
          element={<ResearchHistory />}
        />

        <Route
          path="/history/:id"
          element={<ChatHistory />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Circuit from "./Circuit";
import ProjectsPage from "./ProjectsPage";

function CircuitApp() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Circuit />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default CircuitApp;

import { Routes, Route, HashRouter } from "react-router-dom";
import { general, course } from "../routes";

import MainLayout from "../components/layout/MainLayout";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {general} {course}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

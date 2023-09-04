import { Routes, Route, HashRouter } from "react-router-dom";
import { general, course } from "routes";

import colorConfigs from "configs/colorConfigs";
import MainLayout from "components/layout/MainLayout";
import "./App.css";

function convertColorConfigsToCSS(colorConfigs: Record<string, any>, prefix = ""): void {
  const root = document.documentElement;

  for (const key in colorConfigs) {
    const value = colorConfigs[key];

    if (typeof value === "object") {
      convertColorConfigsToCSS(value, `${prefix}${key}-`);
    } else {
      const propertyName = `--${prefix}${key}`;
      root.style.setProperty(propertyName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), value);
    }
  }
}

convertColorConfigsToCSS(colorConfigs);

function App() {
  convertColorConfigsToCSS(colorConfigs);

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

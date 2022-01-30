import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import About from "./components/About/About";
import Card from "./components/Card/Card";
import TopBarProgress from "react-topbar-progress-indicator";
import Recap from "./components/Recap/Recap";

function App() {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();
  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <div className="all-container">
      {progress && <TopBarProgress />}
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/recap" element={<Recap/>} />
      </Routes>
    </div>
  );
}

export default App;

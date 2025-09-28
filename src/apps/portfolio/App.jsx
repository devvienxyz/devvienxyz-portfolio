import { useState } from "react";
import { PixelApp } from "@pixel";
import NavBar from "./components/Navbar";

const App = () => {
  const [navTarget, setNavTarget] = useState(null);
  return (
    <div className="w-full h-screen">
      <NavBar onNavigate={(point) => setNavTarget(point)} />
      <PixelApp navigationTarget={navTarget} />
    </div>
  );
};

export default App;

import React from "react";
// import useGameStateManager from "@pixel/state/gameStateManager.js";
import { Zones } from "@pixel/utils/zones.js";

const navItems = [
  { label: "About", zone: "ABOUT" },
  { label: "Work", zone: "PROJECTS" },
  { label: "Skills", zone: "EXPERIENCES" },
  { label: "Credits", zone: "CREDITS" },
  { label: "Contact", type: "ui" },
];

export default function Navbar({ onNavigate, onShowUI }) {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center gap-6 bg-black/60 text-white py-3 z-50">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="hover:text-yellow-400 transition"
          onClick={() => {
            if (item?.zone) {
              const target = Zones[item.zone];
              if (target?.initialPoints) {
                onNavigate(target.initialPoints);
              }
            } else {
              onShowUI(item.label); // tell parent to open modal/drawer
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

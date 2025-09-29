"use client";

export default function BaseClickable({ onClick, position }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <mesh
      tabIndex={0} // Makes it focusable
      onClick={onClick}
      onKeyDown={handleKeyDown}
      position={position}
    ></mesh>
  );
}

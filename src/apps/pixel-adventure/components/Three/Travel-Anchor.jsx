import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import Text from "./Text";

export default function TravelAnchor({ targetPosition, position, label }) {
  const meshRef = useRef();
  const [active, setActive] = useState(false); // hover or focus state
  const { camera } = useThree(); // Access camera from context

  // Function to move the camera
  const moveCamera = () => {
    gsap.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 2, // Adjust duration
      ease: "power2.inOut", // Easing function
    });
  };

  const handleClick = () => {
    moveCamera(); // Trigger camera movement when clicked
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") handleClick();
    },
    [handleClick],
  );

  useEffect(() => {
    const el = meshRef.current;
    if (!el) return;

    el.tabIndex = 0; // make it focusable
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onKeyUp={(e) => {}}
      onClick={handleClick}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Text text={label} color={active ? "yellow" : ""} />
    </mesh>
  );
}

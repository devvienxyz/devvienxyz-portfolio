import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import TravelAnchor from "../Three/Travel-Anchor";

export default function Menu({ x = 0.5, y = 0, z = 2.5 }) {
  const menuRef = useRef();

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.layers.set(0); // Set navigation menu to layer 0
    }
  }, []);

  return (
    <motion.group ref={menuRef} position={[x, y, z]} rotation={[0, -0.7, 0]} renderOrder={100}>
      <TravelAnchor targetPosition={[2, 1, 5]} position={[x, 1.2, 0]} label="About" />
      <TravelAnchor targetPosition={[3, 1, 4]} position={[x, 0.9, 0]} label="Projects" />
      <TravelAnchor targetPosition={[4, 1, 3]} position={[x, 0.6, 0]} label="Experiences" />
      <TravelAnchor targetPosition={[5, 1, 2]} position={[x, 0.3, 0]} label="Contact" />
    </motion.group>
  );
}

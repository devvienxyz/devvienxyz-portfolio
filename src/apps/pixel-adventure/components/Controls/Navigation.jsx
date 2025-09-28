import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Text from "../Three";

function NavItem({ text, position, isActive, scale = 0.5 }) {
  const NavItemRef = useRef();
  // added small offset to separate the cube and the text
  const cubeOffset = [-0.1, 0.05, 0];

  return (
    <group ref={NavItemRef} position={position} scale={scale}>
      {/* Temp: Simple cube marker */}
      <mesh position={cubeOffset}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial
          color={isActive ? "yellow" : "blue"}
          emissive="white"
          emissiveIntensity={isActive ? 0.6 : 0}
        />
      </mesh>
      <Text text={text} />
    </group>
  );
}

// export default function Navigation3DMenu({ x = 0.5, y = 0, z = 2.5 }) {
// 	return (
// 		<motion.group
// 			position={[x, y, z]}
// 			rotation={[0, -0.7, 0]}
// 			renderOrder={100}
// 			// transparent={false}
// 			// initial={{ opacity: 0.5 }}
// 			// animate={{ opacity: 1 }}
// 			// transition={{ duration: 0.5, ease: "easeIn", delay: 0.2 }}
// 		>
// 			<NavItem text="About" position={[x, 0.75, 0]} />
// 			<NavItem text="Projects" position={[x, 0.6, 0]} />
// 			<NavItem text="Experiences" position={[x, 0.45, 0]} isActive />
// 			<NavItem text="Contact" position={[x, 0.3, 0]} />
// 		</motion.group>
// 	);
// }

export default function Navigation3DMenu({ x = 0.5, y = 0, z = 2.5 }) {
  const menuRef = useRef();

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.layers.set(0); // Set navigation menu to layer 0
    }
  }, []);

  return (
    <motion.group ref={menuRef} position={[x, y, z]} rotation={[0, -0.7, 0]} renderOrder={100}>
      <NavItem text="About" position={[x, 0.75, 0]} />
      <NavItem text="Projects" position={[x, 0.6, 0]} />
      <NavItem text="Experiences" position={[x, 0.45, 0]} isActive />
      <NavItem text="Contact" position={[x, 0.3, 0]} />
    </motion.group>
  );
}

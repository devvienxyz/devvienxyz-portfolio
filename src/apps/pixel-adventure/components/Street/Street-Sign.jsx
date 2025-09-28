import React, { useRef } from "react";
import Text from "../Three";
// import GradientBackdrop from "../Three/Backdrops";

function Sign({ text, position, isActive, scale = 0.5 }) {
  const signRef = useRef();
  // added small offset to separate the cube and the text
  const cubeOffset = [-0.1, 0.05, 0];

  return (
    <group ref={signRef} position={position} scale={scale}>
      {/* Temp: Simple cube marker */}
      <mesh position={cubeOffset}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial
          color={isActive ? "yellow" : "blue"}
          emissive="white"
          emissiveIntensity={isActive ? 0.6 : 0}
        />
      </mesh>
      {/* <Text text={text} textOptions={{ scale }} /> */}
      <Text text={text} />
    </group>
  );
}

export default function StreetSign({ x = -2, y = 0, z = 1.7 }) {
  return (
    <group position={[x, y, z]} rotation={[0, -0.7, 0]} renderOrder={999} transparent={false}>
      <Sign text="About" position={[x, 0.75, 0]} />
      <Sign text="Projects" position={[x, 0.6, 0]} />
      <Sign text="Experiences" position={[x, 0.45, 0]} isActive />
      <Sign text="Contact" position={[x, 0.3, 0]} />

      {/* <Sign text="About" position={[x, 0.75, z]} />
			<Sign text="Projects" position={[x, 0.6, z]} />
			<Sign text="Experiences" position={[x, 0.45, z]} isActive />
			<Sign text="Contact" position={[x, 0.3, z]} /> */}

      {/* <GradientBackdrop width={1.0} height={1.0} position={[1.1, 0.5, 0]} /> */}

      {/* select */}
      {/* <GradientBackdrop width={1.0} height={1.0} position={[0.8, 0.5, 0]} /> */}
      <meshStandardMaterial attach="material" color="white" transparent={false} depthWrite depthTest />
      {/* <GradientBackdrop width={1.0} height={1.0} position={[x, y, z]} /> */}
    </group>
  );
}

export { Sign };

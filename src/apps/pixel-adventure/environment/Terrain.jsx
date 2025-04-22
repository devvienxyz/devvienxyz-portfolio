import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { userRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Sign = ({ text, position, rotation, areaName, isActive }) => {
  const signRef = useRef();

  return (
    <group ref={signRef} position={position} rotation={[0, rotation, 0]}>
      {/* Arrow Sign */}
      <mesh>
        <boxGeometry args={[3, 0.5, 0.2]} />
        <meshStandardMaterial color={isActive ? "red" : "blue"} />
      </mesh>

      {/* Text Label */}
      <Text position={[-1, -0.3, 0.2]} fontSize={0.3} color="white">
        {text}
      </Text>
    </group>
  );
};

const TerrainObject = ({ name, position, scale = 1, rotationY = 0 }) => {
  const model = useLoader(GLTFLoader, `/assets/pixel-map/models/${name}.glb`);

  useEffect(() => {
    model.scene.scale.set(scale, scale, scale);
    model.scene.position.set(...position);
    model.scene.rotation.y = rotationY;
  }, [model, position, scale, rotationY]);

  return <primitive object={model.scene} />;
};

const TERRAIN = [
  { name: "unit-tree", position: [-3, 0, -5] },
  { name: "unit-ship", position: [-3, 0.1, 0], rotationY: -15, scale: 1.5 },
  { name: "building-mill", position: [-2.5, 0.2, -2.5], rotationY: 45 },
  { name: "water", position: [0.5, 0, 0.9] },
];

const MapLoader = () => {
  return (
    <>
      {TERRAIN.map((props, index) => (
        <TerrainObject key={index} {...props} />
      ))}
    </>
  );
};

export default MapLoader;

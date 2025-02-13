import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function Scene() {
  return (
    <Canvas>
      {/* Add a rotating cube */}
      <mesh rotation={[45, 45, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};


export function Environment() {
  return (
    <>
      <Scene />
    </>
  );
}
import Environment from "@pixel/environment/Environment";
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
        <Environment />
      </Canvas>
    </div>
  );
};
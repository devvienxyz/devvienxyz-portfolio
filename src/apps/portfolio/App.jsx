import { Environment } from "@pixel";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
      <Environment />
    </Canvas>
  );
};

export default App;

import { Canvas } from "@react-three/fiber";
import Environment from "./components/Environment";

const App = () => {
	return (
		<Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
			<Environment />
      <Terrain />
		</Canvas>
	);
};

export default App;

import { Canvas } from "@react-three/fiber";
import { Environment } from "./components/Environment";

export default function App() {
	return (
		<div className="w-full h-screen">
			<Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
				<Environment />
			</Canvas>
		</div>
	);
}

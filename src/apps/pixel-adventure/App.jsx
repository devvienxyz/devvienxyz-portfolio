import { Canvas } from "@react-three/fiber";
import LazyNavBackdrop from "./components/Controls/Lazy-Nav";
import { Environment } from "./components/Environment";
import useGameStateManager, { GameStates } from "./state/game-store.js";

export default function App() {
	const gamePhase = useGameStateManager((s) => s.gamePhase);
	const showMenu = gamePhase === GameStates.POST_INTRO || gamePhase === GameStates.MENU;

	return (
		<div className="w-full h-screen">
			<Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
				<Environment />
				{showMenu && <LazyNavBackdrop />}
			</Canvas>
		</div>
	);
}

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import LazyNavBackdrop from "./components/Controls/Lazy-Nav";
import { Environment } from "./components/Environment";
import { GridGuideToggle } from "./components/Guides/Grid-Guide.jsx";
import useGameStateManager, { GameStates } from "./state/game-store.js";

const isDebug = process.env.NODE_ENV !== "production";

export default function App() {
	const gamePhase = useGameStateManager((s) => s.gamePhase);
	const showMenu = gamePhase === GameStates.POST_INTRO || gamePhase === GameStates.MENU;
	const [showGrid, setShowGrid] = useState(false);

	return (
		<div className="w-full h-screen">
			{isDebug && <GridGuideToggle isDebug={isDebug} showGrid={showGrid} setShowGrid={setShowGrid} />}

			<Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
				<Environment showGrid={showGrid} />
				{showMenu && <LazyNavBackdrop />}
			</Canvas>
		</div>
	);
}

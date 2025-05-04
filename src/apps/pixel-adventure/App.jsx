import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import DebugPanel from "./components/Controls/Debug-Panel.jsx";
import GridGuide from "./components/Controls/Grid-Guide.jsx";
import LazyNavBackdrop from "./components/Controls/Lazy-Nav";
import { Environment } from "./components/Environment";
import useGameStateManager, { GameStates } from "./state/game-store.js";

const isDebug = process.env.NODE_ENV !== "production";

export default function App() {
	const gamePhase = useGameStateManager((s) => s.gamePhase);
	const [showGrid, setShowGrid] = useState(false);
	const [showMarkers, setShowMarkers] = useState(false);
	const showMenu = gamePhase === GameStates.POST_INTRO || gamePhase === GameStates.MENU;

	return (
		<div className="w-full h-screen">
			{isDebug && <DebugPanel {...{ isDebug, showGrid, setShowGrid, showMarkers, setShowMarkers }} />}

			<Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
				<Environment />
				{showMenu && <LazyNavBackdrop />}
				{isDebug && showGrid && <GridGuide showMarkers={showMarkers} />}
			</Canvas>
		</div>
	);
}

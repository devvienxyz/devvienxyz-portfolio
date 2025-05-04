import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GridHelper } from "three";

export default function GridGuide({
	visible = true,
	size = 100,
	divisions = 100,
	colorCenterLine = 0x444444,
	colorGrid = 0x888888,
}) {
	const { scene } = useThree();
	const gridRef = useRef();

	useEffect(() => {
		if (!visible) return;
		const grid = new GridHelper(size, divisions, colorCenterLine, colorGrid);
		gridRef.current = grid;
		scene.add(grid);
		return () => scene.remove(grid);
	}, [scene, visible, size, divisions, colorCenterLine, colorGrid]);

	return null;
}

function GridGuideToggle({ showGrid, setShowGrid }) {
	return (
		<button
			type="button"
			style={{
				position: "absolute",
				top: 10,
				left: 10,
				zIndex: 1000,
				padding: "0.5em 1em",
				background: "#222",
				color: "#fff",
				border: "none",
				cursor: "pointer",
			}}
			onClick={() => setShowGrid((prev) => !prev)}
		>
			{showGrid ? "Hide Grid" : "Show Grid"}
		</button>
	);
}

export { GridGuideToggle };

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GridHelper, Group, Mesh, MeshBasicMaterial } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { DEFAULT_FONT } from "../../constants/terrain-misc";

export default function GridGuide({ size = 20, step = 1, showMarkers = true }) {
	const { scene } = useThree();

	useEffect(() => {
		const group = new Group();

		// Grid lines
		const grid = new GridHelper(size, size / step, 0x888888, 0x444444);
		grid.position.y = 0.01;
		group.add(grid);

		// Optional markers
		if (showMarkers) {
			const loader = new FontLoader();
			loader.load(DEFAULT_FONT, (font) => {
				for (let i = -size / 2; i <= size / 2; i += step) {
					const makeLabel = (text, pos) => {
						const geom = new TextGeometry(`${text}`, {
							font,
							size: 0.3,
							height: 0.01,
						});
						const mesh = new Mesh(geom, new MeshBasicMaterial({ color: 0xffff00 }));
						mesh.position.set(...pos);
						mesh.rotation.x = -Math.PI / 2;
						group.add(mesh);
					};
					makeLabel(i, [i, 0.02, 0]);
					makeLabel(i, [0, 0.02, i]);
				}
			});
		}

		scene.add(group);
		return () => {
			scene.remove(group);
		};
	}, [scene, size, step, showMarkers]);

	return null;
}

function GridGuideToggle({ showGrid, setShowGrid }) {
	return (
		<button
			type="button"
			style={{
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

function GridMarkersToggle({ showGrid, showMarkers, setShowMarkers }) {
	return (
		<button
			type="button"
			disabled={!showGrid}
			style={{
				zIndex: 1000,
				padding: "0.5em 1em",
				background: "#222",
				color: "#fff",
				border: "none",
				cursor: "pointer",
			}}
			onClick={() => setShowMarkers((prev) => !prev)}
		>
			{showMarkers ? "Hide Markers" : "Show Markers"}
		</button>
	);
}

export { GridGuideToggle, GridMarkersToggle };

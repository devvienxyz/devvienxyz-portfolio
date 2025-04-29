import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function TerrainObject({ name, position, scale = 1, rotationY = 0 }) {
	const model = useLoader(GLTFLoader, `assets/kenney/pixel-map/models/${name}.glb`);

	useEffect(() => {
		model.scene.scale.set(scale, scale, scale);
		model.scene.position.set(...position);
		model.scene.rotation.y = rotationY;
	}, [model, position, scale, rotationY]);

	return <primitive object={model.scene} />;
}

const TERRAIN = [
	{ name: "unit-tree", position: [-3, 0, -5] },
	{ name: "unit-ship", position: [-3, 0.1, 0], rotationY: -15, scale: 1.5 },
	{ name: "building-mill", position: [-2.5, 0.2, -2.5], rotationY: 45 },
	{ name: "water", position: [0.5, 0, 0.9] },
];

export default function MapLoader() {
	return (
		<>
			{TERRAIN.map((props, index) => (
				<TerrainObject key={`${props.name}-${index}`} {...props} />
			))}
		</>
	);
}

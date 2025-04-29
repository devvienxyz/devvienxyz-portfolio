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

const createShipOnWater = (x, z, large = false, rotationY = 0) => [
	{ name: large ? "unit-ship-large" : "unit-ship", position: [x, 0.1, z], rotationY },
	{ name: "water", position: [x, 0, z] },
];

const createTreeCluster = (x, z) => [
	{ name: "unit-tree", position: [x, 0, z - 0.5], scale: 1.5 },
	{ name: "unit-tree", position: [x + 0.6, 0, z] },
	{ name: "unit-tree", position: [x, 0, z + 0.6] },
	{ name: "unit-tree", position: [x + 0.6, 0, z + 0.9], scale: 1.5 },
	{ name: "unit-tree", position: [x + 0.1, 0, z + 0.3] },
];

const createBldgWallsOnDirt = (x, z) => [
	{ name: "building-walls", position: [x, 0.2, z] },
	{ name: "dirt", position: [x, 0.1, z] },
	{ name: "dirt", position: [x, 0, z] },
];

const TERRAIN = [
	...createTreeCluster(-3, -5),
	...createShipOnWater(-3, 0, true, -15),
	...createShipOnWater(0.5, -4.5),
	...createBldgWallsOnDirt(1, -1.7),
	// riverbend - meander and bridge
	{ name: "water", position: [-0.5, 0, -4.5] },
	{ name: "river-straight", position: [-2, 0, 0] },
	{ name: "river-corner", position: [-1, 0, 0] },
	{ name: "river-corner", position: [-0.5, 0, -0.85], rotationY: -135.1 },
	{ name: "river-straight", position: [0.5, 0, -0.85], rotationY: 0 },
	{ name: "river-straight", position: [1.5, 0, -0.85] },
	{ name: "river-corner", position: [2.5, 0, -0.85] },
	{ name: "bridge", position: [3, 0, -1.7], rotationY: -90.1 },
	{ name: "water-rocks", position: [-2.5, 0, 0.9] },
	{ name: "water", position: [0.5, 0, 0.9] },
	// Buildings,
	{ name: "building-mine", position: [1.5, 0, -4.6], rotationY: 45 },
	{ name: "grass-hill", position: [1, 0, -3.5] },
	{ name: "building-tower", position: [0, 0, -3.5] },
	{ name: "building-mill", position: [-2.5, 0.2, -2.5], rotationY: 45 },
	{ name: "building-farm", position: [-3.5, 0, -2.5] },
	{ name: "building-archery", position: [-1.5, 0, -4.5], rotationY: 45 },
	{ name: "unit-tower", position: [-4, 0, -3.5] },
	{ name: "building-village", position: [-3, 0, -3.5], rotationY: 45 },
	{ name: "stone-mountain", position: [2, 0, -3.6] },
	{ name: "building-cabin", position: [2.5, 0, -2.7] },
	{ name: "dirt-lumber", position: [2, 0, -1.7] },
	{ name: "building-port", position: [-3.5, 0, -1], rotationY: 90 },
	{ name: "building-market", position: [-2.5, 0, -1] },
	{ name: "unit-mansion", position: [1, 0.2, -0.5] },
	{ name: "grass-hill", position: [-1.5, 0, 0.9] },
	{ name: "building-dock", position: [-0.5, 0, 0.9], rotationY: 90 },
	{ name: "building-sheep", position: [1, 0, 0] },
	{ name: "building-castle", position: [2, 0, 0] },
	{ name: "building-wizard-tower", position: [2, 0, 1.2], rotationY: 0 },
	{ name: "unit-mill", position: [0.7, 0, 1.9], rotationY: 45 },
	// Grasslands and paths
	{ name: "grass", position: [-4, 0, -1.7] },
	{ name: "water", position: [-0.5, 0, -4.5] },
	{ name: "grass", position: [-1, 0, -3.5] },
	{ name: "grass", position: [-2, 0, -3.5] },
	{ name: "grass", position: [1.5, 0, -2.7] },
	{ name: "path-square-end", position: [1.5, 0.2, -2.6] },
	{ name: "grass", position: [0.5, 0, -2.6] },
	{ name: "path-straight", position: [0.5, 0.2, -2.6] },
	{ name: "grass", position: [-0.5, 0, -2.6] },
	{ name: "path-corner", position: [-0.5, 0.2, -2.6], rotationY: 135.1 },
	{ name: "grass", position: [-1, 0, -1.7] },
	{ name: "path-corner", position: [-1, 0.2, -1.7] },
	{ name: "grass", position: [-2, 0, -1.7] },
	{ name: "path-intersectionF", position: [-2, 0.2, -1.7] },
	{ name: "grass", position: [-3, 0, -1.7] },
	{ name: "path-straight", position: [-2, 0.2, -1.7] },
	{ name: "path-start", position: [-3, 0.2, -1.7], rotationY: 135.1 },
	{ name: "grass", position: [-1.5, 0, -2.6] },
	{ name: "grass", position: [0, 0, -1.7] },
	{ name: "dirt-lumber", position: [2, 0, -1.7] },
	{ name: "grass-forest", position: [-1.5, 0, -1] },
	{ name: "grass-forest", position: [-4.5, 0, -1] },
	{ name: "grass", position: [2, 0, 0] },
	{ name: "water-rocks", position: [-2.5, 0, 0.9] },
	{ name: "grass-forest", position: [0, 0, 0] },
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

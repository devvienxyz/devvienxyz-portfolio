import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { NormalizedTerrainObjects as TerrainObjects } from "../../constants/terrain-normalized.js";

export const loadModel = (scene, loader, mixers, modelPath, { position, scale = 1, rotationY = 0 }) => {
	loader.current.load(
		modelPath,
		(gltf) => {
			const model = gltf.scene;
			scene.add(model);

			if (modelPath.includes("mill")) {
				const mixer = new AnimationMixer(model);
				const clips = gltf.animations;
				if (clips.length) {
					const action = mixer.clipAction(clips[0]);
					action.play();
					mixers.current.push(mixer);
				}
			}

			model.position.set(...position);
			model.scale.set(scale, scale, scale);
			model.rotation.y = rotationY;
		},
		undefined,
		(error) => console.error("Model loading error:", error),
	);
};

export default function Terrain({ scene }) {
	const loader = useRef(new GLTFLoader());
	const mixers = useRef([]);

	useEffect(() => {
		// Render map when the component mounts
		for (const { name, ...rest } of TerrainObjects) {
			loadModel(scene, loader, mixers, `assets/kenney/pixel-map/models/${name}.glb`, rest);
		}

		return () => {
			// Clean up any mixers when the component unmounts
			for (const mixer of mixers.current) {
				mixer.stopAllAction();
			}
			mixers.current = [];
		};
	}, [scene]);

	useFrame((_, delta) => {
		for (const mixer of mixers.current) mixer.update(delta);
	});

	return null;
}

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useMovementController from "../../hooks/useMovementController.js";

const WALK_SPEED = 1.0; // 2.5;
const GRAVITY = -9.8;
const JUMP_VELOCITY = 3.0;
const Avatars = Object.freeze({
	default: "character-female-e.glb",
	// TODO: Add more avatars
});
const AVATAR_SCALE = 0.2;
const GROUND_LEVEL = 0.2;

export default function Avatar() {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(`assets/kenney/characters/Models/GLB format/${Avatars.default}`);
	const { actions } = useAnimations(animations, group);

	const controller = useMovementController({
		onMove: (vel, dir) => {
			group.current.position.add(vel);
			group.current.rotation.y = Math.atan2(dir.x, dir.z);
		},
		actions,
	});
	useFrame((_, delta) => {
		controller.update(delta, group.current.position);
	});

	return (
		<group ref={group} position={[0, GROUND_LEVEL, 0]} scale={AVATAR_SCALE}>
			<primitive object={nodes["character-female-e"]} />
		</group>
	);
}

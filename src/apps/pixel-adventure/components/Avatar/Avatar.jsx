import Avatars, { AVATAR_SCALE } from "@pixel/constants/avatar-attributes.js";
import useMovementController from "@pixel/hooks/useMovementController.js";
import { Zones } from "@pixel/utils/zones.js";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Avatar() {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(`assets/kenney/characters/Models/GLB format/${Avatars.default}.glb`);
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
		<group ref={group} position={Zones.about.initialPoints} scale={AVATAR_SCALE}>
			<primitive object={nodes[Avatars.default]} />
		</group>
	);
}

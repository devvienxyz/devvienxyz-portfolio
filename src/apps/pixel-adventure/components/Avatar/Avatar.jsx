import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three/webgpu";

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
	const keys = useRef({});
	const velocity = useRef(new Vector3());
	const direction = useRef(new Vector3());
	const velocityY = useRef(0);
	const isOnGround = useRef(true); // Simple ground check

	useEffect(() => {
		// Check if the animations exist
		if (actions?.idle) {
			// Play 'Idle' animation by default
			actions.idle.play();
		}
	}, [actions]);

	// Handle key press and release
	useEffect(() => {
		const down = (e) => {
			keys.current[e.code] = true;

			// Trigger jump
			if (e.code === "Space" && isOnGround.current) {
				velocityY.current = JUMP_VELOCITY;
				isOnGround.current = false;
			}
		};

		const up = (e) => {
			keys.current[e.code] = false;
		};

		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);
	console.log(nodes);
	console.log(actions);
	useFrame((_, delta) => {
		direction.current.set(0, 0, 0);

		if (keys.current.KeyW) direction.current.z -= 1;
		if (keys.current.KeyS) direction.current.z += 1;
		if (keys.current.KeyA) direction.current.x -= 1;
		if (keys.current.KeyD) direction.current.x += 1;

		// Normalize direction
		direction.current.normalize();

		// Apply horizontal movement
		velocity.current.copy(direction.current).multiplyScalar(WALK_SPEED * delta);

		if (velocity.current.lengthSq() > 0) {
			group.current.position.add(velocity.current);

			const angle = Math.atan2(direction.current.x, direction.current.z);
			group.current.rotation.y = angle;
		}

		// Gravity / Jump
		if (!isOnGround.current) {
			velocityY.current += GRAVITY * delta;
			group.current.position.y += velocityY.current * delta;

			// Ground collision
			if (group.current.position.y <= GROUND_LEVEL) {
				group.current.position.y = GROUND_LEVEL;
				velocityY.current = 0;
				isOnGround.current = true;
			}
		}

		// Trigger walking animation if moving
		if (direction.current.lengthSq() > 0) {
			if (actions.walk) {
				actions.walk.play();
			}
		} else {
			// If not moving, stop walking animation and play the idle animation
			if (actions.walk) {
				actions.walk.stop();
			}
			if (actions.idle) {
				actions.idle.play();
			}
		}
	});

	return (
		<group ref={group} position={[0, GROUND_LEVEL, 0]} scale={AVATAR_SCALE}>
			{/* <primitive object={gltf.scene} /> */}
			{/* <primitive object={nodes.avatarMesh} /> */}
			<primitive object={nodes["character-female-e"]} />
		</group>
	);
}

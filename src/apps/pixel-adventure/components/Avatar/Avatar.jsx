import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three/webgpu";

const SPEED = 2.5;
const GRAVITY = -9.8;
const JUMP_VELOCITY = 3.0;
const Avatars = Object.freeze({
	default: "character-female-e.glb",
	// TODO: Add more avatars
});

export default function Avatar() {
	const group = useRef();
	const gltf = useGLTF(`assets/kenney/characters/Models/GLB format/${Avatars.default}`);
	const keys = useRef({});
	const velocity = useRef(new Vector3());
	const direction = useRef(new Vector3());
	const velocityY = useRef(0);
	const isOnGround = useRef(true); // Simple ground check

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

	useFrame((_, delta) => {
		direction.current.set(0, 0, 0);

		if (keys.current.KeyW) direction.current.z -= 1;
		if (keys.current.KeyS) direction.current.z += 1;
		if (keys.current.KeyA) direction.current.x -= 1;
		if (keys.current.KeyD) direction.current.x += 1;

		// Normalize direction
		direction.current.normalize();

		// Apply horizontal movement
		velocity.current.copy(direction.current).multiplyScalar(SPEED * delta);

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
			if (group.current.position.y <= 0) {
				group.current.position.y = 0;
				velocityY.current = 0;
				isOnGround.current = true;
			}
		}
	});

	return (
		<group ref={group} position={[0, 0, 0]} scale={0.5}>
			<primitive object={gltf.scene} />
		</group>
	);
}

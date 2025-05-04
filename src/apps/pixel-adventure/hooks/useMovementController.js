import { useCallback, useEffect, useRef } from "react";
import { Vector3 } from "three";
import AvatarActions from "../constants/avatar-actions.js";
import canEnterZone from "../utils/zones.js";

const GRAVITY = -9.8;
const JUMP_VELOCITY = 3.0;
const GROUND_LEVEL = 0.2;

export default function useMovementController({ onMove, onJump, actions, completedZone = null }) {
	const keys = useRef(new Map());
	const direction = useRef(new Vector3());
	const velocity = useRef(new Vector3());
	const velocityY = useRef(0);
	const isOnGround = useRef(true);
	const currentAnim = useRef(null);

	const play = useCallback(
		(name) => {
			if (!actions?.[name] || currentAnim.current === name) return;
			if (currentAnim.current && actions[currentAnim.current]) {
				actions[currentAnim.current].stop();
			}
			actions[name].reset().fadeIn(0.1).play();
			currentAnim.current = name;
		},
		[actions],
	);

	useEffect(() => {
		const down = (e) => {
			keys.current.set(e.code, true);
			if (e.code === "Space" && isOnGround.current) {
				velocityY.current = JUMP_VELOCITY;
				isOnGround.current = false;
				play("jump");
				onJump?.();
			}
		};
		const up = (e) => keys.current.set(e.code, false);

		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, [onJump, play]);

	const update = (delta, position) => {
		direction.current.set(0, 0, 0);
		if (keys.current.get("KeyW")) direction.current.z -= 1;
		if (keys.current.get("KeyS")) direction.current.z += 1;
		if (keys.current.get("KeyA")) direction.current.x -= 1;
		if (keys.current.get("KeyD")) direction.current.x += 1;

		direction.current.normalize();
		velocity.current.copy(direction.current).multiplyScalar(delta);

		// Compute next intended position
		const nextX = position.x + velocity.current.x;
		const nextZ = position.z + velocity.current.z;

		// Gravity
		if (!isOnGround.current) {
			velocityY.current += GRAVITY * delta;
			position.y += velocityY.current * delta;
			if (position.y <= GROUND_LEVEL) {
				position.y = GROUND_LEVEL;
				velocityY.current = 0;
				isOnGround.current = true;
			}
		}

		// Movement logic
		if (canEnterZone(nextX, nextZ, completedZone)) {
			console.log(`Moving to: ${nextX}, ${nextZ}`);
			if (onMove) onMove(velocity.current, direction.current);
		}

		// if (onMove) onMove(velocity.current, direction.current);

		// Animation control
		if (!isOnGround.current) {
			play(AvatarActions.JUMP);
		} else if (direction.current.lengthSq() > 0) {
			play(AvatarActions.WALK);
		} else {
			play(AvatarActions.IDLE);
		}
	};

	return { update };
}

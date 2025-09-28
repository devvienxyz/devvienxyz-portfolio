import { useCallback, useEffect, useRef } from "react";
import { Vector3 } from "three";
import AvatarActions from "../constants/avatar-actions.js";
import { JUMP_VELOCITY } from "../constants/avatar-actions.js";
import { GRAVITY, GROUND_LEVEL } from "../constants/terrain-misc.js";
import canEnterZone from "../utils/zones.js";

export default function useMovementController({ onMove, onJump, actions, completedZone = 0 }) {
  const keys = useRef(new Map());
  const direction = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const velocityY = useRef(0);
  const isOnGround = useRef(true);
  const currentAnim = useRef(null);
  const lastDir = useRef(new Vector3(0, 0, 1)); // default forward facing

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

    if (direction.current.lengthSq() > 0) {
      direction.current.normalize();
      lastDir.current.copy(direction.current);  // remember last input dir
    }

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
      if (onMove) onMove(velocity.current, lastDir.current);
    }

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

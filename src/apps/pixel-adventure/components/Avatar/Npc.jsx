import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import Avatars, { AVATAR_SCALE } from "@pixel/constants/avatar-attributes.js";
import AvatarActions from "@pixel/constants/avatar-actions.js";
import { Zones } from "@pixel/utils/zones.js";

export default function NPC({ model, patrolPoints = [], speed = 0.5 }) {
  const group = useRef();
  const { nodes, animations } = useGLTF(`assets/kenney/characters/Models/GLB format/${model}.glb`);
  const { actions } = useAnimations(animations, group);

  const target = useRef(null);
  const velocity = useRef(new Vector3());

  // pick first patrol point
  useEffect(() => {
    if (patrolPoints.length > 0) {
      target.current = new Vector3(...patrolPoints[0]);
    }
    if (actions[AvatarActions.IDLE]) {
      actions[AvatarActions.IDLE].reset().fadeIn(0.2).play();
    }
  }, [patrolPoints, actions]);

  useFrame((_, delta) => {
    if (!group.current || !target.current) return;

    const pos = group.current.position;
    const dir = new Vector3().subVectors(target.current, pos);
    const dist = dir.length();

    if (dist > 0.05) {
      dir.normalize();
      velocity.current.copy(dir).multiplyScalar(speed * delta);
      pos.add(velocity.current);
      group.current.rotation.y = Math.atan2(dir.x, dir.z);

      // play walk
      if (actions[AvatarActions.WALK] && !actions[AvatarActions.WALK].isRunning()) {
        Object.values(actions).forEach((a) => a.stop());
        actions[AvatarActions.WALK].reset().fadeIn(0.2).play();
      }
    } else {
      // reached target, pick next
      const currentIndex = patrolPoints.findIndex((p) => new Vector3(...p).distanceTo(target.current) < 0.1);
      const nextIndex = (currentIndex + 1) % patrolPoints.length;
      target.current = new Vector3(...patrolPoints[nextIndex]);

      // play idle
      if (actions[AvatarActions.IDLE] && !actions[AvatarActions.IDLE].isRunning()) {
        Object.values(actions).forEach((a) => a.stop());
        actions[AvatarActions.IDLE].reset().fadeIn(0.2).play();
      }
    }
  });

  return (
    <group ref={group} position={Zones.initial.initialPoints} scale={AVATAR_SCALE}>
      <primitive object={nodes[model]} />
    </group>
  );
}

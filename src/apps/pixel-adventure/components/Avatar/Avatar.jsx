import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Zones } from "@pixel/utils/zones.js";
import Avatars, { AVATAR_SCALE } from "@pixel/constants/avatar-attributes.js";
import { useMovementController, useAvatar } from "@pixel/hooks";

export default function Avatar() {
  const group = useRef();
  const { nodes, animations } = useGLTF(`assets/kenney/characters/Models/GLB format/${Avatars.default}.glb`);
  const { actions } = useAnimations(animations, group);

  const avatar = useAvatar();

  const controller = useMovementController({
    onMove: (vel, dir) => {
      group.current.position.add(vel);

      // rotation will use the last known direction, even after keys are released
      if (dir.lengthSq() > 0) {
        group.current.rotation.y = Math.atan2(dir.x, dir.z);
      }

      // keep global avatar state in sync
      avatar._update(group.current.position, dir);
    },
    actions,
  });

  // update animations
  useFrame((_, delta) => {
    controller.update(delta, group.current.position);
  });

  return (
    <group ref={group} position={Zones.about.initialPoints} scale={AVATAR_SCALE}>
      <primitive object={nodes[Avatars.default]} />
    </group>
  );
}

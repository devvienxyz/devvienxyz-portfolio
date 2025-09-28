import Avatars, { AVATAR_SCALE } from "@pixel/constants/avatar-attributes.js";
import useMovementController from "@pixel/hooks/useMovementController.js";
import { Zones } from "@pixel/utils/zones.js";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Avatar({ navigationTarget }) {
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
  const [target, setTarget] = useState(null);

  // Whenever parent sets navigation target
  if (navigationTarget && navigationTarget !== target) {
    setTarget(new Vector3(...navigationTarget));
  }

  useFrame((_, delta) => {
    controller.update(delta, group.current.position);

    if (target) {
      const pos = group.current.position;
      const dir = target.clone().sub(pos).setY(0);

      if (dir.length() > 0.05) {
        dir.normalize();
        pos.addScaledVector(dir, delta * 2); // walk speed
        group.current.rotation.y = Math.atan2(dir.x, dir.z);
      } else {
        setTarget(null); // reached target
      }
    }
  });

  return (
    <group ref={group} position={Zones.about.initialPoints} scale={AVATAR_SCALE}>
      <primitive object={nodes[Avatars.default]} />
    </group>
  );
}

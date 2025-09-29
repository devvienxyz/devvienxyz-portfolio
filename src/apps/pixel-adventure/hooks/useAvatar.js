import { useRef, useState, useCallback } from "react";
import { Vector3 } from "three";
import { Zones } from "@pixel/utils/zones.js";

export default function useAvatar() {
  const position = useRef(new Vector3()); // live position
  const direction = useRef(new Vector3(0, 0, 1)); // facing direction
  const [zone, setZone] = useState(null); // current zone name

  // Called by Avatar when it moves
  const updateAvatarState = useCallback((pos, dir) => {
    position.current.copy(pos);
    direction.current.copy(dir);

    // zone detection
    let currentZone = null;
    for (const [name, config] of Object.entries(Zones)) {
      if (!config.bounds) continue;
      const { minX, maxX, minZ, maxZ } = config.bounds;
      if (pos.x >= minX && pos.x <= maxX && pos.z >= minZ && pos.z <= maxZ) {
        currentZone = name;
        break;
      }
    }
    setZone(currentZone);
  }, []);

  return {
    // exposed data
    getPosition: () => position.current.clone(),
    getDirection: () => direction.current.clone(),
    getZone: () => zone,

    // internal updater (used by Avatar only)
    _update: updateAvatarState,
  };
}

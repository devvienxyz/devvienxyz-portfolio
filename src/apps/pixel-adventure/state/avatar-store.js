import { create } from "zustand";
import { Vector3 } from "three";
import { Zones } from "@pixel/utils/zones.js";

const useAvatarStore = create((set, get) => ({
  position: new Vector3(),
  direction: new Vector3(0, 0, 1),
  zone: null,

  update: (pos, dir) => {
    const position = pos.clone();
    const direction = dir.clone();

    // zone detection
    let currentZone = null;
    for (const [name, config] of Object.entries(Zones)) {
      if (!config.bounds) continue;
      const { minX, maxX, minZ, maxZ } = config.bounds;
      if (position.x >= minX && position.x <= maxX && position.z >= minZ && position.z <= maxZ) {
        currentZone = name;
        break;
      }
    }

    set({ position, direction, zone: currentZone });
  },
}));

export default useAvatarStore;

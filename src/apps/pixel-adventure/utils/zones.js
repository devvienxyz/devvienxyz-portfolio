import { GROUND_LEVEL } from "../constants/terrain-misc";

const Zones = Object.freeze({
	about: {
		bounds: { minX: -3.0, maxX: -2.0, minZ: 1.0, maxZ: 3.0 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.5],
		preRequisiteZone: null,
	},
	projects: {
		bounds: { minX: -4.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 0,
	},
	experiences: {
		bounds: { minX: -4.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 1,
	},
	credits: {
		bounds: { minX: -4.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 2,
	},
	map: {
		bounds: { minX: -3.5, maxX: 4, minZ: -3.8, maxZ: 3.6 },
		preRequisiteZone: 3,
	},
});

export default function canEnterZone(x, z, completedZone) {
	for (const [_, zone] of Object.entries(Zones)) {
		const b = zone.bounds;
		const inBounds = x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ;

		if (zone.preRequisiteZone == null) {
			return false;
		}

		if (inBounds) {
			if (completedZone >= zone.preRequisiteZone) {
				return true;
			}
			return false; // user hasn't unlocked this yet
		}
	}
	return true; // if outside all defined zones, assume it's free space
}

export { Zones };

const Zones = Object.freeze({
	about: {
		bounds: { minX: -4.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
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
		bounds: { minX: -4.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
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

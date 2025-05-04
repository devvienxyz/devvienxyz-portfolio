import { GROUND_LEVEL } from "../constants/terrain-misc";

const ZoneNames = {
	ABOUT: "about",
	PROJECTS: "projects",
	EXPERIENCES: "experiences",
	CREDITS: "credits",
};

const Zones = Object.freeze({
	[ZoneNames.ABOUT]: {
		bounds: { minX: -3.0, maxX: -2.0, minZ: 1.0, maxZ: 3.0 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		preRequisiteZone: 0,
	},
	[ZoneNames.PROJECTS]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 1,
	},
	[ZoneNames.EXPERIENCES]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 2,
	},
	[ZoneNames.CREDITS]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		preRequisiteZone: 3,
	},
	map: {
		bounds: { minX: -3.5, maxX: 4, minZ: -3.8, maxZ: 3.6 },
		preRequisiteZone: 4,
	},
});

function checkZone(x, z) {
	for (const [zoneName, config] of Object.entries(Zones)) {
		if (!config.bounds) continue;
		const { minX, maxX, minZ, maxZ } = config.bounds;
		if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) {
			return config.preRequisiteZone ?? 0;
		}
	}
	return 0;
}

export default function canEnterZone(x, z, completedZone) {
	const zoneToTravel = checkZone(x, z);
	return zoneToTravel <= completedZone;
}

export { Zones };

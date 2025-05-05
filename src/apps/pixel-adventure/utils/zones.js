import { GROUND_LEVEL } from "../constants/terrain-misc";

const ZoneNames = {
	INITIAL: "initial",
	ABOUT: "about",
	PROJECTS: "projects",
	EXPERIENCES: "experiences",
	CREDITS: "credits",
};

const Zones = Object.freeze({
	[ZoneNames.INITIAL]: {
		bounds: { minX: -3.0, maxX: -2.0, minZ: 1.0, maxZ: 3.0 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		// building-port
		targetZoomFocus: [-2.5, 0, 0.7],
		preRequisiteZone: 0,
	},
	[ZoneNames.ABOUT]: {
		bounds: { minX: -3.0, maxX: -2.0, minZ: 1.0, maxZ: 3.0 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		// building-mill
		targetZoomFocus: [-1.5, 0.2, -0.8],
		preRequisiteZone: 1,
	},
	[ZoneNames.PROJECTS]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		// building-archery
		targetZoomFocus: [-0.5, 0, -2.8],
		preRequisiteZone: 2,
	},
	[ZoneNames.EXPERIENCES]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		// stone-mountain
		targetZoomFocus: [3, 0, -1.9],
		preRequisiteZone: 3,
	},
	[ZoneNames.CREDITS]: {
		bounds: { minX: -3.5, maxX: 3, minZ: -5.5, maxZ: 1.9 },
		initialPoints: [-2.5, GROUND_LEVEL, 1.1],
		// building-wizard-tower
		targetZoomFocus: [3, 0, 2.9],
		preRequisiteZone: 4,
	},
	map: {
		bounds: { minX: -3.5, maxX: 4, minZ: -3.8, maxZ: 3.6 },
		preRequisiteZone: 5,
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

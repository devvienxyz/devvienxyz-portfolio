import TerrainObjects from "../constants/terrain-objects.js";

const getCenter = (objects) => {
	let sumX = 0;
	let sumZ = 0;
	let count = 0;

	for (const { position } of objects) {
		if (!position) continue;
		const [x, , z] = position;
		sumX += x;
		sumZ += z;
		count++;
	}

	if (count === 0) return null;

	return {
		centerX: Number.parseFloat((sumX / count).toFixed(2)),
		centerZ: Number.parseFloat((sumZ / count).toFixed(2)),
	};
};

console.log("Finding center points of the map");
console.log(JSON.stringify(getCenter(TerrainObjects), null, 2));

const getCentermostObject = (objects) => {
	let sumX = 0;
	let sumZ = 0;
	let count = 0;

	for (const { position } of objects) {
		if (!position) continue;
		const [x, , z] = position;
		sumX += x;
		sumZ += z;
		count++;
	}

	if (count === 0) return null;

	const centerX = sumX / count;
	const centerZ = sumZ / count;

	let closest = null;
	let minDistSq = Number.POSITIVE_INFINITY;

	for (const obj of objects) {
		const pos = obj.position;
		if (!pos) continue;

		const [x, , z] = pos;
		const distSq = (x - centerX) ** 2 + (z - centerZ) ** 2;

		if (distSq < minDistSq) {
			minDistSq = distSq;
			closest = obj;
		}
	}

	return {
		name: closest.name,
		position: closest.position,
		distanceToCenter: Number.parseFloat(Math.sqrt(minDistSq).toFixed(2)),
	};
};

console.log("\n\nFinding centermost object of the map");
// closest existing object to the true center
console.log(JSON.stringify(getCentermostObject(TerrainObjects), null, 2));

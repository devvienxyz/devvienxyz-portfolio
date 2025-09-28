import TerrainObjects from "../constants/terrain-objects.js";

const getGeometricCenter = (objects) => {
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

  return count === 0 ? null : [sumX / count, sumZ / count];
};

const getCentermostObject = (objects, centerX, centerZ) => {
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

  return closest;
};

const normalizeMap = (objects) => {
  const [centerX, centerZ] = getGeometricCenter(objects);
  const anchor = getCentermostObject(objects, centerX, centerZ);

  if (!anchor?.position) return objects;

  const [anchorX, , anchorZ] = anchor.position;

  return objects.map((obj) => {
    if (!obj.position) return obj;

    const [x, y, z] = obj.position;

    return {
      ...obj,
      position: [Number.parseFloat((x - anchorX).toFixed(2)), y, Number.parseFloat((z - anchorZ).toFixed(2))],
    };
  });
};

const normalized = normalizeMap(TerrainObjects);
console.log(JSON.stringify(normalized, null, 2));

export default normalizeMap;

import { NormalizedTerrainObjects } from "./terrain-normalized.js";

// Convert world space (x,z) → axial coords (q,r)
function worldToHex(x, z, hexSize = 1) {
  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * z) / hexSize;
  const r = ((2 / 3) * z) / hexSize;
  return hexRound(q, r);
}

function hexRound(q, r) {
  let x = q;
  let z = r;
  let y = -x - z;

  let rx = Math.round(x);
  let ry = Math.round(y);
  let rz = Math.round(z);

  const xDiff = Math.abs(rx - x);
  const yDiff = Math.abs(ry - y);
  const zDiff = Math.abs(rz - z);

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry - rz;
  } else if (yDiff > zDiff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return [rx, rz];
}

// Build the HexMap
function convert(objects) {
  const tiles = new Map();

  for (const obj of objects) {
    const [x, , z] = obj.position;
    const [q, r] = worldToHex(x, z);

    const key = `${q},${r}`;
    if (!tiles.has(key)) {
      tiles.set(key, {
        q,
        r,
        isClickable: false,
        isWalkable: true,
        isUnlocked: true,
        models: [],
      });
    }

    const tile = tiles.get(key);
    tile.models.push({
      name: obj.name,
      rotationY: obj.rotationY ?? 0,
      scale: obj.scale ?? 1,
      offset: obj.position[1] !== 0 ? [0, obj.position[1], 0] : undefined,
    });
  }

  return Array.from(tiles.values());
}

const HexMap = convert(NormalizedTerrainObjects);

// write to file
console.log(JSON.stringify(HexMap, null, 2));

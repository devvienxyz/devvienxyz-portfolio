import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TerrainObjects from "../constants/terrain-objects.js";
import normalizeMap from "./map-normalizer.js";

// Normalize and write to file
const normalized = normalizeMap(TerrainObjects);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputPath = path.join(__dirname, "terrain-normalized.js");
const fileContents = `export const NormalizedTerrainObjects = ${JSON.stringify(normalized, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContents, "utf8");
console.log(`✅ terrain-normalized.js written with ${normalized.length} objects.`);

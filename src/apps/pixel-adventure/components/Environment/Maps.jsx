import MapBuilder from "@pixel/components/Map-Builder/Map-Builder";
import { NormalizedTerrainObjects as TerrainObjects } from "@pixel/constants/terrain-normalized.js";

export default function PixelMap() {
	return <MapBuilder mapObjects={TerrainObjects} modelPathPrefix={"assets/kenney/pixel-map/models"} />;
}

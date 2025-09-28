import MapBuilder from "@pixel/components/Map-Builder/Map-Builder";
import hexMap from "@pixel/constants/maps/hex-map.json";

export default function PixelMap() {
  return <MapBuilder hexMap={hexMap} modelPathPrefix={"assets/kenney/pixel-map/models"} />;
}

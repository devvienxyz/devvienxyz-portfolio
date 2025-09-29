import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import Tile from "@pixel/models/Tile";
import HexTile from "./Hex-Tile";

export default function MapBuilder({ mapObjects, modelPathPrefix }) {
  const { scene } = useThree();
  const mixers = useRef([]);
  const tiles = mapObjects.map((obj, index) => new Tile(index, obj));

  useFrame((_, delta) => {
    for (const mixer of mixers.current) {
      mixer.update(delta);
    }
  });

  return (
    <>
      {tiles.map((tile) => (
        <HexTile key={tile.getKey()} tile={tile} scene={scene} modelPathPrefix={modelPathPrefix} mixers={mixers} />
      ))}
    </>
  );
}

import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// helper: axial to world space conversion for hex tiles
// adjust size based on your hex tile dimensions
function hexToWorld(q, r, size = 1) {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const z = size * (3 / 2) * r;
  return [x, 0, z]; // y=0 since terrain is flat
}

export const loadModel = (scene, loader, mixers, modelPath, { position, scale = 1, rotationY = 0 }) => {
  loader.current.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      if (modelPath.includes("mill")) {
        const mixer = new AnimationMixer(model);
        const clips = gltf.animations;
        if (clips.length) {
          const action = mixer.clipAction(clips[0]);
          action.play();
          mixers.current.push(mixer);
        }
      }

      model.position.set(...position);
      model.scale.set(scale, scale, scale);
      model.rotation.y = rotationY;
    },
    undefined,
    (error) => console.error("Model loading error:", error),
  );
};

export default function MapBuilder({ hexMap, modelPathPrefix }) {
  const { scene } = useThree();
  const loader = useRef(new GLTFLoader());
  const mixers = useRef([]);
  const [loadedTiles, setLoadedTiles] = useState([]);

  useEffect(() => {
    const tileModels = [];

    for (const tile of hexMap) {
      const worldPos = hexToWorld(tile.q, tile.r, 1); // 1 = hex size
      for (const modelDef of tile.models) {
        const { name, scale = 1, rotationY = 0 } = modelDef;
        const modelPath = `${modelPathPrefix}/${name}.glb`;

        loadModel(scene, loader, mixers, modelPath, {
          position: worldPos,
          scale,
          rotationY,
        });

        tileModels.push({
          tile,
          name,
          position: worldPos,
          onClick: tile.isClickable ? () => console.log("Clicked:", tile) : null,
        });
      }
    }

    setLoadedTiles(tileModels);

    return () => {
      for (const mixer of mixers.current) mixer.stopAllAction();
      mixers.current = [];
      setLoadedTiles([]);
    };
  }, [scene, hexMap, modelPathPrefix]);

  useFrame((_, delta) => {
    for (const mixer of mixers.current) mixer.update(delta);
  });

  return (
    <>
      {loadedTiles.map(({ position, onClick }, i) =>
        onClick ? <Clickable3DObject key={i} onClick={onClick} position={position} /> : null,
      )}
    </>
  );
}

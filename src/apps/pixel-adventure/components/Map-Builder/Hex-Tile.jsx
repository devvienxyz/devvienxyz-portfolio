import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import BaseClickable from "./Base-Clickable";

export default function HexTile({ tile, scene, modelPathPrefix, mixers }) {
  const loader = useRef(new GLTFLoader());
  const [model, setModel] = useState(null);

  useEffect(() => {
    const modelPath = tile.getModelPath(modelPathPrefix);

    loader.current.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        model.position.set(...tile.position);
        model.scale.set(tile.scale, tile.scale, tile.scale);
        model.rotation.y = tile.rotationY;

        scene.add(model);
        setModel(model);
        if (tile.name.includes("mill") && gltf.animations.length > 0) {
          const mixer = new AnimationMixer(model);
          mixer.clipAction(gltf.animations[0])?.play();
          mixers.current.push(mixer);
        }
      },
      undefined,
      (err) => console.error(`Failed to load ${tile.name}:`, err),
    );
  }, [tile, scene, modelPathPrefix, mixers]);

  return model ? <BaseClickable object={model} onClick={tile.onClick} position={tile.position} /> : null;
}

import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import { useAvatarStore } from "@pixel/state";
import BaseClickable from "./Base-Clickable";

export default function HexTile({ tile, scene, modelPathPrefix, mixers }) {
  const loader = useRef(new GLTFLoader());
  const [model, setModel] = useState(null);
  const avatarPosition = useAvatarStore((s) => s.position);

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

  // Glow effect when avatar is inside
  useEffect(() => {
    if (!model) return;
    if (!avatarPosition) return;
    const [x, , z] = tile.position;
    const radius = tile.size || 1;

    const dx = avatarPosition.x - x;
    const dz = avatarPosition.z - z;
    const distSq = dx * dx + dz * dz;
    const isInside = distSq < radius * radius;

    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (isInside) {
          child.material.emissive?.setHex(0xffff00); // yellow glow
          child.material.emissiveIntensity = 1.0;
        } else {
          child.material.emissive?.setHex(0x000000);
          child.material.emissiveIntensity = 0.0;
        }
      }
    });
  }, [model, tile, avatarPosition]); // reacts whenever avatar moves

  return model ? (
    <>
      <BaseClickable object={model} onClick={tile.onClick} position={tile.position} />
    </>
  ) : null;
}

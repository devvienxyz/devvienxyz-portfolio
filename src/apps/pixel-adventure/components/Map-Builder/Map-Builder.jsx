import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Clickable3DObject from "./Clickable-3d-Object";

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

const loadGLTFModel = (path) =>
  new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => resolve(gltf),
      undefined,
      (err) => reject(err),
    );
  });

export default function MapBuilder({ mapObjects, modelPathPrefix }) {
  const { scene } = useThree();
  const loader = useRef(new GLTFLoader());
  const mixers = useRef([]);
  const [loadedModels, setLoadedModels] = useState([]);

  useEffect(() => {
    // Render map when the component mounts
    for (const { name, ...rest } of mapObjects) {
      loadModel(scene, loader, mixers, `${modelPathPrefix}/${name}.glb`, rest);
    }

    return () => {
      // Clean up any mixers when the component unmounts
      for (const mixer of mixers.current) {
        mixer.stopAllAction();
      }
      mixers.current = [];
    };
  }, [scene, mapObjects, modelPathPrefix]);

  // useEffect(() => {
  //   let isMounted = true

  //   const loadModels = async () => {
  //     const results = await Promise.allSettled(
  //       mapObjects.map(async ({ name, position, scale = 1, rotationY = 0, onClick }) => {
  //         try {
  //           const gltf = await loadGLTFModel(`${modelPathPrefix}/${name}.glb`)
  //           const model = gltf.scene

  //           model.position.set(...position)
  //           model.scale.setScalar(scale)
  //           model.rotation.y = rotationY

  //           let mixer = null
  //           if (name.includes('mill') && gltf.animations.length > 0) {
  //             mixer = new AnimationMixer(model)
  //             mixer.clipAction(gltf.animations[0])?.play()
  //             mixers.current.push(mixer)
  //           }

  //           return { name, model, onClick, position }
  //         } catch (err) {
  //           console.error(`Failed to load ${name}:`, err)
  //           return null
  //         }
  //       })
  //     )

  //     if (!isMounted) return

  //     const successfulModels = results
  //       .filter((res) => res.status === 'fulfilled' && res.value)
  //       .map((res) => res.value)

  //     setLoadedModels(successfulModels)
  //   }

  //   loadModels()

  //   return () => {
  //     isMounted = false
  //     mixers.current.forEach((m) => m.stopAllAction())
  //     mixers.current = []
  //     setLoadedModels([])
  //   }
  // }, [mapObjects, modelPathPrefix])

  useFrame((_, delta) => {
    for (const mixer of mixers.current) mixer.update(delta);
  });

  // return null;

  return (
    <>
      {loadedModels.map(({ model, onClick, position }, i) => (
        <Clickable3DObject key={i} object={model} onClick={onClick} position={position} />
      ))}
    </>
  );
}

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Sun } from "./Env-Elements";
// import { TerrainMa } from "./Terrain";

// Shader for background gradient
const DUAL_GRADIENT = {
  vertexShader: `
    varying ) {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec3 viewDir = normalize(vWorldPosition);
      float gradient = viewDir.y * 1.0;
      vec3 topColor = vec3(0.988, 0.992, 1.0);
      vec3 bottomColor = vec3(0.0, 0.025, 0.142);
      vec3 color = mix(bottomColor, topColor, gradient);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// Background component using ShaderMaterial
const DynamicBackground = () => {
  const materialRef = useRef();

  return (
    <mesh scale={[50, 50, 50]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={DUAL_GRADIENT.vertexShader}
        fragmentShader={DUAL_GRADIENT.fragmentShader}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

const Environment = () => {
  const { camera, scene } = useThree();
  const controlsRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    camera.position.set(-3, 2, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      {/* Lights */}
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <ambientLight intensity={1.5} />

      {/* Background */}
      <DynamicBackground />

      {/* Sun Component */}
      <Sun scene={scene} />

      {/* Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        enablePan
        screenSpacePanning={false}
        keyPanSpeed={100}
        maxDistance={10}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Terrain and objects */}
      <TerrainMap environment={scene} />

      {/* Signs */}
      <Sign text="About" position={[0, 7, 1.5]} rotation={Math.PI / 2} />
      <Sign text="Projects" position={[0, 6, -1.5]} rotation={-Math.PI / 2} />
      <Sign text="Experiences" position={[-1.5, 5, 0]} rotation={0} isActive />
      <Sign text="Contact" position={[1.5, 4, 0]} rotation={Math.PI} />
    </>
  );
};

export default Environment;

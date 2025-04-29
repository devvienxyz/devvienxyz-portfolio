import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { StreetSign } from "../Street";
import TerrainMap from "./Terrain";

// Shader for background gradient
const DUAL_GRADIENT = {
	vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
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
      // float gradient = viewDir.y * 0.4 + 0.1;  // lighter effect
      vec3 topColor = vec3(0.988, 0.992, 1.0); // rgb(253, 254, 255) or #fdfefe
      vec3 bottomColor = vec3(0.0, 0.025, 0.142); // rgb(0, 6, 36) or #000624
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

export default function Environment() {
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
			{/* <Sun scene={scene} /> */}

			{/* Orbit Controls */}
			<OrbitControls
				ref={controlsRef}
				enableDamping
				enablePan
				screenSpacePanning={false}
				keyPanSpeed={100}
				maxDistance={20}
				minDistance={5}
				maxPolarAngle={Math.PI / 2}
			/>

			{/* Terrain and objects */}
			<TerrainMap environment={scene} />

			{/* Street Objects */}
			<StreetSign />
		</>
	);
}

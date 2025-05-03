import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BackSide } from "three/webgpu";
import { useCameraAnimation } from "../../hooks";
import useGameStateManager, { GameStates } from "../../state/game-store.js";
import Avatar from "../Avatar/Avatar";
import { Sun } from "./Celestials";
import Terrain from "./Terrain";

const TARGET_ZOOMED_POSITION = { x: 0.8, y: 1.0, z: 5.0 };

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

const DynamicBackground = () => {
	const materialRef = useRef();

	return (
		<mesh scale={[50, 50, 50]}>
			<sphereGeometry args={[1, 32, 32]} />
			<shaderMaterial
				ref={materialRef}
				vertexShader={DUAL_GRADIENT.vertexShader}
				fragmentShader={DUAL_GRADIENT.fragmentShader}
				side={BackSide}
			/>
		</mesh>
	);
};

function Lights() {
	return (
		<>
			<directionalLight position={[2, 2, 5]} intensity={1} />
			<ambientLight intensity={1.5} />
		</>
	);
}

export default function Environment() {
	const { camera, scene } = useThree();
	const controlsRef = useRef();
	const setGamePhase = useGameStateManager((s) => s.setGamePhase);

	useCameraAnimation(TARGET_ZOOMED_POSITION, 3, () => {
		setGamePhase(GameStates.MENU);
	});

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
			<Lights />
			<DynamicBackground />
			<Sun scene={scene} />
			<OrbitControls
				ref={controlsRef}
				enableDamping
				enablePan
				screenSpacePanning={false}
				keyPanSpeed={100}
				maxDistance={10}
				minDistance={2}
				maxPolarAngle={Math.PI / 2}
			/>
			<Terrain scene={scene} />
			<Avatar />
		</>
	);
}

export { Lights };

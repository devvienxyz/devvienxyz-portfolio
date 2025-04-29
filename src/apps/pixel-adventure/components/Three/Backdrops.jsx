import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Define custom shader material
const GradientMaterial = shaderMaterial(
	{ uColor: new THREE.Color(0x000000) },
	// Vertex Shader
	`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	// Fragment Shader
	`
		varying vec2 vUv;
		uniform vec3 uColor;
		void main() {
			float alpha = 1.0 - vUv.y;
			gl_FragColor = vec4(uColor, alpha);
		}
	`,
);

extend({ GradientMaterial });

export default function GradientBackdrop({ width = 1.0, height = 1.0 }) {
	return (
		<mesh position={[-1.7, 0, -0.05]} renderOrder={-1}>
			<planeGeometry args={[width, height]} />
			<gradientMaterial transparent depthWrite={false} />
		</mesh>
	);
}

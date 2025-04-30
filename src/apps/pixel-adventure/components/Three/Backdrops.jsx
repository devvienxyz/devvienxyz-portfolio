import { ScreenQuad, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Define custom shader material
// const GradientMaterial = shaderMaterial(
// 	{ uColor: new THREE.Color(0x000000) },
// 	// Vertex Shader
// 	`
// 		varying vec2 vUv;
// 		void main() {
// 			vUv = uv;
// 			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// 		}
// 	`,
// 	// Fragment Shader
// 	`
// 		varying vec2 vUv;
// 		uniform vec3 uColor;
// 		void main() {
// 			float alpha = 1.0 - vUv.y;
// 			gl_FragColor = vec4(uColor, alpha);
// 		}
// 	`,
// );

// extend({ GradientMaterial });

// function GradientBackdrop({ width = 1.0, height = 1.0, position = [0, 0, 0] }) {
// 	// [-1.7, 0, -0.05]
// 	return (
// 		<mesh position={position} renderOrder={-1}>
// 			<planeGeometry args={[width, height]} />
// 			<gradientMaterial transparent depthWrite={false} />
// 		</mesh>
// 	);
// }

const GradientMaterial = shaderMaterial(
	{ uColor: new THREE.Color(0x000000), uOpacity: 0.5 }, // Add uOpacity uniform
	`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
	`
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uOpacity;
    void main() {
      float alpha = (1.0 - vUv.y) * uOpacity; // Control transparency
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
);

extend({ GradientMaterial });

function FullScreenGradientBackdrop() {
	return (
		<ScreenQuad renderOrder={-1000}>
			<gradientMaterial
				transparent
				depthWrite={false}
				depthTest={false}
				uOpacity={0.3}
				blending={THREE.NormalBlending}
			/>
		</ScreenQuad>
	);
}

// export { GradientBackdrop };
export { FullScreenGradientBackdrop };

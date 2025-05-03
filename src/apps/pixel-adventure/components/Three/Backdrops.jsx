import { ScreenQuad, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, NormalBlending } from "three";

const GradientMaterial = shaderMaterial(
	{ uColor: new Color(0x000000), uOpacity: 0.5 }, // Add uOpacity uniform
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

// export default function FullScreenGradientBackdrop() {
// 	return (
// 		<ScreenQuad
// 			renderOrder={-10}
// 			transparent={true}
// 			depthWrite={false}
// 			depthTest={false}
// 			uOpacity={0.3} // Adjust opacity as needed
// 			blending={NormalBlending}
// 		>
// 			<gradientMaterial uColor={new Color(0xff0000)} />
// 			{/* <gradientMaterial transparent depthWrite={false} depthTest={false} uOpacity={0.3} blending={NormalBlending} /> */}
// 		</ScreenQuad>
// 	);
// }

export default function FullScreenGradientBackdrop() {
	const backdropRef = useRef();
	useEffect(() => {
		if (backdropRef.current) {
			backdropRef.current.layers.set(1); // Set backdrop to layer 1
		}
	}, []);

	return (
		<ScreenQuad
			ref={backdropRef}
			renderOrder={-10}
			// transparent={true}
			// depthWrite={false}
			// depthTest={false}
			// uOpacity={0.3}
			// blending={NormalBlending}
		>
			{/* <gradientMaterial /> */}
			{/* <gradientMaterial uColor={new Color(0xff0000)} /> */}
			{/* <gradientMaterial transparent depthWrite={false} depthTest={false} uOpacity={0.3} blending={NormalBlending} /> */}
			<gradientMaterial
				transparent
				uColor={new Color(0xff0000)}
				depthWrite={false}
				depthTest={false}
				uOpacity={0.3}
				blending={NormalBlending}
			/>
		</ScreenQuad>
	);
}

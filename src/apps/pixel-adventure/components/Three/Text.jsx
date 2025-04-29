import { Text3D } from "@react-three/drei";
import React from "react";

const fontUrl = "assets/fonts/jersey_15/Jersey 15_Regular.json";
const defaultTextOptions = {
	fontSize: 1,
	position: [0, 0, 0],
	color: "white",
	height: 0.5, // Extrusion depth
	curveSegments: 12,
	bevelEnabled: false, // Bevel disabled by default
	bevelThickness: 0.05, // Bevel thickness (only if bevelEnabled is true)
	bevelSize: 0.1,
	scale: 0.2,
};

function PixelText3D({ text, textOptions = {}, withGlow = false }) {
	const mergedTextOptions = { ...defaultTextOptions, ...textOptions };

	return (
		<Text3D font={fontUrl} {...mergedTextOptions}>
			{text}
			{withGlow ? (
				<meshStandardMaterial color="yellow" emissive="cyan" emissiveIntensity={1} metalness={0.3} roughness={0.1} />
			) : (
				<meshNormalMaterial />
			)}
		</Text3D>
	);
}

export { PixelText3D };

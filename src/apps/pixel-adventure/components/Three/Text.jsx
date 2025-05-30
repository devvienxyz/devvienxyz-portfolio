import { Text3D as DreiText3d } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { DEFAULT_FONT } from "../../constants/terrain-misc.js";
import NormalColorMaterial from "../Shaders/Normal.js";

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

extend({ NormalColorMaterial });

export default function Text({ text, textOptions = {}, withGlow = false, ...rest }) {
	const mergedTextOptions = { ...defaultTextOptions, ...textOptions, ...rest };

	return (
		<DreiText3d font={DEFAULT_FONT} {...mergedTextOptions}>
			{text}
			{withGlow ? (
				<meshStandardMaterial color="yellow" emissive="cyan" emissiveIntensity={1} metalness={0.3} roughness={0.1} />
			) : (
				<meshNormalMaterial />
			)}
		</DreiText3d>
	);
}

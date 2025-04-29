import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { PixelText3D } from "../Three";
import GradientBackdrop from "../Three/Backdrops";

function Sign({ text, position, isActive }) {
	const signRef = useRef();
	// added small offset to separate the cube and the text
	const cubeOffset = [-0.1, 0.05, 0];

	return (
		<group ref={signRef} position={position}>
			{/* Temp: Simple cube marker */}
			<mesh position={cubeOffset}>
				<boxGeometry args={[0.12, 0.12, 0.12]} />
				<meshStandardMaterial
					color={isActive ? "yellow" : "blue"}
					emissive="white"
					emissiveIntensity={isActive ? 0.6 : 0}
				/>
			</mesh>
			<PixelText3D text={text} textOptions={{ scale: 0.12 }} />
		</group>
	);
}

export default function StreetSign({ x = -2, y = 0, z = 1.7 }) {
	return (
		<group position={[x, y, z]} rotation={[0, 0, 0]}>
			<Sign text="About" position={[x, 0.75, 0]} />
			<Sign text="Projects" position={[x, 0.6, 0]} />
			<Sign text="Experiences" position={[x, 0.45, 0]} isActive />
			<Sign text="Contact" position={[x, 0.3, 0]} />
			<GradientBackdrop width={1.0} height={1.0} />
		</group>
	);
}

export { Sign };

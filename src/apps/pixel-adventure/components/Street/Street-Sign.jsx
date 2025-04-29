import { Text } from "@react-three/drei";
import React, { useRef, useEffect } from "react";

export function Sign({ text, position, rotation, areaName, isActive }) {
	const signRef = useRef();

	return (
		<group ref={signRef} position={position} rotation={[0, rotation, 0]}>
			{/* Arrow Sign */}
			<mesh>
				<boxGeometry args={[1.5, 0.3, 0.2]} />
				<meshStandardMaterial color={isActive ? "red" : "blue"} />
			</mesh>

			{/* Text Label */}
			<Text position={[0, 0, 0.1]} fontSize={0.2} color="white">
				{text}
			</Text>
		</group>
	);
}

export default function StreetSign() {
	return (
		<group>
			<Sign text="About" position={[0, 7, 1.5]} rotation={Math.PI / 2} />
			<Sign text="Projects" position={[0, 6, -1.5]} rotation={-Math.PI / 2} />
			<Sign text="Experiences" position={[-1.5, 5, 0]} rotation={0} isActive />
			<Sign text="Contact" position={[1.5, 4, 0]} rotation={Math.PI} />
		</group>
	);
}

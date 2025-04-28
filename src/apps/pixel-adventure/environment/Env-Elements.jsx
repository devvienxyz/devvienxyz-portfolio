import { useThree } from "@react-three/fiber";
import React, { useRef } from "react";

export const Sun = () => {
	const sunRef = useRef();

	return (
		<>
			{/* Sun Sphere */}
			<mesh ref={sunRef} position={[4, 10, -5]}>
				<sphereGeometry args={[2, 32, 32]} />
				<meshBasicMaterial transparent />
			</mesh>

			{/* Sunlight */}
			<pointLight color={0xffcc00} intensity={200} distance={100} position={[0, 15, -5]} />
			<pointLight color={0xf7f9ff} intensity={200} distance={100} position={[4, 8, -5]} />
		</>
	);
};

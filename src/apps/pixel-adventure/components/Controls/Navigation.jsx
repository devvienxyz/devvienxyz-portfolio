import React, { useRef } from "react";
import { PixelText3D } from "../Three";

function NavItem({ text, position, isActive, scale = 0.5 }) {
	const NavItemRef = useRef();
	// added small offset to separate the cube and the text
	const cubeOffset = [-0.1, 0.05, 0];

	return (
		<group ref={NavItemRef} position={position} scale={scale}>
			{/* Temp: Simple cube marker */}
			<mesh position={cubeOffset}>
				<boxGeometry args={[0.12, 0.12, 0.12]} />
				<meshStandardMaterial
					color={isActive ? "yellow" : "blue"}
					emissive="white"
					emissiveIntensity={isActive ? 0.6 : 0}
				/>
			</mesh>
			{/* <PixelText3D text={text} textOptions={{ scale }} /> */}
			<PixelText3D text={text} />
		</group>
	);
}

export default function NavigationMenu({ x = -2, y = 0, z = 1.7 }) {
	return (
		<group position={[x, y, z]} rotation={[0, -0.7, 0]} renderOrder={999} transparent={false}>
			<NavItem text="About" position={[x, 0.75, 0]} />
			<NavItem text="Projects" position={[x, 0.6, 0]} />
			<NavItem text="Experiences" position={[x, 0.45, 0]} isActive />
			<NavItem text="Contact" position={[x, 0.3, 0]} />

			{/* select */}
			{/* <GradientBackdrop width={1.0} height={1.0} position={[0.8, 0.5, 0]} /> */}
			<meshStandardMaterial attach="material" color="white" transparent={false} depthWrite depthTest />
		</group>
	);
}

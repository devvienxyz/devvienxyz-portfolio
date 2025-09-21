"use client";

export default function Clickable3DObject({ onClick, position }) {
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick?.();
		}
	};

	return (
		<mesh
			tabIndex={0} // Makes it focusable
			onClick={onClick}
			onKeyDown={handleKeyDown}
			position={position}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}

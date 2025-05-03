import { useEffect, useRef, useState } from "react";

export default function Anchor({ href, position }) {
	const meshRef = useRef();
	const [hovered, setHovered] = useState(false);

	const handleActivate = () => window.open(href, "_blank");

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Enter" || e.key === " ") handleActivate();
		},
		[handleActivate],
	);

	useEffect(() => {
		const el = meshRef.current;
		if (!el) return;

		el.tabIndex = 0; // make focusable
		el.addEventListener("keydown", handleKeyDown);
		return () => el.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	return (
		<mesh
			ref={meshRef}
			position={position}
			onClick={handleActivate}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") handleActivate();
			}}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			onFocus={() => setHovered(true)}
			onBlur={() => setHovered(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "yellow" : "orange"} />
		</mesh>
	);
}

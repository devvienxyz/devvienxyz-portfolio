import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { Quaternion } from "three/src/math/Quaternion";

const directionMap = {
	up: [0, 1, 0],
	down: [0, -1, 0],
	left: [-1, 0, 0],
	right: [1, 0, 0],
	forward: [0, 0, -1],
	back: [0, 0, 1],
};

function Arrow({
	from = [0, 0, 0],
	to,
	direction, // optional
	color = "red",
	scale = 1,
}) {
	const ref = useRef();

	const computedTo = useMemo(() => {
		if (direction && directionMap[direction]) {
			const dirVec = new Vector3(...directionMap[direction]).multiplyScalar(scale).add(new Vector3(...from));
			return dirVec.toArray();
		}
		return to || [0, 1, 0]; // fallback
	}, [from, to, direction, scale]);

	useEffect(() => {
		const fromVec = new Vector3(...from);
		const toVec = new Vector3(...computedTo);
		const dir = toVec.clone().sub(fromVec).normalize();
		const length = toVec.distanceTo(fromVec);

		ref.current.setDirection(dir);
		ref.current.setLength(length, 0.2 * length, 0.1 * length);
	}, [from, computedTo]);

	return <arrowHelper ref={ref} args={[new Vector3(0, 1, 0), new Vector3(...from), 1, color]} />;
}

function MeshArrow({ position = [0, 0, 0], length = 0.3, color = "red" }) {
	const shaftLength = 0.8 * length;
	const headLength = 0.2 * length;

	return (
		<group position={position}>
			{/* Shaft */}
			<mesh position={[0, shaftLength / 2, 0]}>
				<cylinderGeometry args={[0.05, 0.05, shaftLength, 8]} />
				<meshStandardMaterial color={color} />
			</mesh>

			{/* Arrowhead */}
			<mesh position={[0, shaftLength + headLength / 2, 0]}>
				<coneGeometry args={[0.1, headLength, 8]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</group>
	);
}

function DirectionalArrow({
	from = [0, 0, 0],
	to = [0, 1, 0],
	color = "red",
	shaftRadius = 0.05,
	headRadius = 0.1,
	headLengthRatio = 0.2,
}) {
	// Create vectors for 'from' and 'to' points
	const fromVec = new Vector3(...from);
	const toVec = new Vector3(...to);

	// Calculate direction and length
	const dir = toVec.clone().sub(fromVec).normalize();
	const length = fromVec.distanceTo(toVec);
	const headLength = length * headLengthRatio;
	const shaftLength = length - headLength;

	const groupRef = useRef();

	// Effect to update the position and rotation of the arrow
	useEffect(() => {
		// Calculate rotation to align the arrow with the direction
		const quaternion = new Quaternion().setFromUnitVectors(
			new Vector3(0, 1, 0), // default forward direction
			dir,
		);
		groupRef.current.setRotationFromQuaternion(quaternion);
	}, [dir]);

	return (
		<group ref={groupRef} position={from}>
			{/* Shaft */}
			<mesh position={[0, shaftLength / 2, 0]}>
				<cylinderGeometry args={[shaftRadius, shaftRadius, shaftLength, 8]} />
				<meshStandardMaterial color={color} />
			</mesh>

			{/* Arrowhead */}
			<mesh position={[0, shaftLength + headLength / 2, 0]}>
				<coneGeometry args={[headRadius, headLength, 8]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</group>
	);
}

function MetalPole({ x = 0, y = 0.5, z = 0 }) {
	return (
		<mesh position={[x, y, z]}>
			<cylinderGeometry args={[0.05, 0.05, 2, 32]} />
			<meshStandardMaterial metalness={1} roughness={0.2} color="white" />
		</mesh>
	);
}

function RegularPole({ x = 0, y = 0, z = 0 }) {
	return (
		// TODO: Glow or make it more noticeable
		<mesh position={[x, y, z]}>
			{/* radius, pole thickness, height, smoothness via curve segments */}
			<cylinderGeometry args={[0.02, 0.02, 1.0, 16]} />
			<meshStandardMaterial color="gray" />
		</mesh>
	);
}

export { Arrow, RegularPole, MeshArrow, DirectionalArrow };

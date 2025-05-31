import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";

function animateCamera(camera, targetPosition, cameraLookAt, duration, onComplete) {
	const [x, y, z] = targetPosition;
	const [cx, cy, cz] = cameraLookAt;

	return gsap.to(camera.position, {
		duration,
		x,
		y,
		z,
		// onUpdate: () => {
		// 	// camera.lookAt(0, 0, 0); // Ensure camera focuses on the scene center (or other target)
		// 	camera.lookAt(cx, cy, cz); // Ensure camera focuses on the scene center (or other target)
		// },
		onUpdate: () => {
			camera.rotation.set(
				gsap.utils.interpolate(camera.rotation.x, 0, 0.5),
				gsap.utils.interpolate(camera.rotation.y, 0, 0.5),
				gsap.utils.interpolate(camera.rotation.z, 0, 0.5),
			);
		},

		ease: "power2.inOut",
		onStart: () => {
			// console.log("Camera animation started");
		},
		onComplete,
	});
}

export default function useCameraAnimation(
	targetPosition,
	cameraLookAt = [0, 0, 0],
	durationInSec = 2,
	onComplete = () => {},
) {
	const { camera } = useThree();

	useEffect(() => {
		if (!camera) return;

		// Log the initial position and target for debugging
		// console.log("Animating camera from", camera.position);
		// console.log("Target position:", targetPosition);

		// Run the camera animation
		const animation = animateCamera(camera, targetPosition, targetPosition, durationInSec, onComplete);

		return () => {
			// Cleanup: kill any active GSAP tweens when the component unmounts
			animation.kill();
			// console.log("Camera animation cleaned up");
		};
	}, [camera, targetPosition, durationInSec, onComplete]);

	return;
}

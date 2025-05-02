import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";

function animateCamera(camera, targetPosition, duration = 2, onComplete = () => {}) {
	return gsap.to(camera.position, {
		duration: duration,
		x: targetPosition.x,
		y: targetPosition.y,
		z: targetPosition.z,
		onUpdate: () => {
			camera.lookAt(0, 0, 0); // Ensure camera focuses on the scene center (or other target)
		},
		ease: "power2.inOut",
		onStart: () => {
			// console.log("Camera animation started");
		},
		onComplete,
	});
}

export default function useCameraAnimation(targetPosition, durationInSec = 2, onComplete = () => {}) {
	const { camera } = useThree();

	useEffect(() => {
		if (!camera) return;

		// Log the initial position and target for debugging
		// console.log("Animating camera from", camera.position);
		// console.log("Target position:", targetPosition);

		// Run the camera animation
		const animation = animateCamera(camera, targetPosition, durationInSec, onComplete);

		return () => {
			// Cleanup: kill any active GSAP tweens when the component unmounts
			animation.kill();
			// console.log("Camera animation cleaned up");
		};
	}, [camera, targetPosition, durationInSec, onComplete]);

	return;
}

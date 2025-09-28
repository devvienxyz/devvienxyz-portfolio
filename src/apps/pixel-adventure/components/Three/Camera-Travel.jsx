import { useThree } from "@react-three/fiber";
import gsap from "gsap";

export default function CameraTravel({ targetPosition, duration = 2, ease = "power2.inOut" }) {
  const { camera } = useThree();

  const moveCamera = () => {
    gsap.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: duration,
      ease: ease,
    });
  };

  return null;
}

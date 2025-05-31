import Text from "@pixel/components/Three/Text";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export default function Cube3dLoader() {
	const { scene } = useThree();

	useEffect(() => {
		const geometry = new BoxGeometry(0.5, 0.5, 0.5);
		const material = new MeshBasicMaterial({ color: 0x00ff00 }); // apple green
		const cube = new Mesh(geometry, material);
		scene.add(cube);

		const animate = () => {
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			requestAnimationFrame(animate);
		};
		animate();

		return () => {
			scene.remove(cube); // Clean up on unmount
		};
	}, [scene]);

	return <Text text="Loading ..." position={[-0.45, -0.8, 0]} withGlow={false} />;
}

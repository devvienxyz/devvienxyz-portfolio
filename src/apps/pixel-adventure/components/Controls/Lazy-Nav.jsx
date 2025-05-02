import { Suspense, lazy } from "react";

const Navigation3DMenu = lazy(() => import("./Navigation"));
const FullScreenGradientBackdrop = lazy(() => import("../Three/Backdrops"));

export default function LazyNavBackdrop() {
	return (
		<Suspense fallback={null}>
			<FullScreenGradientBackdrop />
			<Navigation3DMenu x={0.5} z={2.5} />
		</Suspense>
	);
}

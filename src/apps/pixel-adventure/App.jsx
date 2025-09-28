import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import DebugPanel from "@pixel/components/Controls/Debug-Panel";
import GridGuide from "@pixel/components/Controls/Grid-Guide";
import LazyNavBackdrop from "@pixel/components/Controls/Lazy-Nav";
import { Environment } from "@pixel/components/Environment";
import { Cube3dLoader } from "@pixel/components/Loaders";
import useGameStateManager, { GameStates } from "@pixel/state/game-store";
import { getConfig } from "@/config/runtime";

export default function App() {
  const { isDebug } = getConfig();
  const completedZone = useGameStateManager(({ completedZone }) => completedZone);
  const [showGrid, setShowGrid] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);
  const showMenu = completedZone === 4;

  return (
    <div className="w-full h-screen">
      {isDebug && <DebugPanel {...{ isDebug, showGrid, setShowGrid, showMarkers, setShowMarkers }} />}

      <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
        <Suspense fallback={<Cube3dLoader />}>
          <Environment />
          {showMenu && <LazyNavBackdrop />}
          {isDebug && showGrid && <GridGuide showMarkers={showMarkers} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

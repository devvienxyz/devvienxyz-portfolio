import { GridGuideToggle, GridMarkersToggle } from "./Grid-Guide";

export default function DebugPanel({ isDebug, showGrid, setShowGrid, showMarkers, setShowMarkers }) {
  return (
    <div className="absolute top-0 left-0 z-[1]">
      <GridGuideToggle isDebug={isDebug} showGrid={showGrid} setShowGrid={setShowGrid} />
      <GridMarkersToggle showGrid={showGrid} showMarkers={showMarkers} setShowMarkers={setShowMarkers} />
    </div>
  );
}

import { Suspense, lazy, useEffect, useState } from "react";

// const Navigation3DMenu = lazy(() => import("./Navigation"));
const Menu = lazy(() => import("./Menu"));
const FullScreenGradientBackdrop = lazy(() => import("../Three/Backdrops"));

export default function LazyNavBackdrop() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Delay menu reveal slightly
    const timeout = setTimeout(() => setShowMenu(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Suspense fallback={null}>
      {/* {showMenu && <Navigation3DMenu />} */}
      {showMenu && <Menu />}
      <FullScreenGradientBackdrop />
    </Suspense>
  );
}

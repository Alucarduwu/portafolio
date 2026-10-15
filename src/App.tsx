import { GlobalStateProvider } from "./context/GlobalContext";
import OnePage from "./components/OnePage";
import { lazy, Suspense } from "react";

const PortfolioWorlds = lazy(() => import("./components/worlds/PortfolioWorlds"));
const world = new URLSearchParams(window.location.search).get("world");

// Todo el portafolio es una sola página; las rutas viejas (/about, /projects…)
// las resuelve OnePage bajando a su sección.
const App = () => (
    world === "metro" || world === "space" ? (
      <Suspense fallback={<p role="status">Abriendo otro universo…</p>}>
        <PortfolioWorlds mode={world} />
      </Suspense>
    ) : <GlobalStateProvider><OnePage /></GlobalStateProvider>
);

export default App;

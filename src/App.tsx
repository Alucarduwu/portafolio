import { GlobalStateProvider } from "./context/GlobalContext";
import OnePage from "./components/OnePage";

// Todo el portafolio es una sola página; las rutas viejas (/about, /projects…)
// las resuelve OnePage bajando a su sección.
const App = () => (
  <GlobalStateProvider>
    <OnePage />
  </GlobalStateProvider>
);

export default App;

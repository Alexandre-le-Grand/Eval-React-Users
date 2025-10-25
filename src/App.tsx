import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import { useAppContext } from "./context/AppContext";

function App() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div>
      <header style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
        <h1>Gestion des utilisateurs</h1>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Mode sombre" : "Mode clair"}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

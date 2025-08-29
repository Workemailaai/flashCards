import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./app/Layout";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Game from "./pages/Game/Game";
import DeckDetail from "./pages/Game/DeckDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<DeckDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

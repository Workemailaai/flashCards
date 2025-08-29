import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./app/Layout";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

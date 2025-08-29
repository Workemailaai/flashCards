import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    handleUserChange();
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // 👈 переброс на страницу логина
  };

  return (
    <div className="navContainer">
      <h3>Навигация</h3>
      <div style={{ display: "flex", gap: "20px", paddingRight: "35px" }}>
        <NavLink to="/">Главная</NavLink>
        {user ? (
          <span style={{ cursor: "pointer" }} onClick={logout}>
            Выйти
          </span>
        ) : (
          <NavLink to="/login">Логин</NavLink>
        )}
        <NavLink to="/register">Регистрация</NavLink>
        <NavLink to="/game">Игра</NavLink>
      </div>
    </div>
  );
}

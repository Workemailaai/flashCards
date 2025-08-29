import React from "react";
import { Link, NavLink } from "react-router-dom"; // Change from 'react-router' to 'react-router-dom'
import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="navContainer">
      <h3>Навигация</h3>
      <div style={{ display: "flex", gap: "20px", paddingRight: "35px" }}>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/login">Логин</NavLink>
      </div>
    </div>
  );
}
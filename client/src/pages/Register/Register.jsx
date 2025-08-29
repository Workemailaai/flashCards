import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate(); // 👈 хук для навигации

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // читаем ответ
        setStatus("✅ Пользователь зарегистрирован!");
        navigate("/login"); // 👈 переход
      } else {
        let errorMessage = "Неизвестная ошибка";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText; // если не JSON, берём статус
        }
        setStatus(`❌ Ошибка: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Ошибка сети");
    }
  };

  return (
    <div className="registerContainer">
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="Введите имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        label="email"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        type="password"
        label="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Зарегестрироваться
      </button>
      {status && <span>{status}</span>}
    </div>
  );
};

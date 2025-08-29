import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setStatus("✅ Пользователь зарегистрирован!");
      } else {
        const errorData = await response.json();
        setStatus(`❌ Ошибка: ${errorData.message || "Неизвестная"}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Ошибка сети");
    }

    //Здесь должен быть фетч который записывает пользователя
    //1. input/pass 2. Fetch (POST) body{email, pass} 3. Завести state под статус записи
  };

  return (
    <div>
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

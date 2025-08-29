import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setStatus("✅ Успешный вход");
      } else {
        const error = await response.json();
        setStatus(`❌ Ошибка: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Ошибка сети");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Войти</button>
      {status && <p>{status}</p>}
      {user && (
        <div>
          <p>Добро пожаловать, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </form>
  );
};

export default Login;

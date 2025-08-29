import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(email);
      setStatus("Errore");
    } catch (error) {
      console.log(error);
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

      <input type="password" label="password" />
      <button type="submit" onClick={handleSubmit}>
        Зарегестрироваться
      </button>
      {status && <span>{status}</span>}
    </div>
  );
};

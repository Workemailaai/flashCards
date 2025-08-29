import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeckDetail = () => {
  const { id } = useParams(); // получаем id из URL
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/decks/${id}/questions`)
      .then((res) => res.json())
      .then((json) => {
        console.log("Ответ от сервера:", json);

        const cardsFromServer = json.data || [];
        setCards(cardsFromServer);

        // Название колоды по id (можно вынести на сервер и отдавать там)
        const deckNameMap = {
          1: "Италия",
          2: "Моника Беллуччи",
          3: "Адриано Челентано",
        };
        setDeckTitle(deckNameMap[id] || "Тема");

        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке карточек:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>{deckTitle}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id} style={{ marginBottom: "1.5rem" }}>
            <strong>❓ {card.question}</strong>
            <br />
            <span>✅ {card.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckDetail;

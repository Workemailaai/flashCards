import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // обязательно, если используешь React Router

const Game = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/decks') 
      .then(response => response.json())
      .then(json => setDecks(json.data || []))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  return (
    <div>
      <h1>Game</h1>
      <ul>
        {decks.map(deck => (
          <li key={deck.id}>
            <Link to={`/game/${deck.id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
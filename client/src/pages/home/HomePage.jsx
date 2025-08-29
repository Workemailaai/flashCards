import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  //   const navigate = useNavigate();

  return (
    <>
      <div className="flashCardDecksContainer">
        <div className="flashCardTitle">
          <h2>Flashcard Decks</h2>
        </div>
        <div className="decksContainer">

        </div>
      </div>
    </>
  );
}
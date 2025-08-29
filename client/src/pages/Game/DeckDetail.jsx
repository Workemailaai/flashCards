import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const normalize = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, " ");

export default function DeckDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // отметки времени и защита от повторной отправки результата
  const startISO = useRef(new Date().toISOString());
  const postedRef = useRef(false);

  // 1) Загружаем вопросы по колоде
  useEffect(() => {
    setLoading(true);
    postedRef.current = false; // новый раунд — разрешаем постинг
    startISO.current = new Date().toISOString(); // новая сессия

    fetch(`http://localhost:3000/api/decks/${id}/questions`)
      .then((res) => res.json())
      .then((json) => {
        const list = (json?.data || []).sort((a, b) => a.id - b.id);
        setCards(list);
        const names = {
          1: "Италия",
          2: "Моника Беллуччи",
          3: "Адриано Челентано",
        };
        setDeckTitle(names[id] || "Тема");
        setIdx(0);
        setAnswer("");
        setTotal(0);
        setCorrect(0);
        setFeedback(null);
      })
      .catch((e) => console.error("load questions error:", e))
      .finally(() => setLoading(false));
  }, [id]);

  const current = cards[idx];
  const progress = useMemo(
    () => (cards.length ? `${idx + 1} / ${cards.length}` : "0 / 0"),
    [idx, cards.length]
  );

  // 2) Отправляем результат, когда дошли до конца
  useEffect(() => {
    if (!cards.length) return;
    const finished = idx >= cards.length && total > 0;
    if (!finished || postedRef.current) return;

    postedRef.current = true; // чтобы не отправить повторно
    const payload = {
      userId: 1, // подставь из auth, если есть
      deckId: Number(id),
      score: correct,
      total,
      // можно добавить startedAt/finishedAt позже, если расширите схему
    };

    fetch("http://localhost:3000/api/rounds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((resp) => console.log("Round saved:", resp))
      .catch(console.error);
  }, [idx, cards.length, total, correct, id]);

  const submit = (e) => {
    e.preventDefault();
    if (!current) return;

    const isRight = normalize(answer) === normalize(current.answer);
    setTotal((t) => t + 1);
    setCorrect((c) => c + (isRight ? 1 : 0));
    setFeedback(isRight ? "Верно!" : `Неверно. Правильно: ${current.answer}`);

    setTimeout(() => {
      setIdx((i) => i + 1);
      setAnswer("");
      setFeedback(null);
    }, 900);
  };

  const restart = () => {
    setIdx(0);
    setAnswer("");
    setTotal(0);
    setCorrect(0);
    setFeedback(null);
    postedRef.current = false; // заново разрешаем отправку
    startISO.current = new Date().toISOString();
  };

  if (loading) return <p style={{ padding: "2rem" }}>Загрузка…</p>;

  if (!current) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: 8 }}>{deckTitle}: результат</h2>
        <p style={{ marginBottom: 16 }}>
          Правильных: <b>{correct}</b> из <b>{total}</b> (
          {total ? Math.round((correct / total) * 100) : 0}%)
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={restart}>Пройти ещё раз</button>
          <button onClick={() => navigate("/game")}>Вернуться к темам</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 720 }}>
      <h2 style={{ marginBottom: 4 }}>{deckTitle}</h2>
      <div style={{ opacity: 0.7, marginBottom: 16 }}>Вопрос {progress}</div>

      <div
        style={{
          padding: "1rem",
          borderRadius: 12,
          border: "1px solid #444",
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 12 }}>
          ❓ {current.question}
        </div>

        <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
          <input
            autoFocus
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Введи ответ…"
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #666",
              background: "transparent",
              outline: "none",
            }}
          />
          <button type="submit">Ответить</button>
        </form>

        {feedback && (
          <div style={{ marginTop: 10 }}>
            {feedback === "Верно!" ? "✅ " : "❌ "}
            {feedback}
          </div>
        )}
      </div>

      <div style={{ opacity: 0.8 }}>
        Счёт: <b>{correct}</b> / <b>{total}</b>
      </div>
    </div>
  );
}

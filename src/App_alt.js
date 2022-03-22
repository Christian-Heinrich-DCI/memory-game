import { useState, useEffect } from "react";
import "./App.css";

const cards = [
  { id: 0, color: "#f3722c", label: "Orange", show: false },
  { id: 1, color: "#f3722c", label: "Orange", show: false },
  { id: 2, color: "#f8961e", label: "Peach", show: false },
  { id: 3, color: "#f8961e", label: "Peach", show: false },
  { id: 4, color: "#f9c74f", label: "Banana", show: false },
  { id: 5, color: "#f9c74f", label: "Banana", show: false },
  { id: 6, color: "#90be6d", label: "Grape", show: false },
  { id: 7, color: "#90be6d", label: "Grape", show: false },
  { id: 8, color: "#43aa8b", label: "Kiwi", show: false },
  { id: 9, color: "#43aa8b", label: "Kiwi", show: false },
  { id: 10, color: "#577590", label: "Plum", show: false },
  { id: 11, color: "#577590", label: "Plum", show: false },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function App() {
  const [gameBoard, setGameboard] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [previousCard, setPreviousCard] = useState();
  const [clicked, setClicked] = useState(0);

  // Beim ersten Laden Seite
  useEffect(() => {
    setGameboard(shuffle(cards));
  }, []);

  useEffect(() => {
    if (currentCard !== null) {
      // KARTE ANZEIGEN
      const clickedCard = gameBoard.filter((card) => card.id === currentCard);
      clickedCard[0].show = true;
      setGameboard([...gameBoard], clickedCard[0]);
      setClicked(clicked + 1);
    }
  }, [currentCard]);

  return (
    <div className="App">
      <header>{currentCard}</header>
      <main>
        {gameBoard.map((card, index) =>
          card.show ? (
            <figure
              className="card"
              key={index}
              style={{
                backgroundColor: card.color,
              }}
              onClick={() => setCurrentCard(card.id)}
            >
              {card.label}
            </figure>
          ) : (
            <figure
              className="card hidden"
              key={index}
              onClick={() => setCurrentCard(card.id)}
            >
              MEMORY GAME
            </figure>
          )
        )}
      </main>
    </div>
  );
}

export default App;

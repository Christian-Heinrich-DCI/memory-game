import { useEffect, useState } from "react";
import "./App.css";

// Array: Alle Karten
const cards = [
  // Einzelnes Objekt beschreibt eine Karte
  { color: "#f3722c", label: "Orange" },
  { color: "#f8961e", label: "Peach" },
  { color: "#f9c74f", label: "Banana" },
  { color: "#90be6d", label: "Grape" },
  { color: "#43aa8b", label: "Kiwi" },
  { color: "#577590", label: "Plum" },
];

function App() {
  // useState = benutze React "Status" / "Zustand"
  // Beobachte Punkte
  const [punkte, setPunkte] = useState(0);
  const [nachricht, setNachricht] = useState("");

  useEffect(
    () => {
      // was soll ich machen?
      // Wenn ich 10 Punkte habe,
      if (punkte === 10) {
        // dann möchte ich ausgeben: "Zeit abgelaufen"
        // habe kein Ort / Variable um irgendeine Nachricht anzuzeigen
        // -> muss die anlegen
        setNachricht("Zeit abgelaufen");
      }
    },
    // was soll ich im Auge behalten? -> []
    [punkte]
  );

  return (
    <div className="App">
      <aside>
        <h1>MEMORY GAME</h1>
        <p>
          <strong>PUNKTE:</strong> {punkte}
        </p>
        <p>
          <strong>Nachricht:</strong> {nachricht}
        </p>
      </aside>

      <main>
        {cards.map((karte, index) => {
          return (
            // EINE KARTE
            <figure
              key={index}
              style={{
                backgroundColor: karte.color,
              }}
              className="card"
              onClick={() => {
                // Wenn Karte geklickt wurde:
                console.log("Karte wurde geklickt!");
                setPunkte(punkte + 1);
              }}
            >
              {karte.label}
            </figure>
          );
        })}
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

// Array: Alle Karten
const cards = [
  // Einzelnes Objekt beschreibt eine Karte
  { id: 1, color: "#f3722c", label: "Orange", display: true },
  { id: 2, color: "#f3722c", label: "Orange", display: true },
  { id: 3, color: "#f8961e", label: "Peach", display: false },
  { id: 4, color: "#f8961e", label: "Peach", display: true },
  { id: 5, color: "#f9c74f", label: "Banana", display: true },
  { id: 6, color: "#f9c74f", label: "Banana", display: true },
  { id: 7, color: "#90be6d", label: "Grape", display: true },
  { id: 8, color: "#90be6d", label: "Grape", display: true },
  { id: 9, color: "#43aa8b", label: "Kiwi", display: true },
  { id: 10, color: "#43aa8b", label: "Kiwi", display: false },
  { id: 11, color: "#577590", label: "Plum", display: true },
  { id: 12, color: "#577590", label: "Plum", display: true },
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
  // useState = benutze React "Status" / "Zustand"
  // Beobachte Punkte
  const [punkte, setPunkte] = useState(0);
  const [nachricht, setNachricht] = useState("");
  const [spielfeld, setSpielfeld] = useState([]);
  const [aktuelleKarte, setAktuelleKarte] = useState(null);

  // Wird beim ersten Laden der Seite ausgeführt und danach nie wieder
  useEffect(() => {
    // irgendwas machen?
    // Spielfeld erzeugen: spielfeld State erzeugen, aus cards-Array
    const gemischteKarten = shuffle(cards);
    setSpielfeld(gemischteKarten);
  }, []);

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

  useEffect(() => {
    if (aktuelleKarte !== null) {
      // Spielfeld ändern: setSpielfeld(???)
      // 1.) Rausbekommen welcher Index vom cards-Array zur id passt.
      const geänderteKarte = spielfeld.filter((karte, index) => {
        if (karte.id === aktuelleKarte) {
          console.log(index);
          return true;
        } else {
          return false;
        }
      });
      geänderteKarte[0].display = true;
      setSpielfeld([...spielfeld], geänderteKarte[0]);

      // mit setSpielfeld das Array an genau der Stelle (Index)
      //
      // setSpielfeld(???);
    }
    // Karte auf die ich geklickt habe (aktuellKarte) -> open: true -> open: false
  }, [aktuelleKarte]);

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
        <p>
          <strong>Geklickte Karte (id):</strong> {aktuelleKarte}
        </p>
        <p>
          <strong>Spielfeld:</strong> {JSON.stringify(spielfeld)}
        </p>
      </aside>

      <main>
        {spielfeld.map((karte, index) => {
          return (
            <>
              {karte.display ? (
                // VORDER-ANSICHT
                <figure
                  key={index}
                  style={{
                    backgroundColor: karte.color,
                  }}
                  className="karte"
                  onClick={() => {
                    // Wenn Karte geklickt wurde:
                    // console.log("Karte wurde geklickt!");
                    setPunkte(punkte + 1);
                    setAktuelleKarte(karte.id);
                    // irgendwas mit id merken
                  }}
                >
                  {karte.label}
                  {/* <br />
                  <span style={{ fontFamily: "Arial" }}>{karte.id}</span> */}
                </figure>
              ) : (
                // RÜCK-ANSICHT
                <figure
                  key={index}
                  className="verdeckte karte"
                  onClick={() => {
                    // Wenn Karte geklickt wurde:
                    // console.log("Karte wurde geklickt!");
                    setPunkte(punkte + 1);
                    setAktuelleKarte(karte.id);
                  }}
                >
                  MEMORY GAME
                </figure>
              )}
            </>
          );
        })}
      </main>
    </div>
  );
}

export default App;

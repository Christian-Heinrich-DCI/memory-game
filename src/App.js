import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const cards = [
  { color: "#f3722c", label: "Orange", display: false, found: false },
  { color: "#f3722c", label: "Orange", display: false, found: false },
  { color: "#f8961e", label: "Peach", display: false, found: false },
  { color: "#f8961e", label: "Peach", display: false, found: false },
  { color: "#f9c74f", label: "Banana", display: false, found: false },
  { color: "#f9c74f", label: "Banana", display: false, found: false },
  { color: "#90be6d", label: "Grape", display: false, found: false },
  { color: "#90be6d", label: "Grape", display: false, found: false },
  { color: "#43aa8b", label: "Kiwi", display: false, found: false },
  { color: "#43aa8b", label: "Kiwi", display: false, found: false },
  { color: "#577590", label: "Plum", display: false, found: false },
  { color: "#577590", label: "Plum", display: false, found: false },
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
  const [punkte, setPunkte] = useState(0);
  const [spielfeld, setSpielfeld] = useState([]);
  const [aktuelleKarteIndex, setAktuelleKarteIndex] = useState(null);
  const [paar, setPaar] = useState([]);
  const [gewonnen, setGewonnen] = useState(false);

  function kartenUmdrehen() {
    const neuesSpielfeld = [...spielfeld];
    neuesSpielfeld.forEach((karte) => {
      // Wenn die Karte noch nicht gefunden wurde, dann drehe sie um
      if (karte.found !== true) karte.display = false;
    });
    return neuesSpielfeld;
  }

  function checkForWin() {
    spielfeld.forEach((karte) => {
      if (karte.found === false) {
        return false;
      }
    });
    return true;
  }

  // Erzeuge Spielfeld beim ersten Start der Webseite
  useEffect(() => {
    const gemischteKarten = shuffle(cards);
    setSpielfeld(gemischteKarten);
  }, []);

  // Wenn auf eine Karte geklickt wurde, wechsle die Anzeige
  // zur Vorderansicht (quasi "Drehe die Karte um")
  useEffect(() => {
    /* NEUER ANSATZ: */
    if (aktuelleKarteIndex !== null) {
      setPaar([...paar, aktuelleKarteIndex]);
      if (paar.length < 2) {
        const neuesSpielfeld = [...spielfeld];
        neuesSpielfeld[aktuelleKarteIndex].display = true;
        setSpielfeld(neuesSpielfeld);
      } else if (paar.length === 2) {
        const karte1 = spielfeld[paar[0]];
        const karte2 = spielfeld[paar[1]];
        if (karte1.label === karte2.label) {
          const neuesSpielfeld = [...spielfeld];
          neuesSpielfeld[paar[0]].found = true;
          neuesSpielfeld[paar[1]].found = true;
          setSpielfeld(neuesSpielfeld);
          if (checkForWin() === true) setGewonnen(true);
        } else {
          const neuesSpielfeld = kartenUmdrehen();
          setSpielfeld(neuesSpielfeld);
        }

        setPaar([]);
        setAktuelleKarteIndex(null);
      }
    }
    // eslint-disable-next-line
  }, [aktuelleKarteIndex]);

  useEffect(() => {
    if (gewonnen === true) {
      // Falls gewonnen
      console.log("GEWONNEN!");
    }
  }, [gewonnen]);

  return (
    <div className="App">
      <aside>
        <h1>MEMORY GAME</h1>
        <p>
          <strong>(Aus)gewählte Karten:</strong> {JSON.stringify(paar)}
        </p>
        <p>
          <strong>Spielfeld:</strong> {JSON.stringify(spielfeld)}
        </p>
      </aside>

      <main>
        {spielfeld.map((karte, index) => {
          return (
            <motion.figure
              key={index}
              // ANIMATIONS
              // https://www.npmjs.com/package/framer-motion
              animate={{}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 90 }}
              key={index}
              style={{
                backgroundColor: karte.display ? karte.color : "",
              }}
              className={karte.display ? "karte" : "verdeckte karte"}
              onClick={() => {
                setPunkte(punkte + 1);
                setAktuelleKarteIndex(index);
              }}
            >
              {karte.display ? karte.label : "MEMORY GAME"}
              {/* <br />
                  <span style={{ fontFamily: "Arial" }}>{karte.id}</span> */}
            </motion.figure>
          );
        })}
      </main>
    </div>
  );
}

export default App;

# Memory Game

## Voraussetzungen

- es gibt 6 unterschiedliche Karten

  - Eigenschaften:
    - Vorderseite: Beschriftung (Frucht), Hintergrundfarbe
    - Rückseite: Beschriftung, Hintergrundfarbe
    - Zustand: Aufgedeckt oder nicht
    - Match / Passendes Paar gefunden

- Spielfeld: 12 Felder -> 4x3

- Punkte: zählt hoch, wenn eine Karte geklickt wird
- STATE NAME: punkte
- Sonderfälle: Punkt nicht zählen, wenn ?!?

STATE: Spielfeld (was ist bereits fertig aufgedeckt)
NAME: spielfeld

## Design

Zwei Bereiche:

- Spielfeld
- Info-Bereich (Punkte, Buttons -> Spiel neustarten???)
- CSS GRID: 1:3 / 1:4

- Karte: quadratisch, runde Ecken, ... siehe Bild ... 200x200 ... 300x300 px ?

## Spiellogik

### Anfang

- 1x am Anfang Karten mischen
- alles zugedeckt anzeigen

### Spiel

- man klickt eine Karte -> Karte "umdrehen", Punktestand +1
- wenn zweite Karte umgedreht -> beide vergleichen
  - wenn gleich: bleiben umdreht, sind gefunden!
  - wenn unterschiedlich: wieder umdrehen

### Ende

- geht solange bis alle (Paare) aufgedeckt sind

### **JS**

- Welche Karte habe ich angeklickt?
- Ist das die 1. oder 2. Karte?
- 2. -> Was war die 1. ?
- Vergleich
- Gleich: merken
- Nicht gleich: Ausgangszustand herstellen

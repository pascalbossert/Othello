# Zustandsbasierter Test für Board.play

Die Methode `Board.play(row, col, player)` wendet einen Spielzug auf das Brett an. Das Verhalten hängt sowohl von den Eingabeparametern als auch vom aktuellen Zustand des Spiels ab.

## Testfall 1: Negativtest - Unerlaubter Spielzug

### Vorbedingung (Precondition)
- Ein Spielbrett im Initialzustand existiert
- Das Brett hat die Standard-Startposition:
  - Position [3,3] = Spieler 2
  - Position [3,4] = Spieler 1
  - Position [4,3] = Spieler 1
  - Position [4,4] = Spieler 2
  - Alle anderen Felder sind leer
- Es gibt gültige Züge für Spieler 1 an den Positionen: [2,3], [3,2], [4,5], [5,4]

### Ereignis (Event)
- Spieler 1 versucht einen Stein an Position [0,0] zu setzen
- Methodenaufruf: `board.play(0, 0, 1)`

### Sollreaktion (Expected Reaction)
- Die Methode wirft eine `RangeError` Exception
- Fehlermeldung: "move [0/0] is not valid for player 1"
- Das ist der erwartete Fehler, da Position [0,0] leer ist, aber keine gegnerischen Steine umgedreht werden können

### Nachbedingung (Postcondition)
- Das Spielbrett bleibt unverändert
- Keine Steine wurden gesetzt oder umgedreht
- Der Zustand des Bretts ist identisch mit der Vorbedingung

---

## Testfall 2: Positivtest - Erlaubter Spielzug

### Vorbedingung (Precondition)
- Ein Spielbrett im Initialzustand existiert
- Das Brett hat die Standard-Startposition:
  - Position [3,3] = Spieler 2 (Wert: 2)
  - Position [3,4] = Spieler 1 (Wert: 1)
  - Position [4,3] = Spieler 1 (Wert: 1)
  - Position [4,4] = Spieler 2 (Wert: 2)
  - Alle anderen Felder sind leer (Wert: 0)
- Spieler 1 hat insgesamt 2 Steine auf dem Brett
- Spieler 2 hat insgesamt 2 Steine auf dem Brett
- Position [2,3] ist leer und ein gültiger Zug für Spieler 1

### Ereignis (Event)
- Spieler 1 setzt einen Stein an Position [2,3]
- Methodenaufruf: `board.play(2, 3, 1)`

### Sollreaktion (Expected Reaction)
- Die Methode gibt ein neues Board-Objekt zurück (das Original bleibt unverändert)
- Der Stein von Spieler 1 wird an Position [2,3] platziert
- Der gegnerische Stein an Position [3,3] wird umgedreht (von Spieler 2 zu Spieler 1)
- Dies erfolgt, weil zwischen dem neuen Stein [2,3] und dem eigenen Stein [4,3] der gegnerische Stein [3,3] liegt

### Nachbedingung (Postcondition)
Neues Brett (Rückgabewert):
- Position [2,3] = Spieler 1 (neu gesetzt)
- Position [3,3] = Spieler 1 (umgedreht von Spieler 2)
- Position [3,4] = Spieler 1 (unverändert)
- Position [4,3] = Spieler 1 (unverändert)
- Position [4,4] = Spieler 2 (unverändert)
- Spieler 1 hat nun 4 Steine auf dem Brett
- Spieler 2 hat nun 1 Stein auf dem Brett

Ursprüngliches Brett:
- Bleibt komplett unverändert (Immutabilität)
- Spieler 1 hat weiterhin 2 Steine
- Spieler 2 hat weiterhin 2 Steine

---

## Zusammenfassung

Diese beiden zustandsbasierten Testfälle demonstrieren:

1. **Negativtest**: Wie das System auf einen ungültigen Spielzug reagiert (Exception werfen, Zustand unverändert)
2. **Positivtest**: Wie das System einen gültigen Spielzug korrekt verarbeitet (neues Brett zurückgeben, Steine setzen und umdrehen, Original unverändert lassen)

Die Tests zeigen die zustandsabhängige Natur der `play`-Methode, da dasselbe Methodenaufruf-Schema zu völlig unterschiedlichen Ergebnissen führt, abhängig davon, ob der Zug im aktuellen Spielzustand gültig ist oder nicht.

# Entscheidungstabellentest für Board.result

## Relevante Bedingungen

Die Methode `Board.result()` gibt das Spielergebnis zurück. Die relevanten Bedingungen sind:

1. **Spiel beendet** (finished): Sind alle Felder belegt? (emptyFields.length == 0)
2. **Gleich viele Steine** (equal): Haben beide Spieler gleich viele Steine? (playerOneFields.length == playerTwoFields.length)
3. **Spieler 1 hat mehr** (p1More): Hat Spieler 1 mehr Steine? (playerOneFields.length > playerTwoFields.length)

## Entscheidungstabelle

| | Regel 1 | Regel 2 | Regel 3 | Regel 4 | Regel 5 | Regel 6 | Regel 7 | Regel 8 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **BEDINGUNGEN** | | | | | | | | |
| Spiel beendet | J | J | J | J | N | N | N | N |
| Gleich viele Steine | J | J | N | N | J | J | N | N |
| Spieler 1 hat mehr | - | - | J | N | - | - | J | N |
| **AKTIONEN/ERGEBNISSE** | | | | | | | | |
| finished = true | X | X | X | X | | | | |
| finished = false | | | | | X | X | X | X |
| tied = true | X | X | | | | | | |
| tied = false | | | X | X | X | X | X | X |
| winner = 0 | X | X | | | X | X | X | X |
| winner = 1 | | | X | | | | | |
| winner = 2 | | | | X | | | | |

### Legende
- **J** = Ja / Wahr
- **N** = Nein / Falsch
- **-** = Irrelevant (Don't Care)
- **X** = Aktion wird ausgeführt / Ergebnis tritt ein

## Vereinfachte Entscheidungstabelle (Redundanzen entfernt)

Da Regel 1 und 2 identisch sind, sowie Regeln 5, 6, 7, 8 zum gleichen Ergebnis führen, können wir die Tabelle vereinfachen:

| | Regel 1 | Regel 2 | Regel 3 | Regel 4 |
|---|:---:|:---:|:---:|:---:|
| **BEDINGUNGEN** | | | | |
| Spiel beendet | J | J | J | N |
| Gleich viele Steine | J | N | N | - |
| Spieler 1 hat mehr | - | J | N | - |
| **AKTIONEN/ERGEBNISSE** | | | | |
| finished = true | X | X | X | |
| finished = false | | | | X |
| tied = true | X | | | |
| tied = false | | X | X | X |
| winner = 0 | X | | | X |
| winner = 1 | | X | | |
| winner = 2 | | | X | |

## Beschreibung der Regeln

### Regel 1: Spiel beendet - Unentschieden
- **Bedingungen**: Spiel beendet, beide Spieler haben gleich viele Steine
- **Ergebnisse**: finished=true, tied=true, winner=0

### Regel 2: Spiel beendet - Spieler 1 gewinnt
- **Bedingungen**: Spiel beendet, Spieler 1 hat mehr Steine als Spieler 2
- **Ergebnisse**: finished=true, tied=false, winner=1

### Regel 3: Spiel beendet - Spieler 2 gewinnt
- **Bedingungen**: Spiel beendet, Spieler 2 hat mehr Steine als Spieler 1
- **Ergebnisse**: finished=true, tied=false, winner=2

### Regel 4: Spiel noch nicht beendet
- **Bedingungen**: Es gibt noch leere Felder
- **Ergebnisse**: finished=false, tied=false, winner=0
- **Anmerkung**: Die Steinverteilung ist irrelevant, solange das Spiel nicht beendet ist

## Testfall-Ableitungen

Aus der Entscheidungstabelle können folgende Testfälle abgeleitet werden:

| Testfall | Regel | Leere Felder | Spieler 1 Steine | Spieler 2 Steine | Erwartete Werte |
|----------|-------|--------------|------------------|------------------|-----------------|
| TC1 | 1 | 0 | 32 | 32 | finished=true, tied=true, winner=0 |
| TC2 | 2 | 0 | 40 | 24 | finished=true, tied=false, winner=1 |
| TC3 | 3 | 0 | 24 | 40 | finished=true, tied=false, winner=2 |
| TC4 | 4 | 60 | 2 | 2 | finished=false, tied=false, winner=0 |

Alle diese Testfälle wurden bereits in `board_test.js` implementiert.

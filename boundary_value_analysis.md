# Grenzwertanalyse für Board.result - tied Feld

## Analyse des tied-Feldes

Das Feld `tied` in der Rückgabe von `Board.result()` gibt an, ob das Spiel unentschieden geendet hat.

### Bedingungen für tied = true
- Das Spiel muss beendet sein (keine leeren Felder mehr)
- Beide Spieler müssen gleich viele Steine haben (playerOne === playerTwo)

### Grenzwerte

Die Grenzwertanalyse für das `tied`-Feld basiert auf dem Vergleich der Steinanzahl beider Spieler:

| Bedingung | Spieler 1 Steine | Spieler 2 Steine | Spielzustand | tied | winner |
|-----------|------------------|------------------|--------------|------|--------|
| Spieler 1 gewinnt | 33 | 31 | Beendet | false | 1 |
| Grenzwert (P1 > P2) | 32 + 1 | 32 - 1 | Beendet | false | 1 |
| **Unentschieden** | **32** | **32** | **Beendet** | **true** | **0** |
| Grenzwert (P2 > P1) | 32 - 1 | 32 + 1 | Beendet | false | 2 |
| Spieler 2 gewinnt | 24 | 40 | Beendet | false | 2 |

### Angrenzende Äquivalenzklassen

1. **Spiel noch nicht zu Ende**
   - Es gibt noch leere Felder
   - tied = false, finished = false, winner = 0

2. **Spiel beendet - Spieler 1 gewinnt**
   - Keine leeren Felder mehr
   - Spieler 1 hat mehr Steine als Spieler 2
   - tied = false, finished = true, winner = 1

3. **Spiel beendet - Unentschieden (Positivtest)**
   - Keine leeren Felder mehr
   - Beide Spieler haben gleich viele Steine
   - tied = true, finished = true, winner = 0

4. **Spiel beendet - Spieler 2 gewinnt**
   - Keine leeren Felder mehr
   - Spieler 2 hat mehr Steine als Spieler 1
   - tied = false, finished = true, winner = 2

## Implementierte Testfälle

Alle vier Testfälle wurden in `board_test.js` implementiert:

1. **result: game not finished yet** - Spiel noch nicht zu Ende
2. **result: player 1 wins** - Spieler 1 gewinnt (40 vs 24 Steine)
3. **result: game tied with equal stones** - Unentschieden (32 vs 32 Steine)
4. **result: player 2 wins** - Spieler 2 gewinnt (24 vs 40 Steine)

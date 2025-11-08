# Äquivalenzklassenbildung für isValidMove(player, row, col)

## 1. Definitionsbereich

### Player (Spieler)
- **Gültiger Bereich**: 1 oder 2
- **Ungültiger Bereich**: Alle anderen Werte (z.B. 0, 3, -1, null, undefined, String, etc.)

### Row (Zeile)
- **Gültiger Bereich**: 0 bis 7 (Integer)
- **Ungültiger Bereich**:
  - Kleiner als 0 (z.B. -1)
  - Größer als 7 (z.B. 8, 9)
  - Nicht-Integer (z.B. 3.5, "2", null)

### Col (Spalte)
- **Gültiger Bereich**: 0 bis 7 (Integer)
- **Ungültiger Bereich**:
  - Kleiner als 0 (z.B. -1)
  - Größer als 7 (z.B. 8, 9)
  - Nicht-Integer (z.B. 3.5, "2", null)

## 2. Äquivalenzklassen

### Player
1. **Gültige Klassen**:
   - EK1: player = 1 (Spieler 1)
   - EK2: player = 2 (Spieler 2)

2. **Ungültige Klassen**:
   - EK3: player = 0 (ungültiger Wert)
   - EK4: player = 3 oder höher (ungültiger Wert)
   - EK5: player ist kein Number (String, null, undefined, etc.)

### Row
1. **Gültige Klassen**:
   - EK6: row im Bereich [0, 7] (gültige Zeile)

2. **Ungültige Klassen**:
   - EK7: row < 0 (außerhalb des Spielfelds)
   - EK8: row > 7 (außerhalb des Spielfelds)
   - EK9: row ist kein Integer (Float, String, etc.)

### Col
1. **Gültige Klassen**:
   - EK10: col im Bereich [0, 7] (gültige Spalte)

2. **Ungültige Klassen**:
   - EK11: col < 0 (außerhalb des Spielfelds)
   - EK12: col > 7 (außerhalb des Spielfelds)
   - EK13: col ist kein Integer (Float, String, etc.)

### Spielzustand
1. **Gültige Klassen**:
   - EK14: Position ist leer und Zug ist nach Spielregeln gültig (kann gegnerische Steine umdrehen)

2. **Ungültige Klassen**:
   - EK15: Position ist bereits besetzt
   - EK16: Position ist leer, aber Zug ist ungültig (kann keine Steine umdrehen)

## 3. Konkrete Testfälle

### Gültige Testfälle (Positive Tests)

| Test-ID | Player | Row | Col | Spielzustand | Erwartetes Ergebnis | Anmerkung |
|---------|--------|-----|-----|--------------|---------------------|-----------|
| T1 | 1 | 2 | 3 | Initial | true | Spieler 1, gültiger Zug am Anfang |
| T2 | 2 | 2 | 2 | Initial | true | Spieler 2, gültiger Zug am Anfang |

### Ungültige Testfälle (Negative Tests)

#### Ungültiger Player
| Test-ID | Player | Row | Col | Spielzustand | Erwartetes Ergebnis | Äquivalenzklasse |
|---------|--------|-----|-----|--------------|---------------------|------------------|
| T3 | 0 | 3 | 3 | Initial | false/Error | EK3 |
| T4 | 3 | 3 | 3 | Initial | false/Error | EK4 |

#### Ungültige Koordinaten
| Test-ID | Player | Row | Col | Spielzustand | Erwartetes Ergebnis | Äquivalenzklasse |
|---------|--------|-----|-----|--------------|---------------------|------------------|
| T5 | 1 | -1 | 3 | Initial | false | EK7 |
| T6 | 1 | 8 | 3 | Initial | false | EK8 |
| T7 | 1 | 3 | -1 | Initial | false | EK11 |
| T8 | 1 | 3 | 8 | Initial | false | EK12 |

#### Ungültiger Spielzustand
| Test-ID | Player | Row | Col | Spielzustand | Erwartetes Ergebnis | Äquivalenzklasse |
|---------|--------|-----|-----|--------------|---------------------|------------------|
| T9 | 1 | 3 | 3 | Initial | false | EK15 (Position bereits besetzt) |
| T10 | 1 | 0 | 0 | Initial | false | EK16 (Position leer, aber ungültiger Zug) |

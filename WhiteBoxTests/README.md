# Whitebox-Testverfahren - Zusammenfassung

## Aufgabe 1: Fibonacci

### Datei: `fibonacci.js`, `fibonacci_test.js`

**Initiale Coverage:**
- Branch: 50.0%
- Line: 83.3%

**Nach Erweiterung:**
- Branch: **100.0%**
- Line: **100.0%**

**Hinzugefügte Tests:**
1. Rekursiver Fall (n > 1)
2. Negative Zahl (n < 0)
3. Nicht-numerische Eingaben (String, null, undefined)

**Erkenntnisse:**
- If-Verzweigungen ohne else-Zweig müssen explizit getestet werden
- Impliziter `undefined` Return-Wert benötigt Tests
- Alle Zweige der Bedingungen (typeof, >=) müssen abgedeckt werden

**Test ausführen:**
```bash
cd WhiteBoxTests
deno test --coverage=cover_profile fibonacci_test.js
deno coverage cover_profile
```

---

## Aufgabe 2: Quadratische Gleichungen

### Datei: `quadratic_equation.ts`, `quadratic_equation_test.ts`

**Coverage:**
- Branch: **100.0%**
- Line: **100.0%**

**Testfälle (3 Stück):**
1. d > 0: Zwei Lösungen (x² - 5x + 6 = 0)
2. d == 0: Eine Lösung (x² - 4x + 4 = 0)
3. d < 0: Keine Lösung (x² + x + 1 = 0)

**Erkenntnisse:**
- Die drei mathematischen Fälle entsprechen exakt den Code-Zweigen
- Vollständige Coverage mit minimaler Anzahl von Tests
- TypeScript vereinfacht Tests durch Typ-Sicherheit

**Test ausführen:**
```bash
cd WhiteBoxTests
deno test --coverage=cover_profile_quad quadratic_equation_test.ts
deno coverage cover_profile_quad
```

---

## Aufgabe 3: JavaScript vs TypeScript

### Datei: `zusatzfrage_js_vs_ts.md`

**Hauptunterschiede:**

| Aspekt | JavaScript | TypeScript |
|--------|------------|-----------|
| Testfallanzahl | 7 Tests | 3 Tests |
| Typ-Validierung | Runtime (manuell) | Compile-Zeit (automatisch) |
| Edge Cases | Viele (String, null, etc.) | Wenige (nur Logik) |
| Code-Komplexität | Höher (defensive Programmierung) | Niedriger (Typ-System hilft) |

**Fazit:**
TypeScript reduziert die Anzahl notwendiger Tests signifikant, da Typ-Fehler zur Compile-Zeit erkannt werden.

---

## Aufgabe 4: Othello

### Dateien:
- `board.js` (von BlackBoxTests kopiert)
- `board_test.js` (BlackBox-Tests)
- `board_whitebox_test.js` (neue Whitebox-Tests)

### Coverage-Entwicklung:

**BlackBox-Tests allein:**
- Branch: 87.0%
- Line: 68.9%

**Whitebox-Tests allein:**
- Branch: 91.2%
- Line: 85.7%

**Kombiniert (BlackBox + Whitebox):**
- Branch: **100.0%**
- Line: **100.0%**

### Hinzugefügte Whitebox-Tests:

#### Board.of() Error Handling (3 Tests):
- Falsche Anzahl Zeilen
- Falsche Anzahl Spalten
- Ungültiger Feldwert

#### validMoves() (3 Tests):
- Fehler bei ungültigem Spieler
- Gültige Züge für Spieler 1
- Gültige Züge für Spieler 2

#### play() (6 Tests):
- Fehler: ungültiger Spieler
- Fehler: nicht-numerische Eingabe
- Fehler: außerhalb des Spielfelds
- Fehler: ungültiger Zug
- Erfolgreicher Zug
- Steine umdrehen

#### opponent() (3 Tests):
- Spieler 1 → Spieler 2
- Spieler 2 → Spieler 1
- Fehler bei ungültigem Spieler

#### copy() (1 Test):
- Unabhängige Kopie

#### isValidMove() Edge Cases (2 Tests):
- Nicht-numerische Row
- Nicht-numerische Col

#### adjacentOf() (1 Test):
- Felder am Spielfeldrand

**Tests ausführen:**
```bash
cd WhiteBoxTests

# Nur BlackBox-Tests
deno test --coverage=cover_profile_othello board_test.js

# Nur Whitebox-Tests
deno test --coverage=cover_profile_othello_whitebox board_whitebox_test.js

# Alle Tests kombiniert (empfohlen)
deno test --coverage=cover_profile_combined board_test.js board_whitebox_test.js
deno coverage cover_profile_combined

# HTML-Bericht generieren
deno coverage --html cover_profile_combined/
```

---

## Zusammenfassung

Alle Aufgaben wurden erfolgreich abgeschlossen:

✅ **Fibonacci**: 100% Coverage durch 7 Tests
✅ **Quadratische Gleichung**: 100% Coverage durch 3 Tests
✅ **JS vs TS Analyse**: Dokumentiert in `zusatzfrage_js_vs_ts.md`
✅ **Othello**: 100% Coverage durch Kombination von BlackBox (15 Tests) + Whitebox (19 Tests) = 34 Tests

### Wichtigste Erkenntnisse:

1. **Whitebox-Testing** ermöglicht gezielte Erhöhung der Coverage
2. **If-Verzweigungen ohne else** benötigen explizite Tests für den false-Zweig
3. **TypeScript** reduziert Testaufwand durch Typ-Sicherheit
4. **Kombination** von BlackBox- und Whitebox-Tests führt zu optimaler Coverage
5. **Error-Handling** und Edge Cases sind oft die ungetesteten Code-Pfade

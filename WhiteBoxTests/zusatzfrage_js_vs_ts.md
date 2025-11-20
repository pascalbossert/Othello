# Zusatzfrage: JavaScript vs TypeScript - Einfluss auf Tests

## Vergleich der beiden Implementierungen

### Fibonacci (JavaScript)
```javascript
export function fibonacci(n) {
  if (typeof n == "number" && n >= 0) {
    // ...
  }
}
```

### Quadratische Gleichung (TypeScript)
```typescript
export function solve(a: number, b: number, c: number): Array<number> {
  // ...
}
```

## Einfluss auf Testfallermittlung

### 1. **Testfallermittlung**
- **JavaScript**: Erfordert explizite Tests für ungültige Eingabetypen
  - Wir mussten Tests für Strings, null, undefined hinzufügen
  - Typ-Checks müssen im Code implementiert werden (`typeof n == "number"`)
  - Mehr Edge Cases müssen berücksichtigt werden

- **TypeScript**: Typprüfung erfolgt zur Compile-Zeit
  - Ungültige Typen werden bereits vom Compiler abgelehnt
  - Konzentration auf logische Testfälle (d > 0, d == 0, d < 0)
  - Weniger Edge Cases nötig, da Typ-Sicherheit gewährleistet ist

### 2. **Testumsetzung**
- **JavaScript**: 7 Tests für Fibonacci nötig
  - 2 Tests für Basisfälle (0, 1)
  - 1 Test für Rekursion
  - 4 Tests für ungültige Eingaben (negativ, String, null, undefined)

- **TypeScript**: 3 Tests für quadratische Gleichung
  - Nur die mathematischen Fälle (d > 0, d == 0, d < 0)
  - Typ-Fehler können gar nicht auftreten

### 3. **Codeüberdeckung**
- **JavaScript**:
  - Mehr Code-Zeilen durch Typ-Validierung
  - Typ-Checks müssen getestet werden
  - Höhere Komplexität in der Testabdeckung

- **TypeScript**:
  - Fokus auf Business-Logik
  - Einfachere Coverage, da Typ-System hilft
  - Weniger defensive Programmierung nötig

## Fazit

**TypeScript reduziert die Anzahl notwendiger Tests signifikant**, da:
1. Typ-Fehler zur Compile-Zeit erkannt werden
2. Keine Runtime-Typ-Validierung getestet werden muss
3. Der Fokus auf logischen Testfällen liegt
4. Weniger defensive Programmierung nötig ist

**JavaScript erfordert mehr Tests**, da:
1. Typ-Sicherheit zur Laufzeit selbst implementiert werden muss
2. Alle möglichen Eingabetypen getestet werden sollten
3. Mehr Edge Cases berücksichtigt werden müssen

**Beide erreichen 100% Coverage**, aber mit unterschiedlichem Aufwand:
- Fibonacci (JS): 7 Tests
- Quadratic (TS): 3 Tests

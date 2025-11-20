import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

Deno.test("test initial count", () => {
  // Arrange
  const board = new Board();

  // Act
  const playerOneFields = board.fieldsWithState(1);
  const playerTwoFields = board.fieldsWithState(2);
  const emptyFields = board.fieldsWithState(0);

  // Assert
  expect(playerOneFields.length).toBe(2);
  expect(playerTwoFields.length).toBe(2);
  expect(emptyFields.length).toBe(8 * 8 - 2 * 2);
});

// Äquivalenzklassenbildung: isValidMove Tests

// T1: Gültiger Zug für Spieler 1
Deno.test("isValidMove: valid move for player 1 at initial state", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 2, 3);

  // Assert
  expect(result).toBe(true);
});

// T2: Gültiger Zug für Spieler 2
Deno.test("isValidMove: valid move for player 2 at initial state", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(2, 2, 4);

  // Assert
  expect(result).toBe(true);
});

// T3: Ungültiger Spieler (0)
Deno.test("isValidMove: invalid player 0", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(0, 3, 3);

  // Assert
  expect(result).toBe(false);
});

// T4: Ungültiger Spieler (3)
Deno.test("isValidMove: invalid player 3", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(3, 3, 3);

  // Assert
  expect(result).toBe(false);
});

// T5: Ungültige Zeile (row < 0)
Deno.test("isValidMove: row out of bounds (negative)", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, -1, 3);

  // Assert
  expect(result).toBe(false);
});

// T6: Ungültige Zeile (row >= 8)
Deno.test("isValidMove: row out of bounds (too large)", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 8, 3);

  // Assert
  expect(result).toBe(false);
});

// T7: Ungültige Spalte (col < 0)
Deno.test("isValidMove: col out of bounds (negative)", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 3, -1);

  // Assert
  expect(result).toBe(false);
});

// T8: Ungültige Spalte (col >= 8)
Deno.test("isValidMove: col out of bounds (too large)", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 3, 8);

  // Assert
  expect(result).toBe(false);
});

// T9: Position bereits besetzt
Deno.test("isValidMove: position already occupied", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 3, 3);

  // Assert
  expect(result).toBe(false);
});

// T10: Position leer, aber ungültiger Zug (kann keine Steine umdrehen)
Deno.test("isValidMove: position empty but invalid move", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 0, 0);

  // Assert
  expect(result).toBe(false);
});

// Grenzwertanalyse: Board.result Tests
// Diese Tests decken AUCH die Entscheidungstabelle ab (siehe decision_table_testing.md)

// Positivtest: Spiel unentschieden (tied = true)
// Grenzwert: playerOne === playerTwo (32 == 32)
// Entscheidungstabelle Regel 1: finished=true, equal=true → tied=true, winner=0
Deno.test("result: game tied with equal stones", () => {
  // Arrange
  const fields = [
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
  ];
  const board = Board.of(fields);

  // Act
  const result = board.result();

  // Assert
  expect(result.finished).toBe(true);
  expect(result.tied).toBe(true);
  expect(result.winner).toBe(0);
  expect(result.playerOne).toBe(32);
  expect(result.playerTwo).toBe(32);
});

// Negativtest 1: Spiel noch nicht zu Ende (tied = false, finished = false)
// Entscheidungstabelle Regel 4: finished=false → tied=false, winner=0
Deno.test("result: game not finished yet", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.result();

  // Assert
  expect(result.finished).toBe(false);
  expect(result.tied).toBe(false);
  expect(result.winner).toBe(0);
});

// Negativtest 2: Spieler 1 gewinnt (tied = false, winner = 1)
// Grenzwert: playerOne > playerTwo (40 > 24)
// Entscheidungstabelle Regel 2: finished=true, p1More=true → tied=false, winner=1
Deno.test("result: player 1 wins", () => {
  // Arrange
  const fields = [
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2, 2],
  ];
  const board = Board.of(fields);

  // Act
  const result = board.result();

  // Assert
  expect(result.finished).toBe(true);
  expect(result.tied).toBe(false);
  expect(result.winner).toBe(1);
  expect(result.playerOne).toBe(40);
  expect(result.playerTwo).toBe(24);
});

// Negativtest 3: Spieler 2 gewinnt (tied = false, winner = 2)
// Grenzwert: playerTwo > playerOne (40 > 24)
// Entscheidungstabelle Regel 3: finished=true, p1More=false, equal=false → tied=false, winner=2
Deno.test("result: player 2 wins", () => {
  // Arrange
  const fields = [
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 1, 1],
  ];
  const board = Board.of(fields);

  // Act
  const result = board.result();

  // Assert
  expect(result.finished).toBe(true);
  expect(result.tied).toBe(false);
  expect(result.winner).toBe(2);
  expect(result.playerOne).toBe(24);
  expect(result.playerTwo).toBe(40);
});

// Zustandsbasierte Tests für Board.play
// NICHT IMPLEMENTIERT (wie in der Aufgabe gefordert)
// Siehe state_based_testing.md für die Definition der Testfälle:
//
// Testfall 1 (Negativtest): Unerlaubter Spielzug
//   Vorbedingung: Board im Initialzustand
//   Ereignis: board.play(0, 0, 1)
//   Sollreaktion: RangeError "move [0/0] is not valid for player 1"
//   Nachbedingung: Board unverändert
//
// Testfall 2 (Positivtest): Erlaubter Spielzug
//   Vorbedingung: Board im Initialzustand, Spieler 1 hat 2 Steine
//   Ereignis: board.play(2, 3, 1)
//   Sollreaktion: Neues Board mit Stein an [2,3], Stein [3,3] umgedreht
//   Nachbedingung: Neues Board hat 4 Steine für Spieler 1, Original unverändert

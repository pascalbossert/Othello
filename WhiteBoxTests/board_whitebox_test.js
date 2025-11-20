import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

// ====================
// WHITEBOX TESTS
// Ziel: Erhöhung der Code-Überdeckung durch gezielte Tests
// für noch nicht abgedeckte Code-Pfade
// ====================

// ===== Tests für Board.of() Error Handling =====

Deno.test("Board.of: throws error for wrong number of rows", () => {
  // Arrange
  const fields = [
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
  ]; // nur 2 statt 8 Zeilen

  // Act & Assert
  expect(() => Board.of(fields)).toThrow(RangeError);
  expect(() => Board.of(fields)).toThrow("fields requires 8 rows");
});

Deno.test("Board.of: throws error for wrong number of cols", () => {
  // Arrange
  const fields = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]; // nur 3 statt 8 Spalten

  // Act & Assert
  expect(() => Board.of(fields)).toThrow(RangeError);
  expect(() => Board.of(fields)).toThrow("row requires 8 cols");
});

Deno.test("Board.of: throws error for illegal field value", () => {
  // Arrange
  const fields = [
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 3, 2, 2, 2, 2], // 3 ist ungültig
  ];

  // Act & Assert
  expect(() => Board.of(fields)).toThrow(RangeError);
  expect(() => Board.of(fields)).toThrow("illegal value 3");
});

// ===== Tests für validMoves() =====

Deno.test("validMoves: throws error for illegal player", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.validMoves(0)).toThrow(RangeError);
  expect(() => board.validMoves(0)).toThrow("illegal player 0");
});

Deno.test("validMoves: returns valid moves for player 1", () => {
  // Arrange
  const board = new Board();

  // Act
  const moves = board.validMoves(1);

  // Assert
  expect(moves.size).toBe(4); // Initial state has 4 valid moves
  expect([...moves]).toContainEqual([2, 3]);
  expect([...moves]).toContainEqual([3, 2]);
  expect([...moves]).toContainEqual([4, 5]);
  expect([...moves]).toContainEqual([5, 4]);
});

// ===== Tests für play() =====

Deno.test("play: throws error for illegal player", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.play(2, 3, 0)).toThrow(RangeError);
  expect(() => board.play(2, 3, 0)).toThrow("illegal player 0");
});

Deno.test("play: throws TypeError for non-number row", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.play("2", 3, 1)).toThrow(TypeError);
  expect(() => board.play("2", 3, 1)).toThrow("row and col must be numbers");
});

Deno.test("play: throws error for out of bounds move", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.play(-1, 3, 1)).toThrow(RangeError);
  expect(() => board.play(-1, 3, 1)).toThrow("is out of bounds");
});

Deno.test("play: throws error for invalid move", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.play(0, 0, 1)).toThrow(RangeError);
  expect(() => board.play(0, 0, 1)).toThrow("is not valid for player 1");
});

Deno.test("play: makes valid move and returns new board", () => {
  // Arrange
  const board = new Board();
  const initialPlayerOneCount = board.fieldsWithState(1).length;

  // Act
  const newBoard = board.play(2, 3, 1);

  // Assert
  // Original board unchanged
  expect(board.fieldsWithState(1).length).toBe(initialPlayerOneCount);

  // New board has one more stone for player 1
  expect(newBoard.fields[2][3]).toBe(1);
  expect(newBoard.fieldsWithState(1).length).toBe(4); // 2 initial + 1 new + 1 flipped
});

Deno.test("play: flips opponent stones correctly", () => {
  // Arrange: Use initial board state
  const board = new Board();
  // Initial state has stones at [3,3]=2, [3,4]=1, [4,4]=2, [4,3]=1
  // Playing at [2,3] for player 1 should flip [3,3]

  // Act
  const newBoard = board.play(2, 3, 1);

  // Assert
  expect(newBoard.fields[2][3]).toBe(1); // New stone
  expect(newBoard.fields[3][3]).toBe(1); // Flipped (was 2)
  // Original board unchanged
  expect(board.fields[3][3]).toBe(2);
});

// ===== Tests für opponent() =====

Deno.test("opponent: returns player 2 for player 1", () => {
  // Arrange
  const board = new Board();

  // Act
  const opponent = board.opponent(1);

  // Assert
  expect(opponent).toBe(2);
});

Deno.test("opponent: returns player 1 for player 2", () => {
  // Arrange
  const board = new Board();

  // Act
  const opponent = board.opponent(2);

  // Assert
  expect(opponent).toBe(1);
});

Deno.test("opponent: throws error for illegal player", () => {
  // Arrange
  const board = new Board();

  // Act & Assert
  expect(() => board.opponent(0)).toThrow(RangeError);
  expect(() => board.opponent(0)).toThrow("illegal player 0");
});

// ===== Tests für copy() =====

Deno.test("copy: creates independent copy of board", () => {
  // Arrange
  const board = new Board();
  const original = board.fields[3][3];

  // Act
  const copy = board.copy();
  copy.fields[3][3] = 0; // Modify copy

  // Assert
  expect(board.fields[3][3]).toBe(original); // Original unchanged
  expect(copy.fields[3][3]).toBe(0); // Copy changed
});

// ===== Tests für isValidMove() edge cases =====

Deno.test("isValidMove: returns false for non-number row", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, "2", 3);

  // Assert
  expect(result).toBe(false);
});

Deno.test("isValidMove: returns false for non-number col", () => {
  // Arrange
  const board = new Board();

  // Act
  const result = board.isValidMove(1, 2, "3");

  // Assert
  expect(result).toBe(false);
});

// ===== Tests für adjacentOf() (indirekt über validMoves) =====

Deno.test("adjacentOf: correctly identifies adjacent fields at board edge", () => {
  // Arrange: Board with stones at edges
  const fields = [
    [1, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const board = Board.of(fields);

  // Act
  const moves = board.validMoves(1);

  // Assert - Should find valid move at [0, 2]
  expect([...moves]).toContainEqual([0, 2]);
});

// ===== Test für validMoves mit Player 2 =====

Deno.test("validMoves: returns valid moves for player 2", () => {
  // Arrange
  const board = new Board();

  // Act
  const moves = board.validMoves(2);

  // Assert
  expect(moves.size).toBe(4); // Initial state has 4 valid moves for each player
  expect([...moves]).toContainEqual([2, 4]);
  expect([...moves]).toContainEqual([3, 5]);
  expect([...moves]).toContainEqual([4, 2]);
  expect([...moves]).toContainEqual([5, 3]);
});

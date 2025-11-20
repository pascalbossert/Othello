# Othello Game

A simple Othello (Reversi) game implementation.

## Getting Started

To start the application, run:

```bash
npx serve -s . -l 8080
```

Then open your browser and navigate to `http://localhost:8080` to play the game.

## Testing

This project includes comprehensive black-box tests using Deno Testing Framework.

### Running Tests

```bash
deno test
```

### Test Documentation

The following black-box testing methods have been implemented:

1. **Äquivalenzklassenbildung (Equivalence Class Testing)**
   - Documentation: `equivalence_class_testing.md`
   - Implemented method: `Board.isValidMove(player, row, col)`
   - Tests cover valid/invalid players, coordinates, and game states
   - Location: `board_test.js` (Tests T1-T10)

2. **Grenzwertanalyse (Boundary Value Analysis)**
   - Documentation: `boundary_value_analysis.md`
   - Analyzed method: `Board.result()` - `tied` field
   - Tests cover boundary conditions: tied game, player 1 wins, player 2 wins, game not finished
   - Location: `board_test.js` (Tests for `result` method)

3. **Zustandsbasierter Test (State-Based Testing)**
   - Documentation: `state_based_testing.md`
   - Analyzed method: `Board.play(row, col, player)`
   - Defined test cases with preconditions, events, reactions, and postconditions
   - Includes positive and negative test scenarios

4. **Entscheidungstabellentest (Decision Table Testing)**
   - Documentation: `decision_table_testing.md`
   - Analyzed method: `Board.result()`
   - Complete decision table with all condition combinations
   - Covers finished/not finished, tied/not tied, winner determination

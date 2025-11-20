import { expect } from "jsr:@std/expect";
import { solve } from "./quadratic_equation.ts";

// Testfall 1: d > 0 (zwei Lösungen)
// Beispiel: x² - 5x + 6 = 0 => (x-2)(x-3) = 0 => x = 2 oder x = 3
// d = (-5)² - 4(1)(6) = 25 - 24 = 1 > 0
Deno.test("two solutions when d > 0", () => {
  const result = solve(1, -5, 6);
  expect(result.length).toBe(2);
  expect(result[0]).toBeCloseTo(3);
  expect(result[1]).toBeCloseTo(2);
});

// Testfall 2: d == 0 (eine Lösung)
// Beispiel: x² - 4x + 4 = 0 => (x-2)² = 0 => x = 2
// d = (-4)² - 4(1)(4) = 16 - 16 = 0
Deno.test("one solution when d == 0", () => {
  const result = solve(1, -4, 4);
  expect(result.length).toBe(1);
  expect(result[0]).toBeCloseTo(2);
});

// Testfall 3: d < 0 (keine reellen Lösungen)
// Beispiel: x² + x + 1 = 0
// d = (1)² - 4(1)(1) = 1 - 4 = -3 < 0
Deno.test("no solutions when d < 0", () => {
  const result = solve(1, 1, 1);
  expect(result.length).toBe(0);
  expect(result).toEqual([]);
});

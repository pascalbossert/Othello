import { expect } from "jsr:@std/expect";
import { fibonacci } from "./fibonacci.js";

Deno.test("test first Fibonacci number", () => {
  expect(fibonacci(0)).toBe(1);
});

Deno.test("test second Fibonacci number", () => {
  expect(fibonacci(1)).toBe(1);
});

// Test für den default case (rekursiver Fall)
Deno.test("test recursive Fibonacci calculation", () => {
  expect(fibonacci(5)).toBe(8); // 1, 1, 2, 3, 5, 8
});

// Test für negative Zahl (if-Bedingung n >= 0 wird false)
Deno.test("test negative number returns undefined", () => {
  expect(fibonacci(-1)).toBeUndefined();
});

// Test für nicht-numerischen Wert (typeof n == "number" wird false)
Deno.test("test non-numeric input returns undefined", () => {
  expect(fibonacci("5")).toBeUndefined();
});

// Test für null
Deno.test("test null returns undefined", () => {
  expect(fibonacci(null)).toBeUndefined();
});

// Test für undefined
Deno.test("test undefined returns undefined", () => {
  expect(fibonacci(undefined)).toBeUndefined();
});

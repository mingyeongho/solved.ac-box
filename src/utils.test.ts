import { describe, test, expect } from "vitest";
import { getNextTierInfo, getPercent } from "./utils";
import { TIERS } from "./common";

describe("Percent Test", () => {
  test("S: 0, E: 100, C: 50 -> EX: 50.0", () => {
    expect(getPercent(0, 100, 50)).toBe(50.0);
  });

  // 소숫점 첫째자리까지 나오도록
  test("S: 0, E: 150, C: 50 -> EX: 33.3", () => {
    expect(getPercent(0, 150, 50)).toBe(33.3);
  });

  test("S: 1400, E: 1600, C: 1500 -> EX: 50.0", () => {
    expect(getPercent(1400, 1600, 1500)).toBe(50.0);
  });

  test("S: 1400, E: 1600, C: 1534 -> EX: 67.0", () => {
    expect(getPercent(1400, 1600, 1534)).toBe(67.0);
  });

  test("S: 3000, E: 3000, C: 3400 -> EX: 100.0", () => {
    expect(getPercent(3000, 3000, 3400)).toBe(100.0);
  });
});

describe("NextTierInfo Test", () => {
  test("C: 15 -> EX: TIERS[16]", () => {
    expect(getNextTierInfo(15)).toStrictEqual(TIERS[16]);
  });

  // Unrated
  test("C: 0 -> EX: TIERS[1]", () => {
    expect(getNextTierInfo(0)).toStrictEqual(TIERS[1]);
  });

  // C: Ruby
  test("C: 30 -> EX: TIERS[31]", () => {
    expect(getNextTierInfo(30)).toStrictEqual(TIERS[31]);
  });

  // C: Master
  test("C: 31 -> EX: null", () => {
    expect(getNextTierInfo(31)).toStrictEqual(null);
  });
});

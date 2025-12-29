import { FULL_WIDTH, TIERS, TTier } from "./common";

/**
 * clone from https://github.com/matchai/waka-box
 */
export function generateBarChart(percent: number, size: number) {
  const syms = "░▏▎▍▌▋▊▉█";

  const frac = Math.floor((size * 8 * percent) / 100);
  const barsFull = Math.floor(frac / 8);
  if (barsFull >= size) {
    return syms.substring(8, 9).repeat(size);
  }
  const semi = frac % 8;

  return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
    .join("")
    .padEnd(size, syms.substring(0, 1));
}

// ------------------------------------------------------------------------------------------

export function getCurrTierInfo(tier: TTier) {
  return TIERS[tier];
}

function isTTier(tier: number): tier is TTier {
  return tier in TIERS;
}

export function getNextTierInfo(tier: TTier) {
  const nextTier = tier + 1;

  if (!isTTier(nextTier)) {
    return null;
  }

  return TIERS[nextTier];
}

// ------------------------------------------------------------------------------------------

export function getPercent(start: number, end: number, current: number) {
  // Master는 3000점보다 점수가 클 수 있음.
  if (current > end) {
    return 100.0;
  }
  return Number((((current - start) / (end - start)) * 100).toFixed(1));
}

// ------------------------------------------------------------------------------------------

/**
 *
 * @param left 왼쪽에 위치할 텍스트
 * @param right 오른쪽에 위치할 텍스트
 * @param width 영역 너비
 * @returns 양 끝 정렬된 텍스트
 */
export function between(
  left: string,
  right: string = "",
  width: number = FULL_WIDTH
) {
  return left.padEnd(width - 1 - right.length, " ") + right;
}

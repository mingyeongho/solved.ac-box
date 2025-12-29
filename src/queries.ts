import { type TTier } from "./common";

interface ISolvedUser {
  /**
   * 사용자명
   */
  handle: string;
  /**
   * 자기소개
   */
  bio: string;
  /**
   * 취득한 CLASS, 취득한 CLASS가 없다면 0으로 표현
   */
  class: number;
  /**
   * 푼 문제 수
   */
  solvedCount: number;
  /**
   * 문제 해결 티어
   */
  tier: TTier;
  /**
   * 문제풀이 레이팅
   */
  rating: number;
  /**
   * 순위
   */
  rank: number;
}

export default async function ({ username }: { username: string }) {
  const data = await fetch(
    `https://solved.ac/api/v3/user/show?handle=${username}&x-solvedac-language=ko`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return data as ISolvedUser;
}

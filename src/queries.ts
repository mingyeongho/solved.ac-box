import { type TTier } from "./common";

interface ISolvedUser {
  handle: string;
  class: number;
  rating: number;
  bio: string;
  tier: TTier;
  solvedCount: number;
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

import { Octokit } from "@octokit/rest";
import solvedacQuery from "./queries";
import { config } from "dotenv";
import { TIERS } from "./common";

/**
 * get environment variable
 */
config({ path: [".env"] });

(async () => {
  /**
   * First, get user info in solved.ac
   */
  const res = await solvedacQuery({
    username: `${process.env.USERNAME}`,
  }).catch((error) => console.error(`Unable to get username and id\n${error}`));
  if (!res) {
    console.error(`Invalid res`);
    return;
  }

  /**
   * Second, create contents
   */
  const lines = [
    {
      label: "🏷️ Description",
      value: res.bio,
    },
    {
      label: `📈 Rating`,
      value: res.rating,
    },
    {
      label: `✅ Solved`,
      value: res.solvedCount,
    },
  ].reduce((acc, { label, value }) => {
    const line = [`${label}: ${value}`];

    return [...acc, line.join(" ")];
  }, [] as string[]);

  /**
   * Finally, write into gist
   */
  const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });
  const gist = await octokit.gists
    .get({
      gist_id: `${process.env.GIST_ID}`,
    })
    .catch((error) => console.error(`Unable to update gist\n${error}`));
  if (!gist) return;

  if (!gist.data.files) {
    console.error("No file found in the gist");
    return;
  }

  const filename = Object.keys(gist.data.files)[0];
  await octokit.gists.update({
    gist_id: `${process.env.GIST_ID}`,
    files: {
      [filename]: {
        filename: `${TIERS[res.tier]}, ${res.rating}`,
        content: lines.join("\n"),
      },
    },
  });

  console.log("Success to update the gist 🎉");
})();

import fetch from "node-fetch";
import consola from "consola";
import { promises as fs } from "fs";
import { exit } from "process";

(async () => {
    try {
        // Fetch latest gitmoji
        const data = await fetch(
            "https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json"
        ).then((r) => r.json());

        consola.success("fetched latest gitmoji from `@carloscuesta/gitmoji`");

        const parsed = data.gitmojis.reduce(
            (combined, gitmoji) =>
                (combined += `${gitmoji.emoji} | ${gitmoji.description}\n`),
            ""
        );

        // Parse and write gitmoji to file
        await fs.writeFile(
            "./data/gitmoji.json",
            JSON.stringify(data, null, 4)
        );

        await fs.writeFile("./data/gitmoji.txt", parsed);

        consola.success("generated input list for `commit` cli");
    } catch (err) {
        consola.error(err);
        exit(1);
    }
})();

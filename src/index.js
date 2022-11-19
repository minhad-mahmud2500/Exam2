import fs from "fs/promises";
import path from "path";
import { Stack } from "./stack";
import { Statement } from "./Statement";
const main = async () => {
    const filePath = path.resolve(process.cwd(), process.argv[2]);
    // Gets all the statements between begin and end
    const exceCode = (await fs.readFile(filePath, "ascii"))
        .trim()
        .replaceAll("\n", " ")
        .replaceAll(/\s+/g, " ");
    const result = [...exceCode.matchAll(/begin (.*) end/gm)];
    const statement = result[0] ? result[0][1] : "";
    Statement(statement);
};
main()
    .then(() => console.log(stack))
    .catch((err) => console.log("Error:", err));

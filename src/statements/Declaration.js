import stack from "../stack";
import Statement from "../Statement";
export default function Declaration(statement) {
    const regexMatch = statement.match(/([^;]+);(.*)/);
    // short variableOne
    const [_, declarationStatement, restStatement] = regexMatch;
    let [type, variable] = declarationStatement.split(" ");
    type = type.trim();
    variable = variable.trim();
    if (stack[variable] != undefined)
        throw new Error(`${variable} already exists`);
    stack[variable] = [type, undefined];
    Statement(restStatement.trim());
}

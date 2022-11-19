import { stack } from "../stack";
import { Tokens } from "../misc/Tokens";
import { Statement } from "../Statement";
import { Expression } from "../misc/Expression";

export default function Assign(statement: string) {
  const regexMatch = statement.match(/([^;]+);(.*)/)!;

  if (!regexMatch) throw new Error("Invalid formatting while assigning");

  const [_, assignStatement, restStatement] = regexMatch;

  let [variable, expression] = assignStatement.split(Tokens.ASSIGN);

  variable = variable.trim();
  expression = expression.trim();

  stack[variable][1] = Expression(expression);

  Statement(restStatement.trim());
}

import { Expression } from "./Expression";
import { Tokens } from "./Tokens";
export default function BooleanEquation(equation) {
    const { IL, IG, ILE, IGE, EE, NE } = Tokens;
    const equationOperators = [IL, IG, ILE, IGE, EE, NE];
    for (let i = 0; i < equationOperators.length; i++) {
        const hasToken = equation.includes(` ${equationOperators[i]} `);
        if (!hasToken)
            continue;
        const [expressionOne, expressionTwo] = equation.split(` ${equationOperators[i]} `);
        const valueOne = Expression(expressionOne);
        const valueTwo = Expression(expressionTwo);
        const token = equationOperators[i];
        if (token == IL)
            return valueOne < valueTwo;
        if (token == IG)
            return valueOne <= valueTwo;
        if (token == ILE)
            return valueOne > valueTwo;
        if (token == IGE)
            return valueOne >= valueTwo;
        if (token == EE)
            return valueOne == valueTwo;
        if (token == NE)
            return valueOne != valueTwo;
    }
    throw new Error("Invalid Boolean expression");
}

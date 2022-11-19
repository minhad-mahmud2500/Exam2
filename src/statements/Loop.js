import BooleanEquation from "../misc/BooleanEquation";
import Statement from "../Statement";
import InsideBrackets from "../misc/InsideBrackets";
import Tokens from "../misc/Tokens";
export default function Loop(statement) {
    statement = statement.replace("repeat ", "").trim();
    const { insideStatement: booleanEquation, restStatement: conditionStatement, } = InsideBrackets(statement, Tokens.PARENTHESISOPEN, Tokens.PARENTHESISCLOSE);
    const { insideStatement, restStatement } = InsideBrackets(conditionStatement.trim(), Tokens.BLOCKOPEN, Tokens.BLOCKCLOSE);
    while (true) {
        if (BooleanEquation(booleanEquation))
            Statement(insideStatement);
        else
            break;
    }
    Statement(restStatement);
}

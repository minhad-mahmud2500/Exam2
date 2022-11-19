import BooleanEquation from "../misc/BooleanEquation";
import InsideBrackets from "../misc/InsideBrackets";
import Tokens from "../misc/Tokens";
import Statement from "../Statement";
export default function Condition(statement) {
    statement = statement.replace("cond ", "");
    const { insideStatement: booleanEquation, restStatement: conditionStatement, } = InsideBrackets(statement, Tokens.PARENTHESIS_OPEN, Tokens.PARENTHESIS_CLOSE);
    const { insideStatement, restStatement } = InsideBrackets(conditionStatement.trim(), Tokens.BLOCKOPEN, Tokens.BLOCKCLOSE);
    if (BooleanEquation(booleanEquation))
        Statement(insideStatement);
    Statement(restStatement);
}

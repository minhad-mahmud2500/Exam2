export default function InsideBrackets(statement, startBracket, endBracket) {
    let bracketCounter = 1;
    let currIndex = 1;
    while (bracketCounter > 0) {
        if (currIndex >= statement.length)
            throw new Error("Invalid Statement");
        if (statement.charAt(currIndex) == startBracket)
            bracketCounter++;
        else if (statement.charAt(currIndex) == endBracket)
            bracketCounter--;
        currIndex++;
    }
    return {
        insideStatement: statement.substring(1, currIndex - 1).trim(),
        restStatement: statement.substring(currIndex).trim(),
    };
}

import stack from "../stack";
import Tokens from "./Tokens";
const { ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, PARENTHESIS_OPEN, PARENTHESIS_CLOSE } = Tokens;
class BinaryNode {
    constructor(value = "") {
        this.value = "";
        this.value = value;
        this.left;
        this.right;
    }
}
export default class LexicalAnalyzer {
    constructor(expression) {
        this.getEquation = () => {
            return this.value;
        };
        this.getIndexOfPairBracket = (statement, startBracket, endBracket, startIndex) => {
            let bracketCounter = 1;
            let currIndex = startIndex + 1;
            while (bracketCounter > 0) {
                if (currIndex >= statement.length)
                    throw new Error("Invalid Expression");
                if (statement.charAt(currIndex) == startBracket)
                    bracketCounter++;
                else if (statement.charAt(currIndex) == endBracket)
                    bracketCounter--;
                currIndex++;
            }
            return currIndex;
        };
        this.inParenthesis = (expression) => {
            if (expression[0] != PARENTHESIS_OPEN)
                return false;
            const i = this.getIndexOfPairBracket(expression, PARENTHESIS_OPEN, PARENTHESIS_CLOSE, 0);
            return i >= expression.length;
        };
        this.makeTree = (expression, node) => {
            expression = expression.trim();
            if (this.inParenthesis(expression))
                expression = expression.substring(1, expression.length - 1);
            if (!expression)
                throw new Error("Invalid Expression");
            if (!isNaN(+expression))
                return (node.value = +expression);
            let plusIndex;
            let subIndex;
            let multiplicationIndex;
            let divisionIndex;
            let tempExp = expression;
            for (let i = 0; i < tempExp.length; i++) {
                if (tempExp[i] == PARENTHESIS_OPEN) {
                    i = this.getIndexOfPairBracket(tempExp, PARENTHESIS_OPEN, PARENTHESIS_CLOSE, i);
                }
                else if (tempExp.substring(i - 1, i + 2) == ` ${ADDITION} `)
                    plusIndex = i;
                else if (tempExp.substring(i - 1, i + 2) == ` ${SUBTRACTION} `)
                    subIndex = i;
                else if (tempExp.substring(i - 1, i + 2) == ` ${MULTIPLICATION} `)
                    multiplicationIndex = i;
                else if (tempExp.substring(i - 1, i + 2) == ` ${DIVISION} `)
                    divisionIndex = i;
            }
            if (plusIndex || subIndex || multiplicationIndex || divisionIndex) {
                node.left = new BinaryNode();
                node.right = new BinaryNode();
            }
            else {
                if (stack[expression] == undefined || stack[expression][1] == undefined) {
                    throw new Error("Variable doesn't exist");
                }
                if (stack[expression] != undefined)
                    node.value = stack[expression][1];
                return;
            }
            const operatorIndices = [
                [multiplicationIndex, MULTIPLICATION],
                [divisionIndex, DIVISION],
                [plusIndex, ADDITION],
                [subIndex, SUBTRACTION],
            ];
            for (let i = 0; i < operatorIndices.length; i++) {
                const [index, operator] = operatorIndices[i];
                if (!index)
                    continue;
                node.value = operator;
                this.makeTree(expression.substring(0, index).trim(), node.left);
                this.makeTree(expression.substring(index + 2).trim(), node.right);
                break;
            }
        };
        this.equateTree = (node) => {
            if (!node)
                return 0;
            if (typeof node.value == "number")
                return node.value;
            switch (node.value) {
                case "+":
                    return this.equateTree(node.left) + this.equateTree(node.right);
                case "-":
                    return this.equateTree(node.left) - this.equateTree(node.right);
                case "*":
                    return this.equateTree(node.left) * this.equateTree(node.right);
                default:
                    return this.equateTree(node.left) / this.equateTree(node.right);
            }
        };
        const root = new BinaryNode();
        this.makeTree(expression, root);
        this.root = root;
        this.value = this.equateTree(root);
    }
}

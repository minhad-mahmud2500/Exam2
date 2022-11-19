import LexicalAnalyzer from "./LexicalAnalyzer";
export default function Expression(expression) {
    const lexicalAnalyzer = new LexicalAnalyzer(expression.trim());
    return lexicalAnalyzer.getEquation();
}

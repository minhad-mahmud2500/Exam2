# Exam2
# Lexical Analyzer

## Lexical Rules

Each Token /lexame should be seperated by a space

Code starts with `GO` and ends with `GOAL`.All the statements are between the blocks

## Types of statements
- Declaration
- Assign
- Condition
- Loop
### Declaration Statement
Begins with a Integer type keyword, followed by variable name, and ends with a `;`;
The variable is stored in a hashmap, **key** is the variable name and the **value** is an array. `[type, value]`.
### Assign Statement
The statement starts with a variable that exists in the stack. If it doesn't, throw an error.
Then follows an `=` token with the expression it should be assign to and ends with `;`;
### Condition Statement
The statement starts with keyword `case`, followed with `( boolean expression )` and `{ statement }`.
### Loop Statement
The statement starts with keyword `echo`, followed with `( boolean expression)` and `{ statement }`. Statement will keep running, till boolean expression is false.
### Mathematical Expressions
An expression is valid,only if it matches with the following regex.
Each number, and token have to be **separated** by a space.
`/(-?\d|[a-zA-Z])*( [+|-|*|\/] (-?\d+|[a-zA-Z]+))*/`
Valid expression:
- -7
- 7 + -13
- 7 + 13 + numOne
Invalid expression:
- 7+13
- -13+numOne
## Tokens
### Mathematical Operators

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ADDITION         | +         | +     |
| SUBTRACTION      | -         | -     |
| MULTIPLICATION   | \*        | \*    |
| DIVISION         | /         | /     |
| PARENTHESIS_OPEN | (         | )     |
| PARENTHESIS_CLOSE| )         | )     |

### Mathematical Equators

| Token Code | Operation | Regex |
| ---------- | --------- | ----- |
| IL         | <         | <     |
| IG         | >         | >     |
| ILE        | <=        | <=    |
| IGE        | >=        | >=    |
| EE         | ==        | ==    |
| NE         | !=        | !=    |

### Integer Types

| Token Code | condition                                          | Regex | Size    |
| ---------- | -------------------------------------------------- | ----- | ------- |
| CHIBI      | -128 <= num <= 127                                 | \d+   | 1 byte  |
| MINI       | -32768 <= num <= 32767                             | \d+   | 2 bytes |
| SMALL      | -2147483648 <= num <= 2147483647                   | \d+   | 4 bytes |
| REGULAR    | -9223372036854775808 <= num <= 9223372036854775808 | \d+   | 8 bytes |

### Keyword Types

| Token Code | Regex         |
| ---------- | ------------- |
| VAR        | [a-zA-Z]{6,8} |
| COND       | case          |
| REPEAT     | echo          |
| GO         | go            |
| GOAL       | goal          |

### Extras

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ASSIGNMENT       | =         | =     |
| BLOCKOPEN        | {         | {     |
| BLOCKCLOSE       | }         | }     |
| PARENTHESOPEN    | (         | )     |
| PARENTHESCLOSE   | )         | )     |

## Priority Order

- ()
- \+
- \-
- \*
- /

> Top to Bottom
<!-- Can we use bit wise operator -->

## Production Rules

```txt
<Program> --> GO <stmt_list> GOAL
<stmt_list> --> {<stmt> `;`}
<stmt> --> <if_stmt> | <while_stmt> | <as_s>  | <declaration>
<if_stmt> --> cond <bool> `{` { <stmt> ';'} `}`
<while_stmt> --> repeat `{` <bool> { <stmt> ';' } `}`
<as_s> --> <var> = <expression> `;`
<declaration> --> <datatype> <var> `;`
<datatype> --> (CHIBI|MINI|SMALL|REGULAR)
<var> -->  [a-zA-Z_]{6,8} // our variable rule
<expression> --> <term> { (`*`|`\` ) <term> }
<term> --> <term> { (`+`|`-`) <term> }
<factor> --> [0-9]+ | <var>  | `(` <expression> `)`
<bool> --> <expression> (`<=`|`>=` | `<` | `>`) <expression>
E --> E + T             Expression + Term
E --> E - T             Expression - Term
E --> T                 Some expression can be a term
T --> T * F             Term * Factor
T --> T / F             Term / Factor
F --> -F                Unary Minus
F --> +F                Unary Plus
E --> a                 Factor can be a constant
E --> (e)               Factor can be an expression in parentheses
```

## Is it a LL Grammar?

the code is read from left to right. And an LL grammar of 1. Read one line ahead before it performs the next actions.

## Is it Ambiguous Grammar? (D)

Looking at our LR table, if we had any ambiguity, our LR table blocks would be highlighted in red in the action block. The picture is show below. So there is **no ambiguity**.
## LR(1) Grammar and parse tree (H).

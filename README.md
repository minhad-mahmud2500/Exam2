# Exam2
# Lexical Analyzer

## Lexical Rules

Each Token / Lexical should be seperated by a space

Code starts with `begin` and ends with `end`. Between the block will have all the statements.

## Types of statements

- Declaration
- Assign
- Condition
- Loop

### Declaration Statement

Starts with a Integer type keyword, followed by variable name, and ends with a `;`;

The variable is stored in a hashmap, **key** is the variable name and the **value** is an array. `[type, value]`.

### Assign Statement

The statement starts with a variable that exists in the stack. If it doesn't, throw an error.
Then follows an `=` token with the expression it should be assign to and ends with `;`;

### Condition Statement

The statement starts with keyword `cond`, followed with `( boolean expression )` and `{ statement }`.

### Loop Statement

The statement starts with keyword `repeat`, followed with `( boolean expression)` and `{ statement }`. Statement will keep running, till boolean expression is false.

### Mathematical Expressions

An expression is valid, if and only if, it matches with the following regex.

Each number, and token have to be **separated** by a space.

`/(-?\d|[a-zA-Z])*( [+|-|*|\/] (-?\d+|[a-zA-Z]+))*/`

Valid expression:

- -2
- 2 + -10
- 2 + 10 + numOne

Invalid expression:

- 2+10
- -2+numOne

## Tokens

### Mathematical Operators

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ADD              | +         | +     |
| SUB              | -         | -     |
| MUL              | \*        | \*    |
| DIV              | /         | /     |
| PARENTHESISOPEN  | (         | )     |
| PARENTHESISCLOSE | )         | )     |

### Mathematical Equators

| Token Code | Operation | Regex |
| ---------- | --------- | ----- |
| LT         | <         | <     |
| GT         | >         | >     |
| LTE        | <=        | <=    |
| GTE        | >=        | >=    |
| EQ         | ==        | ==    |
| NE         | !=        | !=    |

### Integer Types

| Token Code | condition                                          | Regex | Size    |
| ---------- | -------------------------------------------------- | ----- | ------- |
| SHORT      | -128 <= num <= 127                                 | \d+   | 1 byte  |
| TALL       | -32768 <= num <= 32767                             | \d+   | 2 bytes |
| GRANDE     | -2147483648 <= num <= 2147483647                   | \d+   | 4 bytes |
| VENTI      | -9223372036854775808 <= num <= 9223372036854775808 | \d+   | 8 bytes |

### Keyword Types

| Token Code | Regex         |
| ---------- | ------------- |
| VAR        | [a-zA-Z]{6,8} |
| COND       | cond          |
| REPEAT     | repeat        |
| BEGIN      | begin         |
| END        | end           |

### Extras

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ASSIGNMENT       | =         | =     |
| CODEBLOCKOPEN    | {         | {     |
| CODEBLOCKCLOSE   | }         | }     |
| PARENTHESISOPEN  | (         | )     |
| PARENTHESISCLOSE | )         | )     |

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
<Program> --> Begin <stmt_list> End
<stmt_list> --> {<stmt> `;`}
<stmt> --> <if_stmt> | <while_stmt> | <as_s>  | <declaration>
<if_stmt> --> cond <bool> `{` { <stmt> ';'} `}`
<while_stmt> --> repeat `{` <bool> { <stmt> ';' } `}`
<as_s> --> <var> = <expression> `;`
<declaration> --> <datatype> <var> `;`
<datatype> --> (SHORT|TALL|GRANDE|VENTI)
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

Yes, the code is read from left to right. And an LL grammar of 1. Read one line ahead before it performs the next actions.


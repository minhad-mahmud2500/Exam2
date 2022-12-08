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
| CASE       | case          |
| ECHO       | echo          |
| GO         | go            |
| GOAL       | goal          |

### Extras

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ASSIGNMENT       | =         | =     |
| BLOCKOPEN        | {         | {     |
| BLOCKCLOSE       | }         | }     |
| PARENTHESIS_OPEN | (         | )     |
| PARENTHESIS_CLOSE| )         | )     |

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
<if_stmt> --> case <bool> `{` { <stmt> ';'} `}`
<while_stmt> --> echo `{` <bool> { <stmt> ';' } `}`
<as_s> --> <var> = <expression> `;`
<declaration> --> <datatype> <var> `;`
<datatype> --> (CHIBI|MINI|SMALL|REGULAR)
<var> -->  [a-zA-Z_]{6,8} 
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
read from left to right. And an LL grammar of 1.
## Is it Ambiguous Grammar?
There is **no ambiguity**.
### Failing Cases
```
GO

  CHIB var1one;
  var1one = 10 + (2 + 5);

  cas ( var10ne >= 20) {
    var1ne = 50;
  }

  SMA varTwo;
  varTwo = var10ne + 10;

GOAL
```
Lexical Errors:

- CHIB: Supposed to be CHIBI
- cas: Supposed to be case
- var1ne:  Supposed to be var1one
- SMA: Supposed to be SMALL
- var10ne: Supposed to be var1one

```
GO

  SMALL var1;
  var1 = 10+7 - 2;

  case (var1 < = 13 {
    var1 = 20;

    case (var1 == 20) {
      var1 = var1 % 4;

    SMALL varTwo;
    var1 = 10 + 13 * ( 5 + 6 ;
  }
GOAL
```
Lexical Errors:
- 10+7 : Need to have a space between the operands 10 + 7
- < = : shouldn't be separated. <=
- 13 ) : boolean expression should end with )
- 4; } : boolean statement should end with }
- 5 + 6 : mathematical parenthesis should be closed with )
### Passing Cases
```
GO

  CHIBI varOne;
  varOne = 2;

  MINI varTwo;
  varTwo = 56 + 100 + (2 + (5 * 2)) * varOne;

  case (varOne != varTwo) {
    case (varOne <= varTwo) {
      varOne = varTwo * 8;
    }
  }

  MINI varThree;
  varThree = 0;

  echo (varThree <= 3) {
    varThree = varThree + 1;

    case (varThree == 6) {
      varThree = varThree * 1;
    }
  }

GOAL
```
```
GO
REGULAR var1;
 varOne = 10 + (5 + -2) * 4;
  MINI var2;
  var2 = 2 * var1;

  CHIBI it;
  it = 0;

  echo (it < 5) {
    it = it + 1;
  }
GOAL
```
## LR(1) Grammar and parse tree.
![image](https://user-images.githubusercontent.com/87450136/206337166-7a6255b1-bff7-4adc-9ac3-e2857688217d.png)
![jsmachines sourceforge net_machines_lr1 html](https://user-images.githubusercontent.com/87450136/206337914-f325263b-1fb3-43dc-806c-816a76bb8a81.png)
fail
![image](https://user-images.githubusercontent.com/87450136/206338428-659fb249-7403-4a52-a186-b811dd2e045b.png)
fail
![image](https://user-images.githubusercontent.com/87450136/206340721-dd4f2bc1-6a47-47ef-bae1-781e55007716.png)

pass
![image]![image](https://user-images.githubusercontent.com/87450136/206338108-ac40adbf-f123-4487-8a68-05471c455b88.png)
pass
![image](https://user-images.githubusercontent.com/87450136/206338276-d2033906-1d8c-4ce9-b4e4-24e60b7f88cf.png)






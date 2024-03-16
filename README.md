# Tabletip - a tool for creating ascii tables

You need this when you need to quickly create a table like this:

```text
#   0   1   2   3   4   5
0 | _ | _ | _ | _ | _ | _ |
1 | _ | _ | _ | _ | _ | _ |
2 | _ | _ | _ | _ | _ | _ |
3 | _ | _ | _ | _ | _ | _ |
4 | _ | _ | _ | _ | _ | _ |
5 | _ | _ | _ | _ | _ | _ |
```

or this

```text
|  1 |  2 |  3 |  4 |  5 |  6 |
|  5 |  6 |  7 |  8 |  9 | 10 |
|  9 | 10 | 11 | 12 | 13 | 14 |
| 13 | 14 | 15 | 16 | 17 | 18 |
| 17 | 18 | 19 | 20 | 21 | 22 |
| 21 | 22 | 23 | 24 | 25 | 26 |
```

or this

```text
#      2      3      4      5      6      7      8      9     10
2 |    4 |    8 |   16 |   32 |   64 |  128 |  256 |  512 | 1024 |
```

## Installation

`npm i tabletip`

or just run it with

`npx tabletip`

## CLI usage

```text
Usage: tabletip <rows> <cols> [OPTIONS]...

Arguments:
  rows                       table height (required)
  cols                       table width (required)

Options:
  -v, --version              output the version number
  -i, --inclideHeaders       include table headers (default: false)
  -f, --fill <char>          fill with symbol (defalut is "0") (default: "0")
  -c, --copy                 copy output to clipboard (only MacOS) (default: false)
  -t, --tabulation           remove tabulation (make ugly) output (default: false)
  -s, --startFrom <number>   start table rows & cols from (default: 0)
  --startRows <number>       start table rows from
  --startCols <number>       start table cols from
  -e, --expression <string>  use javascript expression to fill a table
  -h, --help                 display help for command
```

Example:

`npx tabletip 2 2`

will print

```text
| 0 | 0 |
| 0 | 0 |
```

## Options

### -c - copy to clipboard

copy output to clipboard (work only on MacOS at the moment)

### -i, --inclideHeaders - include table headers

`npx tabletip 2 2 -i`

```text
#   0   1
0 | 0 | 0 |
1 | 0 | 0 |
```

### -f, --fill - fill with symbol (defalut is "0")

`npx tabletip 3 3 -f "a"`

```text
| a | a | a |
| a | a | a |
| a | a | a |
```

### -e - use javascript expression to fill a table

`npx tabletip 4 4 -i -e "2*2"`

```text
#   0   1   2   3
0 | 4 | 4 | 4 | 4 |
1 | 4 | 4 | 4 | 4 |
2 | 4 | 4 | 4 | 4 |
3 | 4 | 4 | 4 | 4 |
```

you can get current rows and column with variables `row` and `col`:

`npx tabletip 4 4 -i -e "(row+1)*(col+1)"`

```text
#   0   1    2    3
0 | 1 | 2 |  3 |  4 |
1 | 2 | 4 |  6 |  8 |
2 | 3 | 6 |  9 | 12 |
3 | 4 | 8 | 12 | 16 |
```

### -s - start table rows & cols from (default: 0)

`npx tabletip 4 4 -e "(row)*(col)" -i -s 1`

```text
#    1    2    3    4
1 |  1 |  2 |  3 |  4 |
2 |  2 |  4 |  6 |  8 |
3 |  3 |  6 |  9 | 12 |
4 |  4 |  8 | 12 | 16 |
```

without this option you will get zeroes at start

```text
#   0   1   2   3
0 | 0 | 0 | 0 | 0 |
1 | 0 | 1 | 2 | 3 |
2 | 0 | 2 | 4 | 6 |
3 | 0 | 3 | 6 | 9 |
```

### --startRows - start table rows from

the same as -s, but applies only to rows

### --startCols - start table cols from

the same as -s, but applies only to columns

### -t - disable tabulation

with  
`npx tabletip 4 4 -e "(row+1)*(col+1)" -t`

you get

```text
#   0   1   2   3
0 | 1 | 2 | 3 | 4 |
1 | 2 | 4 | 6 | 8 |
2 | 3 | 6 | 9 | 12 |
3 | 4 | 8 | 12 | 16 |
```

instead of

```text
#    0    1    2    3
0 |  1 |  2 |  3 |  4 |
1 |  2 |  4 |  6 |  8 |
2 |  3 |  6 |  9 | 12 |
3 |  4 |  8 | 12 | 16 |
```

## Some examples

`npx tabletip 7 7 -e "col === row || col + row === 6 ? '*' : ' '"`

```text
| * |   |   |   |   |   | * |
|   | * |   |   |   | * |   |
|   |   | * |   | * |   |   |
|   |   |   | * |   |   |   |
|   |   | * |   | * |   |   |
|   | * |   |   |   | * |   |
| * |   |   |   |   |   | * |
```

`npx tabletip 6 6 -e "(row*4+col+1)"`

```text
|  1 |  2 |  3 |  4 |  5 |  6 |
|  5 |  6 |  7 |  8 |  9 | 10 |
|  9 | 10 | 11 | 12 | 13 | 14 |
| 13 | 14 | 15 | 16 | 17 | 18 |
| 17 | 18 | 19 | 20 | 21 | 22 |
| 21 | 22 | 23 | 24 | 25 | 26 |
```

`npx tabletip 6 6 -e "5*5-(row*4+col)+1"`

```text
| 26 | 25 | 24 | 23 | 22 | 21 |
| 22 | 21 | 20 | 19 | 18 | 17 |
| 18 | 17 | 16 | 15 | 14 | 13 |
| 14 | 13 | 12 | 11 | 10 |  9 |
| 10 |  9 |  8 |  7 |  6 |  5 |
|  6 |  5 |  4 |  3 |  2 |  1 |
```

`npx tabletip 1 11 -e "Math.pow(row, col)" -i --startRows 2`

```text
#      0      1      2      3      4      5      6      7      8      9     10
2 |    1 |    2 |    4 |    8 |   16 |   32 |   64 |  128 |  256 |  512 | 1024 |
```

## API usage examples

```ts
import tabletip from 'tabletip';

let result
result = tabletip(2, 2);
result = tabletip(4, 4, { fillSymbol: '_', includeHeaders: true });
result = tabletip(4, 4, {
  includeHeaders: true,
  startFrom: 1,
  expression: '(row+1)*(col+1)',
  removeTabulation: true,
});
```

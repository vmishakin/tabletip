import tabletip from '../src/index';

describe('tabletip', () => {
  it('should print correct table 2x2', () => {
    const res = tabletip(2, 2);
    // prettier-ignore
    expect(res).toBe(
`| 0 | 0 |
| 0 | 0 |
`);
  });
  it('should print correct table 3x7', () => {
    const res = tabletip(3, 7);
    // prettier-ignore
    expect(res).toBe(
`| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
`);
  });

  it('should print correct table 6x6 with custom fill', () => {
    const res = tabletip(6, 6, { fillSymbol: '*' });
    // prettier-ignore
    expect(res).toBe(
`| * | * | * | * | * | * |
| * | * | * | * | * | * |
| * | * | * | * | * | * |
| * | * | * | * | * | * |
| * | * | * | * | * | * |
| * | * | * | * | * | * |
`);
  });

  it('should include headers with headers option', () => {
    const res = tabletip(4, 4, { fillSymbol: '_', includeHeaders: true });
    // prettier-ignore
    expect(res).toBe(
`#   0   1   2   3
0 | _ | _ | _ | _ |
1 | _ | _ | _ | _ |
2 | _ | _ | _ | _ |
3 | _ | _ | _ | _ |
`);
  });

  it('should change headers numeration', () => {
    const res = tabletip(4, 4, {
      fillSymbol: '_',
      includeHeaders: true,
      startFrom: 1,
    });
    // prettier-ignore
    expect(res).toBe(
`#   1   2   3   4
1 | _ | _ | _ | _ |
2 | _ | _ | _ | _ |
3 | _ | _ | _ | _ |
4 | _ | _ | _ | _ |
`);
  });

  it('should evaluate javascript expression', () => {
    const res = tabletip(4, 4, {
      includeHeaders: true,
      startFrom: 1,
      expression: '(row)*(col)',
    });
    // prettier-ignore
    expect(res).toBe(
`#    1    2    3    4
1 |  1 |  2 |  3 |  4 |
2 |  2 |  4 |  6 |  8 |
3 |  3 |  6 |  9 | 12 |
4 |  4 |  8 | 12 | 16 |
`);
  });

  it('should evaluate another javascript expression', () => {
    const res = tabletip(4, 4, {
      expression: '(row+1)*(row+1)*(col+1)*(col+1)',
    });
    // prettier-ignore
    expect(res).toBe(
`|   1 |   4 |   9 |  16 |
|   4 |  16 |  36 |  64 |
|   9 |  36 |  81 | 144 |
|  16 |  64 | 144 | 256 |
`);
  });

  it('should not add tabulation (prettify)', () => {
    const res = tabletip(4, 4, {
      includeHeaders: true,
      startFrom: 1,
      expression: '(row)*(row)*(col)*(col)',
      removeTabulation: true,
    });
    // prettier-ignore
    expect(res).toBe(
`#   1   2   3   4
1 | 1 | 4 | 9 | 16 |
2 | 4 | 16 | 36 | 64 |
3 | 9 | 36 | 81 | 144 |
4 | 16 | 64 | 144 | 256 |
`);
  });

  it('should change delimeter', () => {
    const res = tabletip(2, 2, { delimeter: '$' });
    // prettier-ignore
    expect(res).toBe(
`$ 0 $ 0 $
$ 0 $ 0 $
`);
  });
});

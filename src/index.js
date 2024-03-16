const header = '#';

/**
 * Make ascii table
 * @param {number} rows
 * @param {number} cols
 * @param {import("./").TToolParams} _params
 * @returns
 */
export default function tabletip(rows, cols, _params) {
  const delimeter = _params?.delimeter ?? '|';
  const params = {
    includeHeaders: _params?.includeHeaders ?? false,
    fillSymbol: _params?.fillSymbol ?? '0',
    expression: _params?.expression ?? undefined,
    startRows: _params?.startRows ?? _params?.startFrom ?? 0,
    startCols: _params?.startCols ?? _params?.startFrom ?? 0,
    removeTabulation: _params?.removeTabulation ?? false,
  };
  const table = [];

  for (let _row = 0; _row < rows; _row++) {
    table.push([]);
    const currRow = table[_row];
    if (params.includeHeaders) {
      currRow.push(String(_row + params.startRows));
    }
    for (let _col = 0; _col < cols; _col++) {
      let value;
      if (params.expression) {
        // NOTE: row and col can be used inside expression
        let row = _row + params.startRows;
        let col = _col + params.startCols;
        value = eval(params.expression);
      } else {
        value = params.fillSymbol;
      }
      currRow.push(String(value));
    }
  }

  if (params.includeHeaders) {
    const headerArr = new Array(cols)
      .fill(0)
      .map((_, i) => String(i + params.startCols));
    table.unshift([header, ...headerArr]);
  }

  if (!params.removeTabulation) {
    tabulize(table, params.includeHeaders);
  }

  let result = '';
  for (let row = 0; row < table.length; row++) {
    const seperator =
      params.includeHeaders && row === 0 ? '   ' : ` ${delimeter} `;
    const ending =
      params.includeHeaders && row === 0 ? '\n' : ` ${delimeter}\n`;
    const prefix = params.includeHeaders ? '' : `${delimeter} `;
    result += prefix + table[row].join(seperator) + ending;
  }

  return result;
}

function tabulize(matrix, includeHeaders) {
  let maxLength = 1;
  for (const row of matrix) {
    for (const col of row) {
      maxLength = Math.max(maxLength, col.length);
    }
  }
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (includeHeaders && col === 0) continue;
      matrix[row][col] = matrix[row][col].padStart(maxLength, ' ');
    }
  }
}

#!/usr/bin/env node
import { program } from 'commander';
import tabletip from './index.js';
import print from './print.js';

program
  .version('1.0.0', '-v, --version')
  .usage('<rows> <cols> [OPTIONS]...')
  .argument('<rows>', 'table height', myParseInt)
  .argument('<cols>', 'table width', myParseInt)
  .option('-i, --inclideHeaders', 'include table headers', false)
  .option('-f, --fill <char>', 'fill with symbol (defalut is "0")', '0')
  .option('-c, --copy', 'copy output to clipboard (only MacOS)', false)
  .option('-t, --tabulation', 'remove tabulation (make ugly) output', false)
  .option(
    '-s, --startFrom <number>',
    'start table rows & cols from',
    myParseInt,
    0,
  )
  .option('--startRows <number>', 'start table rows from', myParseInt)
  .option('--startCols <number>', 'start table cols from', myParseInt)
  .option(
    '-e, --expression <string>',
    'use javascript expression to fill a table',
  )
  .option('-d, --delimeter <char>', 'change delimeter', '|')
  .parse(process.argv);

const options = program.opts();

const resData = tabletip(program.processedArgs[0], program.processedArgs[1], {
  includeHeaders: options.inclideHeaders,
  fillSymbol: options.fill,
  expression: options.expression,
  startFrom: options.startFrom,
  startRows: options.startRows,
  startCols: options.startCols,
  removeTabulation: options.tabulation,
  delimeter: options.delimeter,
});

print(resData, options.copy);

function myParseInt(value) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

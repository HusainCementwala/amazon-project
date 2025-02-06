import {formatCurrency} from '../scripts/utils/money.js'

console.log('Test Suite: Format Currency');
console.log('converts cents into dollars');
if(formatCurrency(2095) === '20.95') console.log('passed');
else console.log('failed');

console.log('works on zero');
if(formatCurrency(0) === '0.00') console.log('passed again');
else console.log('failed again');


console.log('rounds up to nearest cent');
if(formatCurrency(2000.5) === '20.01') console.log('passed again 2');
else console.log('failed again 2');

console.log(formatCurrency(2000.4));
//this is an automated test
//2 types of test cases
//basic cases - check of code works or not
//edge cases - values that are tricky

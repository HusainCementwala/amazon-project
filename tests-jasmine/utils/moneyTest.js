import {formatCurrency} from '../../scripts/utils/money.js'

//see how the same values are being given as in moneyTest.js in tests file
describe('Test Suite: Format Currency',() => {

 it('converts cents into dollars', () => {
  expect(formatCurrency(2095)).toEqual('20.95');
 });

it('works on zero',()=>{
  expect(formatCurrency(0)).toEqual('0.00');
});

it('round to nearest cent',()=>{
  expect(formatCurrency(2000.5)).toEqual('20.01');
});


});



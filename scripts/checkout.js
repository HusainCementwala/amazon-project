import { renderOrderSummary } from "./checkout/orderSummary.js";


renderOrderSummary(); //to change the values on multiple places in the page
//we put the whole code in a function and called it 
//EX the date on top of order has to change automatically on changing the delivery radio button
//to do that we put the whole code on this page in a fucntion and then call it to run when 
//1. when we arrive on this page(by the call above)
//2. By calling it in the event listener of the radio button {see there} means its calling itself or rerunning it(recursion) . check the whole function in 
//orderSummary.js
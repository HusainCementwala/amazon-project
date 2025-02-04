export function formatCurrency(priceCents){

return (priceCents / 100).toFixed(2);

//create a function and share it for currency convert in chckout.js and amazon.js(look at the imports)

}

export default formatCurrency;
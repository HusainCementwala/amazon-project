export function formatCurrency(priceCents){

return (Math.round(priceCents) / 100);

//create a function and share it for currency convert in chckout.js and amazon.js(look at the imports)

}

export default formatCurrency;
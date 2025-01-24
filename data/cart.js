export const cart = [];

//this function is called on clicking add to cart in amazon.js file
export function addToCart(productId){

  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){ 
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantitySelect = Number(quantitySelector.value);
   
  if(matchingItem){ //it is an object of truthy value
   matchingItem.quantity += quantitySelect;
  }
  else{
    cart.push({
    productId : productId,
    quantity : quantitySelect  
   });
  }
}

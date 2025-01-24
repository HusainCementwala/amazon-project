export let cart = [{

  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},
{

  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}];



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


export function removeFromCart(productId){

  /*STEPS:
  1.create a new array
  2.loop through the cart
  3.Add each product to new array except for this productId*/

  const newCart = [];

  cart.forEach((cartItem)=>{

    if(cartItem.productId !== productId){

      newCart.push(cartItem); //contain all card items that DO NOT have that product id
    }
  });


  cart = newCart;
}

export let cart;

loadFromStorage();

export function loadFromStorage(){

  cart = JSON.parse(localStorage.getItem('cart')) ;
  //if storage is empty so it will give it the below default value
  if(!cart){
  
   cart =  [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:'2'
  }];
  }

}

//saving to local storage
function saveToStorage(){

  localStorage.setItem("cart", JSON.stringify(cart));
}



//this function is called on clicking add to cart in amazon.js file
export function addToCart(productId){

  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){ 
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantitySelect = /*1*/ Number(quantitySelector.value);
  //on testing this the jasmine test does not recognize the DOM selector
  //Thus it throws the .value as null
  //so when running test , change it to 1 for testing.
   
  if(matchingItem){ //it is an object of truthy value
   matchingItem.quantity += quantitySelect;
  }
  else{
    cart.push({
    productId : productId,
    quantity : quantitySelect,  
    deliveryOptionId:'1'
   });
  }

  saveToStorage();
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
  saveToStorage();
}


export function calculateCartQuantity(){

  let cartQuantity = 0;

  cart.forEach((cartItem)=>{

    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


export function updateQuantity(productId,newQuantity){

  let matchingItem;

  cart.forEach((cartItem)=>{

    if(productId === cartItem.productId){

      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();

}



export function updateDeliveryOption(productId,deliveryOptionId){

  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){ 
      matchingItem = cartItem;
    }
  });


  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();


}
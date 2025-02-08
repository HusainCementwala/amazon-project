
//THIS IS AN EXAMPLE OF OBJEC ORIENTED PROGRAMMING




function Cart(localStorageKey){ //PascalCase for things that generate objects

  const cart = {

    cartItems: undefined,
  
  
  
    loadFromStorage(){
  
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ;
      //if storage is empty so it will give it the below default value
      if(!this.cartItems){
      
        //this. gives us the outer object without explicitly saying the name of the outer object (ie cart)
        this.cartItems =  [{
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
    },
    //saving to local storage
  saveToStorage(){
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },
  
  
  
  //this function is called on clicking add to cart in amazon.js file
  addToCart(productId){ //shorthand method to write a fucntion
  if(!this.cartItems){

    this.loadFromStorage();
  }


    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){ 
        matchingItem = cartItem;
      }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    
    const quantitySelect = quantitySelector ? Number(quantitySelector.value) : 1;//// Default to 1 if selector is not found
    
    
    //const quantitySelect = /*1*/ Number(quantitySelector.value);
    //on testing this the jasmine test does not recognize the DOM selector
    //Thus it throws the .value as null
    //so when running test , change it to 1 for testing.
     
    if(matchingItem){ //it is an object of truthy value
     matchingItem.quantity += quantitySelect;
    }
    else{
      this.cartItems.push({
      productId : productId,
      quantity : quantitySelect,  
      deliveryOptionId:'1'
     });
    }
    this.saveToStorage(); //since function inside an object we need to access the outer object first through THIS
  },
  
  
  
  removeFromCart(productId){
  
    /*STEPS:
    1.create a new array
    2.loop through the cart
    3.Add each product to new array except for this productId*/
  
    const newCart = [];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem); //contain all card items that DO NOT have that product id
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  },
  
  
  calculateCartQuantity(){
  
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  },
  
  
  
  updateQuantity(productId,newQuantity){
  
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  },
  
  
  
  updateDeliveryOption(productId,deliveryOptionId){
  
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){ 
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
    
  
  };

  return cart;

}


const cart = Cart("cart-oop");

const businessCart = Cart("cart-business");
businessCart.addToCart("b86ddc8b-3501-4b17-9889-a3bad6fb585f");

cart.loadFromStorage();

console.log(cart);
console.log(businessCart);



















//this file gets all the products from data/products.js file and then it starts running


import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';

// '../' gets us out of current folder


let productsHTML = '';

products.forEach((product)=>{

  productsHTML +=` 
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)/*while displaying we convert back to dollars using fucntion in money.js file*/} 
          </div>

          <div class="product-quantity-container">
            <select 
            class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

        
});


console.log(productsHTML); //remove it afterwards

document.querySelector('.js-products-grid')
.innerHTML = productsHTML;

const addedMessageTimeouts = {}; //for the green pop message


function updateCartQuantity(){

  //Calculating total quantity in the cart for the shopping cart icon on right side

 const cartQuantity = calculateCartQuantity();
 //shifted the function to cart.js as it corresponds to it
 
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; 
    
}

updateCartQuantity();










/*********************************** */
//on clicking the add-to-cart button
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{

  button.addEventListener('click',()=>{
  const productId = button.dataset.productId;
  //or we can write = const {product} = button.dataset;

addToCart(productId); //since productId was defined outside funtion we pass it as parameter
//function in cart.js



const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');
//here we will display the green message using css style where we turn the opacity of message from 0 to 1 for 2 seconds

  // Check if there's a previous timeout for this
  // product. If there is, we should stop it.
  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);

  // Save the timeoutId for this product
  // so we can stop it later if we need to.
  addedMessageTimeouts[productId] = timeoutId;
  // the product-id  gets converted from kebab-case to camelCase.
//using Id instead of name because 2 products can have the same name but always a unique id

//we run below function after generating the class above 
updateCartQuantity(); //function just above

 });
});

/*
  Steps:
  1. attached product-name using data attribute (in notes).
  2. on clicking the button we got the productName out.
  3. we add product to the cart (in file data/cart.js).
  */
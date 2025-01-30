import {
  cart,
  removeFromCart,  
  calculateCartQuantity,
  updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


hello();

let cartSummaryHTML = '';


cart.forEach((cartItem)=>{

  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product)=>{

    if(product.id===productId){ //seeing if product id matches 
      matchingProduct = product; //uing id we have all info of that product which is an object stored in matchingProduct variable
    }
  });

  cartSummaryHTML+=`
 <div class="cart-item-container 
 js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label 
            js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingProduct.id}">
            Update
          </span>

          <input class="quantity-input js-quantity-input-${matchingProduct.id}">

          <span class="save-quantity-link link-primary js-save-link"
           data-product-id="${matchingProduct.id}">
          Save
          </span>


          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`


});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;


document.querySelectorAll(".js-delete-link")
.forEach((link)=>{
  link.addEventListener("click",()=>{
   /*on clicking DELETE WE NEED TO:
   1.remove the product from the cart
   2.update the html in backticks(``);
   */
  //for this we attached he product id to the element in the html above so that we know which product to delete 
  const productId = link.dataset.productId;
  removeFromCart(productId);  //caling the function from cart.js file


  //we added a new class to the main div in the above html
  const container = document.querySelector(`.js-cart-item-container-${productId}`);

  //this will remove the targeted html from the page on clicking delete of that specified button
 container.remove();

  updateCartQuantity();
  

  });

  
});




function updateCartQuantity(){


const cartQuantity = calculateCartQuantity();
//shifted the function to cart.js as it corresponds to it

document.querySelector(".js-return-to-home-link")
.innerHTML = `${cartQuantity} items`;


}

updateCartQuantity();




document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
       // Get the input field
       const quantityInput = container.querySelector(`.js-quantity-input-${productId}`);
      
       // Get the new quantity value (you can update your logic here)
       const newQuantity = Number(quantityInput.value);

       if(newQuantity < 0 || newQuantity >=1000){

        alert('Quantity must be at least 0 or less than 1000');

        return;
       }


       updateQuantity(productId,newQuantity);
 

       
      container.classList.remove('is-editing-quantity');




       const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

       quantityLabel.innerHTML  = newQuantity;
       //attaching the new quantity to the checkout in center
       
       updateCartQuantity()
 
       
     });
   });
import {
  cart,
  removeFromCart,  
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js'; //default export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //this is returning a function from external esm library
//the synax in dayjs is different as it is exported by DEFAULT  
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from  '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';



export function renderOrderSummary(){

let cartSummaryHTML = '';


  cart.forEach((cartItem)=>{

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId); 
    //this function is in products.js to get the particular product details

    const deliveryOptionId = cartItem.deliveryOptionId;


    const deliveryOption = getDeliveryOption(deliveryOptionId);
    //function in deliveryOptions.js

    

   
      const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML+=`
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          ${deliveryOptionsHTML(matchingProduct,cartItem)} 
          
        </div>
      </div>
    </div>`;


  });

  function deliveryOptionsHTML(matchingProduct, cartItem){

    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{

      
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
              <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `;//this code is generated here for each delivery option then put on page

    });

    return html;

  }




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


    renderPaymentSummary(); //regenerate the payment summary when we delete some item


    //we added a new class to the main div in the above html
    //const container = document.querySelector(`.js-cart-item-container-${productId}`);

    //this will remove the targeted html from the page on clicking delete of that specified button
  //container.remove();

  //INSTEAD OF ABOVE CODE WE REGENERATE THE HTML RATHER THAN DELETE THE DOM

  renderOrderSummary();

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
        
        
        updateCartQuantity();
        renderPaymentSummary(); //payment part refreshes on saving new value in UPDATE
       
        
  
        
      });
    });


    document.querySelectorAll(".js-delivery-option")
    .forEach((element)=>{

      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId} = element.dataset;
        //same as
        //const productId  = element.dataset.productId;
        updateDeliveryOption(productId,deliveryOptionId);

        renderOrderSummary(); //yes here
        //on switching between the radio buttons the whole page is rerun and refreshed 
        //this means deleting the pravious html on the page and readding it
        renderPaymentSummary();
        //payment part refrehhes on changing delivery date to accomodate delivery charges
      });

    });

  }


  renderOrderSummary(); //to change the values on multiple places in the page
  //we put the whole code in a function and called it 
  //EX the date on top of order has to change automatically on changing the delivery radio button
  //to do that we put the whole code on this page in a fucntion and then call it to run when 
  //1. when we arrive on this page(by the call above)
  //2. By calling it in the above event listener of the radio button {see there} means its calling itself or rerunning it(recursion)
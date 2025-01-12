//this file gets all the products from data/products.js file and then it starts running

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
            $${(product.priceCents / 100).toFixed(2)/*while displaying we convert back to dollars*/} 
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


console.log(productsHTML);

document.querySelector('.js-products-grid')
.innerHTML = productsHTML;

const addedMessageTimeouts = {}; //for he greem pop message


//on clicking the add-to-cart button
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{

  button.addEventListener('click',()=>{
 
   const productId = button.dataset.productId;
   //or we can write = const {product} = button.dataset;


   // the product-id on line 54 gets converted from kebab-case to camelCase.
   //using Id instead of name because 2 products can have the same name but always a unique id


   
  let matchingItem;

  cart.forEach((item)=>{
    if(productId === item.productId){
    
      matchingItem = item;

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

//Calculating total quantity in the cart for the shopping cart icon on right side
  let cartQuantity =0;

  cart.forEach((item)=>{
cartQuantity += item.quantity;
  });


  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity; //puttin the cart value on the icon


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




  /*
  Steps:
  1. attached product-name using data attribute (in notes).
  2. on clicking the button we got the productName out.
  3. we add product to the cart (in file data/cart.js).
  */
 });
});
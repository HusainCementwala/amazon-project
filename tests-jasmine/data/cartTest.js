import {  addToCart, cart, loadFromStorage } from "../../data/cart.js";


describe('test suite: add to cart',()=>{

  it('adds an existing product to the cart',()=>{


    spyOn(localStorage,'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      //this is done because jasmine needs everything in string format
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:1
      }]);
    });
    console.log(localStorage.getItem('cart')); //will return an empty array
    loadFromStorage();


    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    //testing on an existing id
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //to check how many times localstorage.setitem was called above
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

  });
 

  it('adds a new product to the cart',()=>{

    spyOn(localStorage,'setItem');
    
    //here we are creating a mock version of local storage
    //this is done to have full control over the test and its test cases
    spyOn(localStorage, 'getItem').and.callFake(()=>{

      //this is done because jasmine needs everything in string format
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart')); //will return an empty array
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    //testing on an existing id
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //to check how many times localstorage.setitem was called above
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

  });
});




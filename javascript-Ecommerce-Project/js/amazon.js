/*const products = [{
    image:"images/athletic-cotton-socks-6-pairs.jpeg",
    name:"Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating:{
        stars:4.5,
        count: 87
    },
    priceCents:1090
        
    
},
{
    image:"images/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating:{
        stars: 4,
        count: 127
    },
    priceCents: 2095
},
{
    image:"images/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name:"Adults Plain Cotton T-Shirt - 2 Pack",
    rating:{
        stars:4.5,
        count:56
    },
    priceCents:799
}
]*/

import { cart, addToCart, calculateCartQuandity } from "../data/cart.js";
import {products} from "../data/product.js"
import { formatCurrency } from "./utils/money.js";


let productsHtml="";
products.forEach((product)=>{
    productsHtml += `
    
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
              alt=""
            />
          </div>
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-star"
              src="images/rating/rating-${product.rating.stars * 10}.png"
              alt=""
            />
            <div class="product-rating-count">${product.rating.count}</div>
          </div>
          <div class="product-quandity-container">
            <select class="js-quandity-selector-${product.id}" name="" id="">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
          </div>

          <div class="product-price">$${formatCurrency(product.priceCents)}</div>
          
          <div>
            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img class="checkmark-img"src="images/icons/checkmark.jpg">
                Added
            </div>
            <button class="add-to-cart-button button-primary  js-add-to-cart" data-product-id="${product.id}">Add To Cart</button>
          </div>
        </div>
    
    `
})

console.log(productsHtml);



document.querySelector(".js-product-grid").innerHTML = productsHtml;


function updateCartItem(){
        const cartQuandity = calculateCartQuandity();
        document.querySelector(".js-cart-Quandity").innerHTML = cartQuandity;

}
updateCartItem();
document.querySelectorAll(".js-add-to-cart").forEach((button)=>{
   
    button.addEventListener('click',() =>{
       
         const productId = button.dataset.productId;

        /*cart.forEach((item)=>{
            if(productId === item.productId){
                matchingItem = item;
            }
        })

        const quanditySelector = document.querySelector(`.js-quandity-selector-${productId}`);
        const quandity = Number(quanditySelector.value);

        if(matchingItem){
            matchingItem.quandity += quandity;
        }else{
            cart.push({
            //productId:productId,
            //quandity:quandity
            productId,
            quandity
        });
        }*/

        /*let cartQuandity = 0;
        cart.forEach((cartItem)=>{
            cartQuandity += cartItem.quandity;
        })*/
       addToCart(productId);
       updateCartItem();
       console.log(cart);
       //console.log(cartQuandity);
       
       const addedMsg = document.querySelector(`.js-added-to-cart-${productId}`)
       addedMsg.classList.add('added-to-cart-visibile');

       setTimeout(()=>{
        addedMsg.classList.remove('added-to-cart-visibile');
       },2000);
     })
})



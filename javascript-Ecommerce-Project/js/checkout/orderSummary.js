import { calculateCartQuandity, cart,removeFromCart, updateQuandity, updateDeliveryOption } from "../../data/cart.js"; 

import { getProduct, products } from "../../data/product.js";
//import { updateCartItem } from "./amazon.js";
import { formatCurrency } from "../utils/money.js"; 
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOptionId, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckOutHeader } from "./checkoutHeader.js";
//mport {cart, removeFromCart, updateDeliveryOption, updateQuandity} from '../../data/cart.js';




export function renderOrderSummary(){




        let cartSummary = '';
        cart.forEach((cartItem) =>{
            const productId = cartItem.productId;
            const matchingProduct = getProduct(productId)

            

            console.log(matchingProduct);


            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOptionId(deliveryOptionId);

            /*const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const deliveryString = deliveryDate.format('dddd, MMMM D');*/
            const dateString = calculateDeliveryDate(deliveryOption);
            cartSummary += `

                <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                        Delivery date: ${dateString}
                    </div>
                    <div class="cart-item-details-grid">
                        <div class="product-image1">
                            <img class="product-image" src="${matchingProduct.image}">
                        </div>
                        <div class="cart-item-detail">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                
                            $${formatCurrency(matchingProduct.priceCents)}
                            </div>
                            <div class="product-quandity">
                                Quandity:<span class="quandity-label js-quantity-label-${matchingProduct.id}">${cartItem.quandity}</span>
                                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
                                <input class="quandity-input js-quantity-input-${matchingProduct.id}">
                                <span class="save-quandity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                                
                            </div>

                            
                        </div>

                        <div class="delivery-options">
                            <div class="delivery-option-title">
                                Choose a delivery option:
                            </div>
                        
                                    
                            ${deliveryOptionsHTML(matchingProduct, cartItem)}   
                        
                            
                        </div>
                        
                    </div>
                </div>
        `;
                                
        });




        function deliveryOptionsHTML(matchingProduct, cartItem){
            let html = '';
            deliveryOptions.forEach((deliveryOption)=>{

                

                /*const today = dayjs();
                const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
                const deliveryString = deliveryDate.format('dddd, MMMM D');*/

                const dateString = calculateDeliveryDate(deliveryOption);

                const priceString = deliveryOptions.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`;
                const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
                html +=
                `
                            <div class="delivery-option js-delivery-option" 
                            data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                                    <input type="radio" 
                                            ${isChecked? 'Checked':''}
                                            name="${matchingProduct.id}" 
                                            class="delivery-option-input">
                                    <div>
                                        <div class="delivery-option-date">
                                        
                                            ${dateString}
                                        </div>
                                        <div class="delivery-option-price">
                                                ${priceString} - Shipping
                                        </div>
                                    
                                    </div>
                                    
                                
                            </div>
                            

                
                `
            });

            return html;
        }
            
            document.querySelector(".js-order-summary").innerHTML = cartSummary;
            //console.log(document.querySelector(".js-order-summary").innerHTML);


            document.querySelectorAll('.js-delete-link')
            .forEach((link)=>{
                link.addEventListener('click', ()=>{
                    const productId = link.dataset.productId;
                    console.log(productId);
                    removeFromCart(productId);
                    console.log(cart);
                    //const container = document.querySelector(`.js-cart-item-container-${productId}`);
                    //container.remove();
                    //updatecartQuandity();
                    renderCheckOutHeader();
                    renderOrderSummary();
                    renderPaymentSummary();
                })

                

                
            });


            /*function updatecartQuandity(){
                const cartQuandity = calculateCartQuandity();

                document.querySelector(".js-return-link-home-page").innerHTML = `${cartQuandity}Items`;

            }*/
            //updatecartQuandity();

            document.querySelectorAll(".js-update-link").forEach((link)=>{
                link.addEventListener('click', ()=>{
                    const productId = link.dataset.productId;
                    const container = document.querySelector(`.js-cart-item-container-${productId}`);
                    container.classList.add('is-editing-quandity');
                
                });
            });

            /*  
            
            
            
            */ 

            document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            /*const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.remove('is-editing-quantity');*/
            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            );
            const newQuandity = Number(quantityInput.value);

            if (newQuandity < 0 || newQuandity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
            
            updateQuandity(productId, newQuandity);
            //console.log(newQuantity);

            /*const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.remove('is-editing-quantity');


            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuandity;

            //updatecartQuandity();*/

        renderCheckOutHeader();
        renderOrderSummary();
        renderPaymentSummary();

            
            });
        });


        /*

        
        
        */ 

        document.querySelectorAll('.js-delivery-option')
        .forEach((element) =>{
            element.addEventListener('click', ()=>{
                const productId = element.dataset.productId;
                const deliveryOptionId = element.dataset.deliveryOptionId;
                //const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId)
                renderOrderSummary();

                renderPaymentSummary();
            });
        })

}


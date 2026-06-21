import { cart } from "../../data/cart.js";

export function renderCheckOutHeader(){
    let cartQuandity = 0;
    cart.forEach((cartItem) => {
        cartQuandity += cartItem.quandity;

        
    });

    const checkOutHeaderHtml = `
    
        <div class="checkout-header">
            <div class="check-out-header-left-section">
                <a href="amazon.html">
                    <img class="amazon-logo-BLACK" src="images/icons/amazon-logo-black.png" alt="">
                    <img class = "amazon-mobile-logo" src="images/icons/amazon-mobile-logo-black.png">
                </a>
            </div>
            <div class="check-out-header-middle-section">
                Checkout(<a class="return-link-home-page js-return-link-home-page" href="amazon.html">${cartQuandity} items</a>)
            </div>
             <div class="check-out-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    
    
    
    `;

    document.querySelector('.js-checkout-header').innerHTML = checkOutHeaderHtml;
}
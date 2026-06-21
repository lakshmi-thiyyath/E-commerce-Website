




export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quandity:2,
        deliveryOptionId:'1'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quandity:1,
        deliveryOptionId:'2'
    }
];

}










function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                 matchingItem = cartItem;
            }
        });

        const quanditySelector = document.querySelector(`.js-quandity-selector-${productId}`);
       
        const quandity = Number(quanditySelector.value);
        

        if(matchingItem){
            matchingItem.quandity += quandity;
        }else{
            cart.push({
            //productId:productId,
            //quandity:quandity
            productId,
            quandity,
            deliveryOptionId : '1'
        });
        }
       
        saveToStorage();
}


export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;

    saveToStorage();

    
    
}


export function calculateCartQuandity(){
    let cartQuandity = 0;
    cart.forEach((cartItem)=>{
        cartQuandity += cartItem.quandity;
    });
    return cartQuandity;

    

}



export function updateQuandity(productId, newQuandity){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
             matchingItem = cartItem;
             
        }
    });

    matchingItem.quandity = newQuandity;
   saveToStorage();
        
}


export function updateDeliveryOption(productId, deliveryOptionId){
     let matchingItem;
     cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
             matchingItem = cartItem;
             
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
 
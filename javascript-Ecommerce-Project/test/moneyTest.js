import formatCurrency from "../js/utils/money.js";


console.log("Test Suite: formatCurrency");

console.log("Converts Cents into Dollars");

if(formatCurrency(2095)==='20.95'){
    console.log("Passed");

}else{
    console.log('Failed');
}


console.log("Work with 0");

if(formatCurrency(0)==='0.00'){
    console.log("Passed");

}else{
    console.log('Failed');
}

console.log("Round up to the nearest cents");

if(formatCurrency(2000.5)==='20.01'){
    console.log("Passed");

}else{
    console.log('Failed');
}

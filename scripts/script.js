let bill = document.querySelector("#check-bill");
let errorBill = document.querySelector("#error-bill");

let peopleNum = document.querySelector("#people-num");
let errorPeopleNum = document.querySelector("#error-people-num");


let totalPersonResult = document.querySelector("#total-person-result");

let tipResult = document.querySelector("#tip-amount-result");

let tipPercentage = document.querySelector("#percentages");
let customPercentageField = document.querySelector("#custom-perc");
    
let resetButton = document.querySelector("#reset");






let dollarSign = `<img src="./images/icon-dollar-cyan.svg" alt="icon-dollar">`;
/* ALL VARIABLES */


/* BILL FUNCTION */
let billPermitted;
bill.addEventListener("input", function(){

    
    let billValue = Number(bill.value);
    
    if(Number.isNaN(billValue)) {
        bill.classList.add("red-border");
        errorBill.classList.add("error-active");
        errorBill.innerHTML = "Please input number";
        billPermitted = false;
    } else if(billValue <= 0) {
        bill.classList.add("red-border");
        errorBill.classList.add("error-active");
        errorBill.innerHTML = "Must be positive";
        billPermitted = false;
    } else if(billValue > 100000000){
        bill.classList.add("red-border");
        errorBill.classList.add("error-active");
        errorBill.innerHTML = "To big to compute";
        billPermitted = false;
    } else {
        bill.classList.remove("red-border");
        errorBill.classList.remove("error-active");
        billPermitted = true;
        splitter();
    }
    
    
});
/* BILL FUNCTION */

/* PERCENTAGES BUTTONS */
let active;
tipPercentage.addEventListener("click", function(){
    customPercentageField.classList.remove("active");
    if(event.target != tipPercentage && event.target != customPercentageField) {
        
    if(active) {
        if(active == event.target) {
            event.target.classList.toggle("active");
            active = 0;
            customPercentageField.classList.add("active");
            splitter();
            return;
        }
        active.classList.remove("active");
        
    }
    event.target.classList.toggle("active");
    customPercentageField.classList.remove("active");
    active = event.target;
    splitter();
}
});


let customPerc;
let  customPercPermitted;
customPercentageField.addEventListener("input", function(){
     customPerc = Number(customPercentageField.value);
     if(customPercentageField.value) {
         if(Number.isNaN(customPerc) || customPerc <= 0) {
            customPercentageField.classList.add("red-border");
            customPercentageField.classList.add("red-text");
            customPercentageField.classList.remove("active");
            customPercPermitted = false;
         } else {
            customPercentageField.classList.remove("red-border");
            customPercentageField.classList.remove("red-text");
            customPercentageField.classList.add("active");
            customPercPermitted = true;
            splitter();
         }
        
     } else {
        customPercentageField.classList.remove("red-border");
        customPercentageField.classList.remove("red-text");
        customPercentageField.classList.remove("active");
     }
  
})
/* PERCENTAGES BUTTONS */

/* PEOPLE NUMBER FUNCTION */

let peopleNumPermitted;
peopleNum.addEventListener("input", function(){

    let peopleNumValue = Number(peopleNum.value);

    if(Number.isNaN(peopleNumValue)) {
        peopleNum.classList.add("red-border");
        errorPeopleNum.classList.add("error-active");
        errorPeopleNum.innerHTML = "Please input number";
        peopleNumPermitted = false;
        
    } else if(peopleNumValue <= 0) {
        peopleNum.classList.add("red-border");
        errorPeopleNum.classList.add("error-active");
        errorPeopleNum.innerHTML = "Must be positive";
        peopleNumPermitted = false;
    } else if(peopleNumValue > 1000) {
        peopleNum.classList.add("red-border");
        errorPeopleNum.classList.add("error-active");
        errorPeopleNum.innerHTML = "To big to compute";
        peopleNumPermitted = false;
    } else {
        peopleNum.classList.remove("red-border");
        errorPeopleNum.classList.remove("error-active");
        peopleNumPermitted = true;
        splitter();
    }
    
    
});
/* PEOPLE NUMBER FUNCTION */

/* MAIN FUNCTION SPLITTER*/
function splitter() {
    if(billPermitted && peopleNumPermitted) {

    

    let output;
    
    if(peopleNum.value >= 1) {
        console.log(bill.value / peopleNum.value);
        
        let result = bill.value / peopleNum.value;
         output = result.toFixed(2);
         totalPersonResult.innerHTML = dollarSign + Number(output);
         tipResult.innerHTML = dollarSign + "0.00";
    }
    
    if(customPercPermitted) {
        if(!peopleNum.value) {
            return;
        }
        let resultingTip = ((bill.value * customPerc) / 100) / peopleNum.value;
        tipResult.innerHTML = dollarSign + resultingTip.toFixed(2);
    }
    if(active) {
        if(!peopleNum.value) {
            return;
        }
        let resultingTip = ((bill.value * Number(active.classList[0])) / 100) / peopleNum.value;
        tipResult.innerHTML = dollarSign + resultingTip.toFixed(2);
    }


    resetButtonActive();
}
};
/* MAIN FUNCTION SPLITTER*/

/* RESET BUTTON*/
function resetButtonActive() {
    resetButton.classList.add("active");
    resetButton.addEventListener("click", function() {

        tipResult.innerHTML = dollarSign + "0.00";
        totalPersonResult.innerHTML = dollarSign + "0.00";
        bill.value = '';
        bill.classList.remove("red-border");
        errorBill.classList.remove("error-active");
        peopleNum.value = '';
        peopleNum.classList.remove("red-border");
        errorPeopleNum.classList.remove("error-active");
        customPercentageField.value = '';
        customPercentageField.classList.remove("red-border");
        customPercentageField.classList.remove("red-text");
        customPercentageField.classList.remove("active");

        if(active) {
            active.classList.remove("active");
        }
        resetButton.classList.remove("active");
    })
}
/* RESET BUTTON*/
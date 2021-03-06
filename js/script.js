//global variables
const userName = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-title');
const jobRole = document.querySelector('#title');
const tShirttheme = document.querySelector('#design');
const tShirtThemeElements = document.querySelectorAll('#design option');
const tShirtColor = document.querySelector('#color');
const tShirtColorElements = document.querySelectorAll('#color option');
const activitySection = document.querySelector('.activities');
const activities = document.querySelectorAll('.activities input');
const paymentMethod = document.querySelector('#payment');
const paymentOptions = document.querySelectorAll('#payment option');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const form = document.querySelector('form');
let activityTotalCost = 0;
const option = document.createElement('option');
let activityCost = document.createElement('activityCost');
//basic info

//sets focus to the first text field on page upload
//hides colors for tshirt theme
window.onload = function () {
  userName.focus();
  hideColors();
}

//job role
//hides "other" job role text inpu initially and only displays it when other is selected
otherJobRole.style.display = 'none';
jobRole.addEventListener('change', (e) => {
  if(event.target.value === 'other'){
    otherJobRole.style.display = 'block';
  }else {
    otherJobRole.style.display = 'none';
  }
})

//T-shirt
//hides "select theme" 'option' element in the 'design' menu
tShirtThemeElements[0].style.display = 'none';
//updates color field to read 'please select t-shirt theme'
option.text = 'Please select a T-shirt theme';
tShirtColor.add(option, tShirtColor[0]);
option.selected = true;

//hides the colors in the 'color' drop down menu
const hideColors = () => {
  const tShirtColorElements = document.querySelectorAll('#color option');
  for (let i = 0; i < tShirtColorElements.length; i++){
    tShirtColorElements[i].style.display = 'none';
  }
};

//changes the color field element to show the appropiate color for the tshirt Theme
tShirttheme.addEventListener('change', (e) => {
  hideColors();
  if(event.target.value === 'js puns'){
    tShirtColorElements[0].selected = true;
    for(let i = 0; i < tShirtColorElements.length; i++){
      if(i >= 3){
        tShirtColorElements[i].style.display = 'none';
      } else {
        tShirtColorElements[i].style.display = 'block';
      }
    }
  }if(event.target.value === 'heart js'){
    tShirtColorElements[3].selected = true;
    for(let i = 0; i < tShirtColorElements.length; i++){
      if(i <= 2){
        tShirtColorElements[i].style.display = 'none';
      } else {
        tShirtColorElements[i].style.display = 'block';
      }
    }
  }
});

//activity Section
//creates an element to display total activity cost
activityCost.innerHTML = 'Total Cost';
activitySection.appendChild(activityCost);
//change event listener for activity Section
activitySection.addEventListener('change', (e) => {
  let target = event.target;
  //gets the data-cost attribute value and changes data-cost string into a interger
  let cost = parseInt(target.getAttribute('data-cost'), 10);
  //gets the data-day-and-time getAttribute value
  let activityDateAndTime = target.getAttribute('data-day-and-time');
  //for loop iterates checkbox inputs
  for(let i = 0; i < activities.length; i++){
    let activityTimes = activities[i].getAttribute('data-day-and-time');
    //console.log(activityTimes);
    //checks for conflicting dates and times disables if conflicting
    if(activityTimes === activityDateAndTime && target !== activities[i]){
      if(target.checked){
        activities[i].disabled = true;
        } else {
          activities[i].disabled = false;
      }
    }
  }
  //adds and subtracts total costs
  if(target.checked){
    activityTotalCost = activityTotalCost += cost;
  } else {
      activityTotalCost = activityTotalCost -= cost;
  }
  activityCost.innerHTML = 'Total: $' + activityTotalCost;
})

//payment Section
//hide the select payment payment payment option
paymentOptions[0].style.display = 'none';
//initially displays the credit card payment option
paymentOptions[1].selected = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';
paymentMethod.addEventListener('change', (e) => {
  let target = event.target;
  if(target.value === "credit card"){
    creditCard.style.display = 'block';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } if(target.value === "paypal"){
    paypal.style.display = 'block';
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
  } if(target.value === "bitcoin"){
    bitcoin.style.display = 'block';
    paypal.style.display = 'none';
    creditCard.style.display = 'none';
  }
})

//validation
//name validation
function validateName() {
  const nameValue = userName.value;
  if(nameValue.length > 0){
    userName.style.borderColor = '';
    return true;
  } else{
    userName.style.borderColor = 'red';
    userName.focus();
    return false;
  }
}

//email validation
const email = document.querySelector('#mail');
function validateEmail() {
  const emailValue = email.value;
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)){
    email.style.borderColor = '';
    return true;
  } else{
    email.style.borderColor = 'red';
    return false;
  }
}

//activity validation
function validateActivities() {
  let flag = false;
  for(let i = 0; i < activities.length; i++){
    if(activities[i].checked){
      activitySection.style.color = '';
      flag = true;
    }
  }
  if(flag === false) {
    activitySection.style.color = 'red';
  }
  return flag;
}

//credit card validation(if payment method is credit card) valid credit card number should be 16 digits
function validateCreditCardNumber() {
  const creditCardNumber = document.querySelector('#cc-num');
  const yourCreditCardNumber = creditCardNumber.value;
  if(paymentMethod.value === 'credit card'){
    if(/^\d{13,16}$/.test(yourCreditCardNumber)){
      creditCardNumber.style.borderColor = '';
      return true;
    } else {
      creditCardNumber.style.borderColor = 'red';
      return false;
    }
  }
}

//zip code valid zip code should be 5 digits
function validateZipCode() {
  const zipCode = document.querySelector('#zip');
  const yourZip = zipCode.value;
  if(paymentMethod.value === 'credit card'){
    if(/^\d{5}$/.test(yourZip)){
      zipCode.style.borderColor = '';
      return true;
    } else {
      zipCode.style.borderColor = 'red';
      return false;
    }
  }
}

//cvv valid cvv should be 3 digits
function validateCvv() {
  const cvv = document.querySelector('#cvv');
  const yourCvv = cvv.value;
  if(paymentMethod.value === 'credit card'){
    if(/^\d{3}$/.test(yourCvv)){
      cvv.style.borderColor = '';
      return true;
    } else {
      cvv.style.borderColor = 'red';
      return false;
    }
  }
}

//event listener on register button calls all validation functions
form.addEventListener('submit', (e) => {
  if(! validateName()){
    e.preventDefault();
  }
  if(! validateEmail()){
    e.preventDefault();
  }
  if(! validateActivities()){
    e.preventDefault();
  }
  if(paymentMethod.value === 'credit card' && ! validateCreditCardNumber()){
    e.preventDefault();
  }
  if(paymentMethod.value === 'credit card' &&! validateZipCode()){
    e.preventDefault();
  }
  if(paymentMethod.value === 'credit card' && ! validateCvv()){
    e.preventDefault();
  }
})

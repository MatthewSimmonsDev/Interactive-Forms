// Project 3: Javascript forms

// Focus on Name element when first load
function focusOnName(){
  const nameText = document.querySelector('#name');
  nameText.focus();
}

// function to hide and show 'other' text field in Job Role
function hideShowOtherJobRole(){
  const otherJobRole = document.querySelector('#other-job-role');
  const optionSelectors = document.querySelector('#title');
  let activeOrInactive = false;
  
  // hide 'other' job role on load
  function activeInactive(){
    if(!activeOrInactive) {
      otherJobRole.style.display = 'none';
      }
    }
   
    activeInactive();
// on select change, hide or show 'other' field
    optionSelectors.addEventListener('change', () => {
      if(optionSelectors.value === 'other'){
        otherJobRole.style.display = 'inline';
      } else{
        activeInactive();
      }
    })

}

// T-shirt Info section
// Sets which colors are visible based on shirt type
function colorEnableDisable(){
  const color = document.querySelector('#color');
  const design = document.querySelector('#design');
  const colorOptions = color.children;
  color.disabled = true;

  design.addEventListener('change', (e) => {
    color.disabled = false;

    for (let i = 0; i < colorOptions.length; i++){
      targetValue = e.target.value;
      dataTheme = colorOptions[i].getAttribute('data-theme');
      
      if(targetValue === dataTheme){
        colorOptions[i].hidden = false;
        colorOptions[i].selected = true;
      }else{
        colorOptions[i].hidden = true;
        colorOptions[i].selected = false;
      }
    }
    
  })
}

// Register for activities section
// totals all cost values for lectures
function activityTotalCost(){
  const totalCost = document.querySelector('#activities-cost');
  const registerForActivities = document.querySelector('#activities');
  
  registerForActivities.addEventListener('change', (e) => {
    const activities = document.querySelectorAll('.activity-cost');
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    let sumTotal = 0;
    let stringTotal = 0;
    for (let activity in activities){
      if(checkboxes[activity].checked){
        let stringTotal = parseInt(activities[activity].textContent.replace('$',''));
        sumTotal += stringTotal;
      } else if(!checkboxes[activity].checked) {
        sumTotal -= stringTotal;
      }
      totalCost.textContent = 'Total: $' + sumTotal;
    }

    // Disable same time activity selections
    for (let i = 0; i < checkboxes.length; i++){
      const spanSibling = checkboxes[i].nextElementSibling.nextElementSibling.textContent;
      const targetTextContent = e.target.nextElementSibling.nextElementSibling.textContent;
      if(e.target.checked){
        if(e.target !== checkboxes[i] && spanSibling === targetTextContent){
          checkboxes[i].disabled = true;
          checkboxes[i].parentElement.classList.add('disabled');
        }
        }else {
        checkboxes[i].disabled = false;
        checkboxes[i].parentElement.classList.remove('disabled');
      }

    }

  })
}

// Payment Info section
function paymentInfo(){
  // set credit card to automatically selected 
  const paymentMethods = document.querySelectorAll('#payment option');
  const creditCard = document.querySelector('#credit-card');
  const paypal = document.querySelector('#paypal');
  const bitcoin = document.querySelector('#bitcoin');
  const payment = document.querySelector('#payment');
  for(let payment in paymentMethods){
    if(paymentMethods[payment].value === 'credit-card'){
      paymentMethods[payment].selected = true;
      paypal.hidden = true;
      bitcoin.hidden = true;
    }else if(paymentMethods[payment].value!== 'credit-card'){
      paymentMethods[payment].selected = false;
    }
  }

  // Hide non-used selections of payment options
  payment.addEventListener('change', (e) => {
    if(e.target.value === 'credit-card'){
      creditCard.hidden = false;
      paypal.hidden = true;
      bitcoin.hidden = true;
    }else if(e.target.value === 'paypal'){
      creditCard.hidden = true;
      paypal.hidden = false;
      bitcoin.hidden = true;
    }else if(e.target.value === 'bitcoin'){
      creditCard.hidden = true;
      paypal.hidden = true;
      bitcoin.hidden = false;
    }
  })
}

// Form Validation

// Name Validation
function nameValidate(){
  const nameField = document.querySelector('#name');
  return nameField.value === '' || nameField.value.indexOf(' ') >= 0 ? false : true
}

// Email Validation
function emailValidate(){
  const email = document.querySelector('#email');
  // regex for email
  let regEx = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/
  return regEx.test(email.value) ? true : false
}

function emailConditionalValidation(element){
  const email = document.querySelector('#email');
  const emailHint = document.querySelector('#email-hint');
  const regExEmpty = /^\s*$/.test(email.value);
  const regExInvalid = /^[^@]+\@[^@.]+\.com$/i.test(email.value);
  const elParent = element.parentElement;
  const elPChild = elParent.lastElementChild;
  
  if(regExEmpty){
    emailHint.textContent = 'Email cannot be blank';
    elParent.classList.add('.not-valid');
    elParent.classList.remove('.valid');
    elPChild.style.display = 'inline';
  } else if (!regExInvalid){
    emailHint.textContent = 'Email must contain an "@" and a "."'
    elParent.classList.add('.not-valid');
    elParent.classList.remove('.valid');
    elPChild.style.display = 'inline';
  } else if(!regExEmpty){
    elParent.classList.add('.valid');
    elParent.classList.remove('.not-valid');
    elPChild.style.display = 'none';
  }else if (regExInvalid){
    elParent.classList.add('.valid');
    elParent.classList.remove('.not-valid');
    elPChild.style.display = 'none';
  }
}

// Activities Validation
function activitiesValidate(){
  const activitiesBoxes = document.querySelectorAll('input:checked');
  return activitiesBoxes.length === 0 ? false : true
}

// Credit Card Validation
function creditCardValidate(){
  const cardNumber = document.querySelector('#cc-num').value;
  const ccToString = cardNumber.toString();
  return ccToString.length >= 13 && ccToString.length <= 16 ? true : false
}
// Zip Code Validation 
function zipCodeValidate(){
  const zipCode = document.querySelector('#zip').value;
  const zipToString = zipCode.toString();
  return zipToString.length === 5 ? true : false
}
// CVV Validation 
function cvvValidation(){
  const cvv = document.querySelector('#cvv').value;
  const cvvToString = cvv.toString();
  return cvvToString.length === 3 ? true : false;
  
}

// Helper function to remove validation
function removeValidation(element){
  elParent = element.parentElement;
  elPChild = elParent.lastElementChild;
  elParent.classList.add('.not-valid');
  elParent.classList.remove('.valid');
  elPChild.style.display = 'inline';
}
// Helper function to add validation
function addValidation(element){
  elParent = element.parentElement;
  elPChild = elParent.lastElementChild;
  elParent.classList.add('.valid');
  elParent.classList.remove('.not-valid');
  elPChild.style.display = 'none';
}

// Validates form elements using helper functions above
function formValidation(){
  const pageForm = document.querySelector('form');
  const nameElement = document.querySelector('#name');
  const emailElement = document.querySelector('#email');
  const activities = document.querySelector('#activities-box');
  const creditCard = document.querySelector('#cc-num');
  const zipCode = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');
  
  pageForm.addEventListener('submit', (e) => {

    if(!nameValidate()){
      removeValidation(nameElement)
      e.preventDefault();
    }else if (nameValidate){
      addValidation(nameElement);
    }
    if (!emailValidate()){
      removeValidation(emailElement);
      e.preventDefault();
    }else if(emailValidate){
      addValidation(emailElement);
    }
    if(!activitiesValidate()){
      removeValidation(activities);
      e.preventDefault();
    }else if(activitiesValidate){
      addValidation(activities);
    }
    if(!creditCardValidate()){
      removeValidation(creditCard);
      e.preventDefault();
    }else if(creditCardValidate){
      addValidation(creditCard)
    }
    if(!zipCodeValidate()){
      removeValidation(zipCode);
      e.preventDefault();
    }else if(zipCodeValidate()){
      addValidation(zipCode);
    }
    if(!cvvValidation()){
      removeValidation(cvv);
      e.preventDefault();
    } else if (cvvValidation()){
      addValidation(cvv);
    }

  })

  nameElement.addEventListener('keyup', () =>{
    if(!nameValidate()){
      removeValidation(nameElement);
    } else {
      addValidation(nameElement);
    }
  })

  emailElement.addEventListener('keyup', () => {
    emailConditionalValidation(emailElement);
    
  })
}

// Accessibility changes focus on label of checkboxes
function Accessibility(){
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (let i = 0; i < checkboxes.length; i++){
    const parentLabel = document.querySelectorAll('input[type=checkbox]')[i].parentElement;
    checkboxes[i].addEventListener('focus', (e) => {
      if (e.target.focus) {
        parentLabel.classList.add('.focus');
      }
    })

    checkboxes[i].addEventListener('blur', (e) => {
      if (e.target.blur){
        parentLabel.classList.remove('.focus')
      }
    })
  }
}


// Function Calls

focusOnName();
hideShowOtherJobRole();
colorEnableDisable();
activityTotalCost();
paymentInfo();
formValidation();
Accessibility();
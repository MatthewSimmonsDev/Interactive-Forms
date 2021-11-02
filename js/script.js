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

  // const shirtDesigns = document.querySelector('#shirt-designs');
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
  
  registerForActivities.addEventListener('change', () => {
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

  // Hide non-used selections

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
  return nameField.value === '' ? false : true
}

function removeValidation(element){
  elParent = element.parentElement;
  elPChild = elParent.lastElementChild;
  elParent.classList.add('.not-valid');
  elParent.classList.remove('.valid');
  elPChild.style.display = 'inline';
}

// Email Validation
function emailValidate(){
  const email = document.querySelector('#email');
  // regex for email
  let regEx = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/
  return regEx.test(email.value) ? true : false
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
  const zipCode = document.querySelector('#zip').value;
  const zipToString = zipCode.toString();
  const cvv = document.querySelector('#cvv').value;
  const cvvToString = cvv.toString();

  if(ccToString.length >= 13 && ccToString.length <= 16 && zipToString.length === 5 && cvvToString.length === 3){
    return true;
  }else {
    return false;
  }
}

function formValidation(){
  const pageForm = document.querySelector('form');
  
  pageForm.addEventListener('submit', (e) => {
    nameElement = document.querySelector('#name');
    emailParentElement = document.querySelector('#email').parentElement;
    activitiesParent = document.querySelector('#activities');
    creditCardParent = document.querySelector('#cc-num').parentElement;
    zipCodeParent = document.querySelector('#zip').parentElement;
    cvvParent = document.querySelector('#cvv').parentElement;

    if(!nameValidate()){
      // nameElementParent.classList.add('.not-valid');
      // nameElementParent.classList.remove('.valid')
      // const nameHint = nameElementParent.lastElementChild;
      // nameHint.style.display = 'inline';
      removeValidation(nameElement)
      e.preventDefault();
    }else if (nameValidate){
      nameElementParent.classList.add('.valid');
      nameElementParent.classList.remove('.not-valid')
    }
    if (!emailValidate()){
      emailParentElement.classList.add('.not-valid');
      emailParentElement.classList.remove('.valid');
      e.preventDefault();
    }else if(emailValidate){
      emailParentElement.classList.add('valid');
      emailParentElement.classList.remove('.not-valid');
    }
    if(!activitiesValidate()){
      activitiesParent.classList.add('.not-valid')
      activitiesParent.classList.remove('.valid');
      e.preventDefault();
    }
    if(!creditCardValidate()){
      // CC number
      creditCardParent.classList.add('.not-valid');
      creditCardParent.classList.remove('.valid');
      // zip code
      zipCodeParent.classList.add('.not-valid');
      zipCodeParent.classList.remove('.valid');
      // cvv 
      cvvParent.classList.add('.not-valid');
      cvvParent.classList.remove('.valid');

      e.preventDefault();
    }

  })
}

// Accessibility
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
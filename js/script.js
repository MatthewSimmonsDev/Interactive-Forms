// Project 3: Javascript forms

// Focus on Name element when first load
function focusOnName(){
  const nameText = document.querySelector('#name');
  nameText.focus();
}

// function to hide and show 'other' text field
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

// Function Calls

focusOnName();
hideShowOtherJobRole();
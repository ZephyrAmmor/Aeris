const emailInput = document.querySelector('#email')
const countryInput = document.querySelector('#country')
const postalCode = document.querySelector('#postal')
const passwordInput = document.querySelector('#password')
const confirmInput = document.querySelector('#password2')
const emailError = document.querySelector('#email + span.error')
const countryError = document.querySelector('#country + span.error')
const postalError = document.querySelector('#postal + span.error')
const passwordError = document.querySelector('#password + span.error')
const confirmError = document.querySelector('#password2 + span.error')
let postalData = null; // Initialize postalData

fetch('./postal-codes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    postalData = data; // Assign the parsed data to postalData
    // Now you can use postalData here or in other functions that rely on it
    console.log('Postal data loaded:', postalData);
  })
  .catch(error => {
    console.error('Error fetching postal data:', error);
  });

emailInput.addEventListener('input', () => {
    console.log('Hello')
    if (emailInput.validity.valid) {
        emailError.textContent = ''
        emailError.className = 'error'
    } else {
        showEmailError()
    }
})

countryInput.addEventListener('input', () => {
    if (countryInput.validity.valid) {
        countryError.textContent = ''
        countryError.className = 'error'
    } else {
        showCountryError()
    }
})

postalCode.addEventListener('input', () => {
    if (postalCodeIsValid()) {
        postalCode.classList.remove('invalid')
        postalCode.classList.add('valid')
        postalError.textContent = ''
        postalError.className = 'error'
    } else {
        showPostalError()
    }
})
passwordInput.addEventListener('input', () => {
    if (passwordInput.validity.valid) {
        passwordError.textContent = ''
        passwordError.className = 'error'
    } else {
        showPasswordError()
    }
})
confirmInput.addEventListener('input', () =>{
    if (confirmInput.validity.valid) {
        confirmError.textContent = ''
        confirmError.className = 'error'
    } else {
        showConfirmError()
    }
})

function showEmailError() {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "You need to Enter an Email address❗"
        console.log('Empty')
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Entered Value need to be a valid Email address."
    } else if (emailInput.validity.tooShort) {
        emailError.textContent = `Email should be at least ${emailInput.minLength}`
    }
    emailError.className = 'error active'
}

function showCountryError () {
    if (countryInput.validity.valueMissing) {
        countryError.textContent = 'You need to select a country.'
    }
    countryError.className = 'error active'
}

function showPostalError () {
    if (postalCode.validity.valueMissing) {
        postalError.textContent = 'Postal code should not be empty'
    } else if (!postalCodeIsValid()) {
        postalError.textContent = 'Choose the right country or recheck your postal code'
        postalCode.classList.add('invalid')
        postalCode.classList.remove('valid')
    }
    postalError.className = 'error active'
}
function showPasswordError () {
    if (passwordInput.validity.valueMissing) {
        passwordError.textContent = "You must Enter a password"
    } else if (passwordInput.validity.tooShort) {
        passwordError.textContent = `Password should be at least as long as ${passwordInput.minLength}`
    }
    passwordError.className = 'error active'

}
function showConfirmError () {
    if (confirmInput.validity.valueMissing) {
        confirmError.textContent = 'You must Re Enter password.'
    } else if (confirmInput.value !== passwordInput.value) {
        confirmError.textContent = "Both passwords don't match"
        confirmInput.classList.replace('valid', 'invalid')
    } else if (confirmInput.validity.tooShort) {
        confirmError.textContent = `Password is too short`
    }
    confirmError.className = 'error active'
}

function postalCodeIsValid () {
    if (countryInput.value) {
        const postalCodeData = postalData.filter(postal => postal.ISO === countryInput.value)
        console.log(postalCodeData)
        const regex = new RegExp(postalCodeData[0].Regex)
        console.log(regex, postalCodeData[0].Regex)
        if (postalCodeData && regex.exec(postalCode.value)) {
            console.log('how')
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
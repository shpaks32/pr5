const buttonAuth = document.querySelector('.button-auth')
const buttonOut = document.querySelector('.button-out')
const userName = document.querySelector('.user-name')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const passwordInput = document.querySelector('#password')

let login = localStorage.getItem('gloDelivery')

function toggleModalAuth () {
  modalAuth.classList.toggle('is-open')

  loginInput.style.borderColor = ''
  passwordInput.style.borderColor = ''

  if (modalAuth.classList.contains('is-open')) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function authorized () {
  function logOut () {
    login = null
    localStorage.removeItem('gloDelivery')
    buttonOut.style.display = ''
    buttonAuth.style.display = ''
    userName.style.display = ''
    buttonOut.removeEventListener('click', logOut)
    checkAuth()
  }

  console.log('Авторизовано')

  userName.textContent = login
  buttonAuth.style.display = 'none'
  buttonOut.style.display = 'block'
  userName.style.display = 'inline'

  buttonOut.addEventListener('click', logOut)
}

function notAuthorized () {
  console.log('Не авторизовано')

  function logIn (event) {
    event.preventDefault()

    const loginValue = loginInput.value.trim()
    const passwordValue = passwordInput.value.trim()

    if (loginValue && passwordValue) {
      login = loginValue
      localStorage.setItem('gloDelivery', login)

      toggleModalAuth()

      buttonAuth.removeEventListener('click', toggleModalAuth)
      closeAuth.removeEventListener('click', toggleModalAuth)
      logInForm.removeEventListener('submit', logIn)

      logInForm.reset()
      checkAuth()
    } else {
      if (!loginValue) {
        loginInput.style.borderColor = 'red'
      } else {
        loginInput.style.borderColor = ''
      }

      if (!passwordValue) {
        passwordInput.style.borderColor = 'red'
      } else {
        passwordInput.style.borderColor = ''
      }
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit', logIn)

  modalAuth.addEventListener('click', function (event) {
    if (event.target === modalAuth) {
      toggleModalAuth()
    }
  })
}

function checkAuth () {
  if (login) {
    authorized()
  } else {
    notAuthorized()
  }
}

checkAuth()

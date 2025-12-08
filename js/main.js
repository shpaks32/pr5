const buttonAuth = document.querySelector('.button-auth')
const buttonOut = document.querySelector('.button-out')
const userName = document.querySelector('.user-name')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')

let login = localStorage.getItem('gloDelivery')

function toggleModalAuth () {
  modalAuth.classList.toggle('is-open')
  loginInput.style.borderColor = ''
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

    if (loginInput.value.trim()) {
      login = loginInput.value
      localStorage.setItem('gloDelivery', login)

      toggleModalAuth()

      buttonAuth.removeEventListener('click', toggleModalAuth)
      closeAuth.removeEventListener('click', toggleModalAuth)
      logInForm.removeEventListener('submit', logIn)

      logInForm.reset()
      checkAuth()
    } else {
      loginInput.style.borderColor = 'red'
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit', logIn)
}

function checkAuth () {
  if (login) {
    authorized()
  } else {
    notAuthorized()
  }
}

checkAuth()

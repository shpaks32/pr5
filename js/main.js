const buttonAuth = document.querySelector('.button-auth')
const buttonOut = document.querySelector('.button-out')
const userName = document.querySelector('.user-name')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const passwordInput = document.querySelector('#password')

const cardsRestaurants = document.querySelector('.cards-restaurants')

let login = localStorage.getItem('gloDelivery')

const dbRestaurants = [
  {
    image: 'img/pizza-plus/preview.jpg',
    title: 'Піца плюс',
    time: 50,
    rating: 4.5,
    price: 200,
    category: 'Піца'
  },
  {
    image: 'img/tanuki/preview.jpg',
    title: 'Танукі',
    time: 60,
    rating: 4.5,
    price: 1200,
    category: 'Суші, роли'
  },
  {
    image: 'img/food-band/preview.jpg',
    title: 'FoodBand',
    time: 40,
    rating: 4.5,
    price: 150,
    category: 'Піца'
  },
  {
    image: 'img/palki-skalki/preview.jpg',
    title: 'Ikigai',
    time: 55,
    rating: 4.5,
    price: 250,
    category: 'Суші'
  },
  {
    image: 'img/gusi-lebedi/preview.jpg',
    title: 'Пузата хата',
    time: 75,
    rating: 4.5,
    price: 300,
    category: 'Українські страви'
  },
  {
    image: 'img/pizza-burger/preview.jpg',
    title: 'PizzaBurger',
    time: 45,
    rating: 4.5,
    price: 700,
    category: 'Піца'
  }
]

function createCardRestaurant ({ image, title, time, rating, price, category }) {
  const card = `
    <a href="restaurant.html" class="card card-restaurant">
      <img src="${image}" alt="${title}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${title}</h3>
          <span class="card-tag tag">${time} хв</span>
        </div>
        <div class="card-info">
          <div class="rating">${rating}</div>
          <div class="price">від ${price} ₴</div>
          <div class="category">${category}</div>
        </div>
      </div>
    </a>
  `

  cardsRestaurants.insertAdjacentHTML('beforeend', card)
}

function renderCards () {
  cardsRestaurants.textContent = ''
  dbRestaurants.forEach(createCardRestaurant)
}

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

cardsRestaurants.addEventListener('click', function (event) {
  const target = event.target
  const card = target.closest('.card-restaurant')

  if (card) {
    if (!login) {
      event.preventDefault()
      toggleModalAuth()
    }
  }
})

renderCards()
checkAuth()

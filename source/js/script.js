const SHOW_ITEMS_PER_CLICK = 4;
const ITEMS_HIDDEN = 2;
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const upButton = document.querySelector('.up-button');
const portfolioList = document.querySelector('.portfolio__list')
const portfolioItemsHidden = portfolioList.querySelectorAll('.portfolio__item--hidden');
const portfolioButton = document.querySelector('.portfolio__button');

// Выпадающее меню
navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Кнопка прокрутки наверх
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    upButton.classList.remove('up-button--hidden');
  } else {
    upButton.classList.add('up-button--hidden');
  }
});

upButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
})

// Показать еще
let arrayHidden = Array.from(portfolioItemsHidden);

const unhideItems = () => {
  if (arrayHidden.length > 0) {
    portfolioButton.disabled = false;
    portfolioButton.addEventListener('click', () => {
      for (let i = 0; i < SHOW_ITEMS_PER_CLICK; i++) {
        if (!arrayHidden[i]) {
          return portfolioButton.disabled = true;
        }
        arrayHidden[i].classList.remove('portfolio__item--hidden');
      }
      arrayHidden.splice(0, SHOW_ITEMS_PER_CLICK);
      if (arrayHidden.length === 0) {
        return portfolioButton.disabled = true;
      }
    });
  }
}

if (window.innerWidth >= 1440) {
  for (let i = 0; i < ITEMS_HIDDEN; i++) {
    arrayHidden[i].classList.remove('portfolio__item--hidden');
  }
  arrayHidden.splice(0, ITEMS_HIDDEN);
  unhideItems();
} else {
  unhideItems();
}

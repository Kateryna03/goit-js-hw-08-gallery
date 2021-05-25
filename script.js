import imagesArray from "./gallery-items.js";

const buttonRef = document.querySelector(".lightbox__button");
const modalRef = document.querySelector(".lightbox");
const imageRef = document.querySelector(".lightbox__image");
const galleryListRef = document.querySelector(".js-gallery");
const galleryMarkup = createGallery(imagesArray);
//2 - запарсила в список
galleryListRef.insertAdjacentHTML("beforeend", galleryMarkup);
//3 -делегирование
galleryListRef.addEventListener("click", clickOnImg);
buttonRef.addEventListener("click", clickOnCloseButton);
// 1-создаю разметку
function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href=''>
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function clickOnImg(e) {
  e.preventDefault();
  console.log(e);
  if (e.target.nodeName !== "IMG") {
    return;
  }
  modalRef.classList.add("is-open");
  imageRef.alt = e.target.alt;
  imageRef.src = e.target.dataset.source;
  //console.log(e.target.dataset.source);
}
function clickOnCloseButton(e) {
  modalRef.classList.remove("is-open");
  //очистка атрибутов
  imageRef.alt = "";
  imageRef.src = "";
}
//Закрытие модального окна по нажатию клавиши ESC
window.addEventListener("keydown", clickOnKeyBoardEsc);

function clickOnKeyBoardEsc(e) {
  if (e.code === "Escape") {
    modalRef.classList.remove("is-open");
    imageRef.alt = "";
    imageRef.src = "";
  }
}

//Закрытие модального окна по клику на div.lightbox__overlay
const overlayRef = document.querySelector(".lightbox__overlay");
overlayRef.addEventListener("click", clickOnOverlayToCloseImg);
function clickOnOverlayToCloseImg(e) {
  if (e.target === e.currentTarget) {
    modalRef.classList.remove("is-open");
    imageRef.alt = "";
    imageRef.src = "";
  }
}
//console.log(createGallery(imagesArray));
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import { galleryItems } from './gallery-items.js';

document.addEventListener("DOMContentLoaded", () => {
  const galleryList = document.querySelector(".gallery");

  // Створення і рендер розмітки галереї за допомогою map()
  const galleryItemsElements = galleryItems.map(({ original, preview, description }) => {
    const listItem = document.createElement("li");
    listItem.classList.add("gallery__item");

    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.href = original;

    const image = document.createElement("img");
    image.classList.add("gallery__image");
    image.src = preview;
    image.setAttribute("data-source", original);
    image.alt = description;

    link.appendChild(image);
    listItem.appendChild(link);
    return listItem;
  });

  galleryList.append(...galleryItemsElements);

  // Реалізація делегування та відкриття модального вікна
  galleryList.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("gallery__image")) {
      const source = event.target.dataset.source;
      openModal(source);
    }
  });

  // Відкриття модального вікна та збільшення зображення
  function openModal(source) {
    const instance = basicLightbox.create(`
      <img src="${source}" alt="Full-size image" class="modal-image">
    `, {
      onShow: (instance) => {
        instance.element().querySelector(".modal-image").addEventListener("click", () => {
          instance.close();
        });
      }
    });

    instance.show();
  }
});


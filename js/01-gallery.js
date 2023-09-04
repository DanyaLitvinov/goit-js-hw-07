import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector(".gallery");
const galleryHTML = galleryItems
  .map(({ preview, original, description }) =>
    `<li data-preview="${preview}" class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img src="${preview}" data-source="${original}" alt="${description}" class="gallery__image" />
      </a>
    </li>`
  )
  .join("");

galleryContainer.innerHTML = galleryHTML;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault(); 
  if (event.target.classList.contains("gallery__image")) {
    const imageSource = event.target.dataset.source;
    openLightbox(imageSource);
  }
});

function openLightbox(source) {
  const lightboxInstance = basicLightbox.create(`
    <img src="${source}" alt="Full-size image" class="lightbox-image">
  `, {
    onShow: (instance) => {
      instance.element().querySelector(".lightbox-image").addEventListener("click", () => {
        instance.close();
      });
    }
  });
  
  lightboxInstance.show();
}


// Types
import { ClickImage } from './types';

const clickImage = ({ element, viewImage, viewWrapper }: ClickImage) => {
    const srcImageThatClicked = element.getAttribute('src');

    srcImageThatClicked && viewImage.setAttribute('src', srcImageThatClicked);

    viewWrapper.style.display = 'flex';

    viewWrapper.addEventListener('click', () => {
        viewWrapper.style.display = 'none';
    }, { once: true });
};

window.addEventListener('load', () => {
    const galleryItems = document.querySelectorAll('.gallery__item');
    const viewWrapper = document.querySelector('.view_item__wrapper');
    const viewImage = document.querySelector('.view_item__img');

    if (!(galleryItems && viewImage && viewWrapper)) {
        return;
    }

    galleryItems.forEach((element) => {
        element.addEventListener('click', () => clickImage({ element, viewImage, viewWrapper }));
    });
});

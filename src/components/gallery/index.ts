const galleryItems = document.querySelectorAll<HTMLDivElement>('.gallery__item');

const clickImage = (element: HTMLDivElement) => {
    const viewWrapper: HTMLDListElement | null = document.querySelector('.view_item__wrapper');
    const viewImage: HTMLDListElement | null = document.querySelector('.view_item__img');
    if (!(viewWrapper && viewImage)) {
        return;
    }

    const srcImageThatClicked = element.getAttribute('src');

    srcImageThatClicked && viewImage.setAttribute('src', srcImageThatClicked);

    viewWrapper.style.display = 'flex';

    viewWrapper.addEventListener('click', () => {
        viewWrapper.style.display = 'none';
    }, { once: true });
};

// eslint-disable-next-line no-undef
const changeHeightGalleryItems = (elements: NodeListOf<HTMLDivElement>) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    elements.forEach((element) => {
        if (windowWidth < 576) {
            element.style.height = `${(windowHeight / 4) - 10}px`;

            return;
        }

        if (windowWidth > 576) {
            element.style.height = `${(windowHeight / 2) - 10}px`;
        }
    });
};


window.addEventListener('load', () => {
    changeHeightGalleryItems(galleryItems);
    galleryItems.forEach((element: HTMLDivElement) => {
        element.addEventListener('click', () => clickImage(element));
    });
});


window.addEventListener('resize', () => changeHeightGalleryItems(galleryItems));

export {};

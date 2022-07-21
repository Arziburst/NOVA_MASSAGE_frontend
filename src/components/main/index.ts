import { HTMLElementTyped } from './types';

const header: HTMLElementTyped = document.querySelector('.header');
const photoMasterOfMainScreen: HTMLElementTyped = document.querySelector('.photo');
const mainScreen: HTMLElementTyped = document.querySelector('.main');
const mql: MediaQueryList = window.matchMedia('(orientation: portrait)');

let turnOver: boolean | null = null;

export const changeHeightMainScreen = () => {
    if (mainScreen && header && turnOver !== mql.matches) {
        mainScreen.style.minHeight =  `${window.innerHeight - header.clientHeight}px`;

        turnOver = mql.matches;

        if (mql.matches === true && photoMasterOfMainScreen) {
            const resultSizePhotoMasterOfMainScreen = 'calc(100vw - 40px)';
            photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
            photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
        } else if (mql.matches === false && photoMasterOfMainScreen && header) {
            const resultSizePhotoMasterOfMainScreen = `${(window.innerHeight - header.clientHeight) - 20 }px`;
            photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
            photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
        }
    }
};

window.addEventListener('load', changeHeightMainScreen);
window.addEventListener('resize', changeHeightMainScreen);

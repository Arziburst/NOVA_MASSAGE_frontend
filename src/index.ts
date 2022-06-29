// Styles
import 'normalize.css';
import './main.scss';

import './assets/images/photoMaster.png';
import './assets/images/imageMakeMassage.png';
import './assets/images/imageLightBackBody.png';
import './assets/images/imageBackBody.png';

let header: HTMLElement | null = document.querySelector('.header');
let photoMasterOfMainScreen: HTMLElement | null = document.querySelector('.photo');
let mainScreen: HTMLElement | null = document.querySelector('.main');
let mql: MediaQueryList = window.matchMedia('(orientation: portrait)');

let changeHeightMainScreen = () => {
    if (mainScreen && header) {
        mainScreen.style.minHeight =  `${window.innerHeight - header.clientHeight}px`;
    }


    if (mql.matches && photoMasterOfMainScreen) {
        let resultSizePhotoMasterOfMainScreen = 'calc(100vw - 40px)';
        photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
        photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
    } else if (photoMasterOfMainScreen && header) {
        let resultSizePhotoMasterOfMainScreen = `${(window.innerHeight - header.clientHeight) - 20 }px`;
        photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
        photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
    }
};

window.addEventListener('load', changeHeightMainScreen);

window.addEventListener('resize', changeHeightMainScreen);


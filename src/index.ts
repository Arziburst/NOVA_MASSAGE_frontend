// Styles
import 'normalize.css';
import './main.scss';

// Images
import './assets/images/photoMaster.png';
import './assets/images/imageMakeMassage.png';
import './assets/images/imageLightBackBody.png';
import './assets/images/imageBackBody.png';

// TS Modules
import './components/footer';

const header: HTMLElement | null = document.querySelector('.header');
const photoMasterOfMainScreen: HTMLElement | null = document.querySelector('.photo');
const mainScreen: HTMLElement | null = document.querySelector('.main');
const mql: MediaQueryList = window.matchMedia('(orientation: portrait)');

const changeHeightMainScreen = () => {
    if (mainScreen && header) {
        mainScreen.style.minHeight =  `${window.innerHeight - header.clientHeight}px`;
    }

    if (mql.matches && photoMasterOfMainScreen) {
        const resultSizePhotoMasterOfMainScreen = 'calc(100vw - 40px)';
        photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
        photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
    } else if (photoMasterOfMainScreen && header) {
        const resultSizePhotoMasterOfMainScreen = `${(window.innerHeight - header.clientHeight) - 20 }px`;
        photoMasterOfMainScreen.style.height = resultSizePhotoMasterOfMainScreen;
        photoMasterOfMainScreen.style.width = resultSizePhotoMasterOfMainScreen;
    }
};

window.addEventListener('load', changeHeightMainScreen);
window.addEventListener('resize', changeHeightMainScreen);

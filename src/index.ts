// Styles
import 'normalize.css';
import './main.scss';

// Images
import './assets/images/photoMaster.png';
import './assets/images/successfulRequestFrom.png';

import './assets/images/primaryImageOfGallery.jpg';
import './assets/images/secondaryImageOfGallery.jpg';
import './assets/images/tertiaryImageOfGallery.jpg';
import './assets/images/quaternaryImageOfGallery.jpg';

// TS Modules
import './components/main';
import './components/gallery';
import './components/map';
import './components/footer';

// Utils
import { allLang, changeLanguageOnAllPage, checkCountryAndChangeURL, changeURLLanguage } from './utils';
import { changeHeightMainScreen } from './components/main';

window.addEventListener('load', () => {
    const selectChangeLang = document.querySelector<HTMLSelectElement>('#change_lang');
    const pathPathname = window.location.pathname.replace(/\//g, '');

    if (!selectChangeLang) {
        return;
    }

    selectChangeLang.addEventListener('change', () => {
        changeURLLanguage(selectChangeLang);
        changeLanguageOnAllPage(selectChangeLang);
        if (selectChangeLang.value === '') {
            location.reload();

            return;
        }
        changeHeightMainScreen();
    });

    if (typeof sessionStorage.getItem('isVisited') !== 'string') {
        checkCountryAndChangeURL(selectChangeLang);

        return;
    }


    if (!allLang.some((lng) => lng === pathPathname)) {
        changeLanguageOnAllPage(selectChangeLang);
        checkCountryAndChangeURL(selectChangeLang);
        changeHeightMainScreen();
    } else {
        changeLanguageOnAllPage(selectChangeLang);
        changeHeightMainScreen();
    }
});


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
import {
    allLang,
    changeLanguageOnPage,
    checkCountryAndChangeURL,
    changeURL,
    ukraine,
    defaultURL,
    ls,
} from './utils';
import { changeHeightMainScreen } from './components/main';

window.addEventListener('load', () => {
    const selectChangeLang = document.querySelector<HTMLSelectElement>('#change_lang');
    const pathPathname = window.location.pathname.replace(/\//g, '');

    if (!selectChangeLang) {
        return;
    }

    selectChangeLang.addEventListener('change', () => {
        ls.set(`${selectChangeLang.value}`);
        changeURL(selectChangeLang.value);

        if (selectChangeLang.value === ukraine) {
            return;
        }
        changeLanguageOnPage();

        changeHeightMainScreen();
    });

    if (ls.get()) {
        const countryFromLocalStorage = ls.get();

        if (countryFromLocalStorage !== null && allLang.includes(countryFromLocalStorage)) {
            selectChangeLang.value = countryFromLocalStorage;
            changeURL(countryFromLocalStorage);
            changeLanguageOnPage();

            changeHeightMainScreen();

            return;
        }

        return;
    }

    if (allLang.includes(pathPathname)) {
        if (pathPathname === defaultURL) {
            checkCountryAndChangeURL(selectChangeLang);
        } else {
            selectChangeLang.value = pathPathname;
            changeURL(selectChangeLang.value);
            changeLanguageOnPage();

            changeHeightMainScreen();
        }
    }
});


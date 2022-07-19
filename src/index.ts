// Styles
import 'normalize.css';
import './main.scss';

// Images
import './assets/images/photoMaster.png';
import './assets/images/imageLightBackBody.png';
import './assets/images/imageBackBody.png';
import './assets/images/successfulRequestFrom.png';

import './assets/images/primaryImageOfGallery.png';
import './assets/images/secondaryImageOfGallery.png';
import './assets/images/tertiaryImageOfGallery.png';
import './assets/images/quaternaryImageOfGallery.png';

// TS Modules
import './components/main';
import './components/gallery';
import './components/map';
import './components/footer';

import { langArrBlockScreen } from './lng';

const allLang = [ '', 'ru', 'en' ];

// const countriesSNG = [ 'Russian' ];

// const country = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geo = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geo).then((res) => res.json())
            .then((data) => console.log(data.countryName));
    });
}


const changeLanguageOnAllPage = (selectChangeLang: HTMLSelectElement) => {
    const tagHTML = document.querySelector('html');
    const pathPathname = window.location.pathname.replace(/\//g, '');

    selectChangeLang.value = pathPathname;
    if (tagHTML) {
        tagHTML.lang = pathPathname;
    }

    for (const keyLangArrBlockScreen in langArrBlockScreen) {
        if (Object.prototype.hasOwnProperty.call(langArrBlockScreen, keyLangArrBlockScreen)) {
            const blockScreen = langArrBlockScreen[ keyLangArrBlockScreen ];
            for (const keyBlockScreen in blockScreen) {
                if (Object.prototype.hasOwnProperty.call(blockScreen, keyBlockScreen)) {
                    const element = document.querySelector<any>('#lng_' + keyLangArrBlockScreen + '_' + keyBlockScreen);
                    if (!element) {
                        return;
                    }

                    if (element.tagName === 'IMG') {
                        element.alt = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ pathPathname ];

                        return;
                    }

                    if (pathPathname && allLang.some((lng) => lng === pathPathname)) {
                        element.textContent
                        = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ pathPathname ];
                    } else {
                        element.textContent = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ].ua;
                    }
                }
            }
        }
    }
};

const changeURLLanguage = (selectChangeLang: HTMLSelectElement) => {
    const lang = selectChangeLang.value;
    history.pushState(null, '', `/${lang}`);
};

window.addEventListener('load', () => {
    const selectChangeLang = document.querySelector<HTMLSelectElement>('#change_lang');
    const pathPathname = window.location.pathname.replace(/\//g, '');

    if (!selectChangeLang) {
        return;
    }

    changeLanguageOnAllPage(selectChangeLang);

    if (allLang.some((lng) => lng !== pathPathname)) {
        history.pushState(null, '', '/');
    }

    selectChangeLang.addEventListener('change', () => {
        changeURLLanguage(selectChangeLang);
        changeLanguageOnAllPage(selectChangeLang);
    });
});


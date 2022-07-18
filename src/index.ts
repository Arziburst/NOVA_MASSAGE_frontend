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

// const country = Intl.DateTimeFormat().resolvedOptions().timeZone;


function changeLanguage(selectChangeLang: HTMLSelectElement) {
    let hash = window.location.hash;
    hash = hash.substr(1);

    console.log(`hash >>>> ${hash}`);
    if (!hash) {
        return;
    }

    if (!allLang.includes(hash)) {
        location.href = String(window.location.pathname);
        location.reload();
    }
    selectChangeLang.value = hash;

    for (const keyLangArrBlockScreen in langArrBlockScreen) {
        if (Object.prototype.hasOwnProperty.call(langArrBlockScreen, keyLangArrBlockScreen)) {
            const blockScreen = langArrBlockScreen[ keyLangArrBlockScreen ];
            for (const keyBlockScreen in blockScreen) {
                if (Object.prototype.hasOwnProperty.call(blockScreen, keyBlockScreen)) {
                    const element = document.querySelector<any>('#lng_' + keyLangArrBlockScreen + '_' + keyBlockScreen);
                    const defaultValue = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ].ua;
                    if (!element) {
                        return;
                    }

                    console.log(element.tagName);

                    if (element.tagName === 'IMG') {
                        element.alt = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ hash ];
                    }

                    if (element) {
                        element.innerHTML = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ hash ];
                    } else {
                        element.innerHTML = defaultValue;
                    }
                }
            }
        }
    }
}

function changeURLLanguage(selectChangeLang: HTMLSelectElement) {
    const lang = selectChangeLang.value;
    console.log(`lang >>> ${lang}`);
    //! remove /#
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

window.addEventListener('load', () => {
    console.log(`load > window.location.hash >>>> ${window.location.hash}`);
    const selectChangeLang = document.querySelector<HTMLSelectElement>('#change_lang');
    if (!selectChangeLang) {
        return;
    }
    changeLanguage(selectChangeLang);

    selectChangeLang.addEventListener('change', () => changeURLLanguage(selectChangeLang));
});


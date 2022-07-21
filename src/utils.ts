import { changeHeightMainScreen } from './components/main';
import { langArrBlockScreen } from './languages';

export const allLang = [ '', 'ru', 'en' ];

export const countriesSNG = [ 'Russia', 'Armenia', 'Azerbaijan', 'Belarus', 'Kazakhstan', 'Kyrgyzstan', 'Moldova', 'Tajikistan', 'Uzbekistan' ];

export const changeLanguageOnAllPage = (selectChangeLang: HTMLSelectElement) => {
    const tagHTML = document.querySelector('html');
    const pathPathname = window.location.pathname.replace(/\//g, '');


    selectChangeLang.value = pathPathname;

    if (!allLang.includes(pathPathname) || pathPathname === '') {
        return;
    }

    if (tagHTML) {
        tagHTML.lang = pathPathname === '' ? 'ua' : pathPathname;
    }

    for (const keyLangArrBlockScreen in langArrBlockScreen) {
        if (Object.prototype.hasOwnProperty.call(langArrBlockScreen, keyLangArrBlockScreen)) {
            const blockScreen = langArrBlockScreen[ keyLangArrBlockScreen ];
            for (const keyBlockScreen in blockScreen) {
                if (Object.prototype.hasOwnProperty.call(blockScreen, keyBlockScreen)) {
                    const elements = document.querySelectorAll<any>('.lng_' + keyLangArrBlockScreen + '_' + keyBlockScreen);
                    elements.forEach((element) => {
                        if (!element) {
                            return;
                        }

                        if (element.tagName === 'IMG') {
                            element.alt = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ pathPathname ];

                            return;
                        }

                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder
                        = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ pathPathname ];

                            return;
                        }

                        if (pathPathname && allLang.some((lng) => lng === pathPathname)) {
                            element.textContent
                        = langArrBlockScreen[ keyLangArrBlockScreen ][ keyBlockScreen ][ pathPathname ];
                        }
                    });
                }
            }
        }
    }
};

export const checkCountryAndChangeURL = (selectChangeLang: HTMLSelectElement) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geo = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            fetch(geo).then((res) => res.json())
                .then((data) => {
                    const yourCountryName: string = data.countryName;

                    if (!(typeof yourCountryName === 'string')) {
                        return;
                    }

                    sessionStorage.setItem('isVisited', `${yourCountryName}`);

                    if (yourCountryName === 'Ukraine') {
                        history.pushState(null, '', '/');
                        selectChangeLang.value = '';

                        return;
                    }

                    if (yourCountryName !== 'Ukraine' && !countriesSNG.some((lng) => lng === yourCountryName)) {
                        history.pushState(null, '', '/en');
                        selectChangeLang.value = 'en';
                        changeLanguageOnAllPage(selectChangeLang);
                        changeHeightMainScreen();

                        return;
                    }

                    if (countriesSNG.includes(yourCountryName)) {
                        history.pushState(null, '', '/ru');
                        selectChangeLang.value = 'ru';
                        changeLanguageOnAllPage(selectChangeLang);
                        changeHeightMainScreen();

                        return;
                    }

                    //? reload
                    history.pushState(null, '', '/');
                    selectChangeLang.value = '';
                });
        });
    }
};

export const changeURLLanguage = (selectChangeLang: HTMLSelectElement) => {
    const lang = selectChangeLang.value;
    history.pushState(null, '', `/${lang}`);
};

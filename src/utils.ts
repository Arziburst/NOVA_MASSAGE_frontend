import { changeHeightMainScreen } from './components/main';
import { langArrBlockScreen } from './languages';

export const defaultURL = '';

export const allLang = [ defaultURL, 'ru', 'en' ];

export const ukraine = 'ua';

export const countriesSNG = [ 'Russia', 'Armenia', 'Azerbaijan', 'Belarus', 'Kazakhstan', 'Kyrgyzstan', 'Moldova', 'Tajikistan', 'Uzbekistan' ];

export const changeLanguageOnPage = () => {
    const tagHTML = document.querySelector('html');
    const pathPathname = window.location.pathname.replace(/\//g, '');

    if (tagHTML) {
        tagHTML.lang = pathPathname === '' ? 'uk' : pathPathname;
    }

    if (pathPathname === defaultURL) {
        location.reload();

        return;
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

                        if (pathPathname && allLang.includes(pathPathname)) {
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

                    if (yourCountryName === 'Ukraine') {
                        history.pushState(null, '', `/${defaultURL}`);
                        selectChangeLang.value = ukraine;

                        return;
                    }

                    if (yourCountryName !== 'Ukraine' && !countriesSNG.includes(yourCountryName)) {
                        history.pushState(null, '', '/en');
                        selectChangeLang.value = 'en';
                        changeLanguageOnPage();
                        changeHeightMainScreen();

                        return;
                    }

                    if (countriesSNG.includes(yourCountryName)) {
                        history.pushState(null, '', '/ru');
                        selectChangeLang.value = 'ru';
                        changeLanguageOnPage();
                        changeHeightMainScreen();

                        return;
                    }

                    history.pushState(null, '', `/${defaultURL}`);
                    selectChangeLang.value = ukraine;
                });
        });
    }
};

export const changeURL = (value: string) => {
    if (value === ukraine) {
        history.pushState(null, '', `/${defaultURL}`);
        location.reload();

        return;
    }
    history.pushState(null, '', `/${value}`);
};

export const ls = {
    set: (value: string) => localStorage.setItem('isVisited', value),
    get: (value: string = 'isVisited') => localStorage.getItem(value),
};

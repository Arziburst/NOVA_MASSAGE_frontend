const mql: MediaQueryList = window.matchMedia('(orientation: portrait)');
const map: HTMLDivElement | null = document.querySelector('#map');
const costCards: HTMLDivElement | null = document.querySelector('#cost');

let turnOver: boolean | null = null;

const changeHeightMap = () => {
    if (!(map && costCards)) {
        return;
    }
    if (window.outerHeight < 992 && turnOver !== mql.matches) {
        map.style.height = `${(window.innerHeight - costCards.clientHeight) - 40}px`;

        turnOver = mql.matches;

        return;
    }
    map.style.height = '100%';
};

const watcherClickMap = () => {
    const costMapWrapperMap: HTMLDivElement | null = document.querySelector('.cost_map__wrapper_map');

    if (!costMapWrapperMap) {
        return;
    }

    costMapWrapperMap.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        const result: boolean = confirm('Проложить маршрут с помощью карт?');

        if (result) {
            window.open('https://www.google.com/maps/search/?api=1&query=50.39837929264725,30.634371072554035', '_blank');
        }
    });
};


window.addEventListener('load', () => {
    watcherClickMap();
    changeHeightMap();
});

window.addEventListener('resize', changeHeightMap);

export {};

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


window.addEventListener('load', watcherClickMap);


export {};

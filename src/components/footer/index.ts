import { ChildNodeExtended, ContactUsInput } from './types';

const makeRequestToContactUs = async (body: ContactUsInput): Promise<boolean> => {
    const response = await fetch(`${process.env.API_URL}/contactUs`, {
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    console.log('some text');

    if (response.status !== 200) {
        throw new Error('makeRequestToContactUs failed');
    }

    return response.json();
};


const collectAllValuesFromFeedbackForm = async (event: Event) => {
    event.preventDefault();
    const feedback = document.querySelector('#feedback');

    const area = document.querySelector('.area');
    const areaTitle = document.querySelector('#areaTitle');
    const areaText = document.querySelector('#areaText');
    const areaTime = document.querySelector('#areaTime');
    const areaButton = document.querySelector('.area__button');
    const formSubmit: HTMLButtonElement | null = document.querySelector('.form__submit');
    const areaLoading: HTMLDivElement | null = document.querySelector('.area__loading');

    const inputs: NodeListOf<HTMLInputElement & HTMLTextAreaElement> = document.querySelectorAll('.form__input, .form__textarea');

    const footerOrder2: HTMLDivElement | null = document.querySelector('.footer__order_2');

    if (
        feedback === null
        || area === null
        || formSubmit === null
        || footerOrder2 === null
        || areaButton === null
        || areaTime === null
        || areaTitle === null
        || areaText === null
        || areaLoading === null
    ) {
        return;
    }

    const contactUsInput = Array.from(inputs).reduce<ContactUsInput>(
        (acc, inputElement: HTMLInputElement | HTMLTextAreaElement) => {
            if (!inputElement.name || !inputElement.value) {
                return acc;
            }

            if (inputElement.name === 'phone') {
                return {
                    ...acc,
                    [ inputElement.name ]: inputElement.value.replace(/\s/g, ''),
                };
            }

            return {
                ...acc,
                [ inputElement.name ]: inputElement.value,
            };
        }, {},
    );


    const changeDisabledForInputsAndSubmit = (boolean: boolean) => {
        inputs.forEach((element: HTMLInputElement | HTMLTextAreaElement) => {
            element.disabled = boolean;
            boolean ? element.style.opacity = '.5' : element.style.opacity = '1';
        });
        formSubmit.disabled = boolean;
        boolean ? formSubmit.style.opacity = '.5' : formSubmit.style.opacity = '1';
    };
    changeDisabledForInputsAndSubmit(true);

    areaLoading.style.display = 'block';

    const result = await makeRequestToContactUs(contactUsInput);


    const getTime = () => {
        const limitTime: number = 1000 * 60 * 60  * 12;

        const time: number = limitTime - (Date.now() - new Date(Number(localStorage.getItem('time'))).getTime());
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        areaTime.innerHTML = `${hours}:${mins}:${secs}`;
    };

    if (result === true) {
        if (localStorage.getItem('time')) {
            areaTitle.innerHTML = 'Доступ закрыт';
            areaLoading.style.display = 'none';
            getTime();
            setInterval(() => {
                getTime();
            }, 1000);
        } else {
            localStorage.setItem('time', `${Date.now()}`);
            getTime();
            setInterval(() => {
                getTime();
            }, 1000);
        }
    } else {
        areaTitle.innerHTML = 'Что-то пошло не так';
        areaText.innerHTML = 'Попытайтесь позже';
        areaText.classList.remove('font--color_gray');
        areaLoading.style.display = 'none';
    }


    area.classList.add('area--active');
    footerOrder2.style.display = 'none';

    areaButton.addEventListener('click', (event: Event) => {
        event.preventDefault();
        changeDisabledForInputsAndSubmit(false);
        const area = document.querySelector('.area');

        //! Тут треба стирати при false для клієнта?
        if (result === true) {
            inputs.forEach((element: HTMLInputElement | HTMLTextAreaElement) => {
                element.value = '';
            });
        }

        areaLoading.style.display = 'none';
        area?.classList.remove('area--active');
        footerOrder2.style.display = 'flex';
    });

    console.log('🚀result', result);
};

window.addEventListener('load', () => {
    document.querySelector('#feedbackForm')?.addEventListener('submit', collectAllValuesFromFeedbackForm);
});


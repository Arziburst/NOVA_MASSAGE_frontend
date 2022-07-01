import { changeDisabledForInputsAndSubmitTypes, ContactUsInput } from './types';

const makeRequestToContactUs = async (body: ContactUsInput): Promise<boolean> => {
    const response = await fetch(`${process.env.API_URL}/contactUs`, {
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (response.status !== 200) {
        throw new Error('makeRequestToContactUs failed');
    }

    return response.json();
};

const changeDisabledForInputsAndSubmit = ({ inputs, formSubmit, boolean }: any) => {
    inputs.forEach((element: HTMLInputElement | HTMLTextAreaElement) => {
        element.disabled = boolean;
        boolean ? element.style.opacity = '.5' : element.style.opacity = '1';
    });
    formSubmit.disabled = boolean;
    boolean ? formSubmit.style.opacity = '.5' : formSubmit.style.opacity = '1';
};

const getTime = (areaTime: Element) => {
    const limitTime: number = 1000 * 60 * 60  * 12;

    const time: number = limitTime - (Date.now() - new Date(Number(localStorage.getItem('timeSubmitRequestFromForm'))).getTime());
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    if (time >= 0) {
        areaTime.innerHTML = `${`0${hours}`.slice(-2)}:${`0${mins}`.slice(-2)}:${`0${secs}`.slice(-2) }`;
    }

    return time;
};

const collectAllValuesFromFeedbackForm = async (
    {
        event,
        inputs,
        areaLoading,
        formSubmit,
    }: changeDisabledForInputsAndSubmitTypes,
) => {
    event.preventDefault();
    const feedback = document.querySelector('#feedback');

    if (
        feedback === null
        || formSubmit === null
        || areaLoading === null
        || inputs === null
    ) {
        return;
    }

    const contactUsInput = Array.from(inputs).reduce<ContactUsInput>(
        (acc, inputElement: HTMLInputElement | HTMLTextAreaElement) => {
            if (!inputElement.name) {
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


    changeDisabledForInputsAndSubmit({ boolean: true, inputs, formSubmit });

    areaLoading.style.display = 'block';

    try {
        const result = await makeRequestToContactUs(contactUsInput);
        if (result === true) {
            localStorage.setItem('timeSubmitRequestFromForm', `${Date.now()}`);
        }
    } finally {
        areaLoading.style.display = 'none';
    }
};

window.addEventListener('load', () => {
    const areaTime = document.querySelector('#areaTime');
    const area = document.querySelector('.area');
    const footerOrder2: HTMLDivElement | null = document.querySelector('.footer__order_2');
    const areaLoading: HTMLDivElement | null = document.querySelector('.area__loading');
    // eslint-disable-next-line no-undef
    const inputs: NodeListOf<HTMLInputElement & HTMLTextAreaElement> = document.querySelectorAll('.form__input, .form__textarea');
    const formSubmit: HTMLButtonElement | null = document.querySelector('.form__submit');


    if (areaTime === null
        || area === null
        || footerOrder2 === null
        || areaLoading === null
        || inputs === null
        || formSubmit === null
    ) {
        return;
    }

    const checkIsTimeSubmitRequestFromForm = () => {
        if (
            getTime(areaTime) > 0
             || localStorage.getItem('timeSubmitRequestFromForm') === ''
        ) {
            area.classList.add('area--active');
            footerOrder2.style.display = 'none';
            changeDisabledForInputsAndSubmit({ boolean: true, inputs, formSubmit });
        } else {
            area.classList.remove('area--active');
            footerOrder2.style.display = 'flex';
            changeDisabledForInputsAndSubmit({ boolean: false, inputs, formSubmit });
            areaLoading.style.display = 'none';
        }
    };
    checkIsTimeSubmitRequestFromForm();

    setInterval(() => {
        checkIsTimeSubmitRequestFromForm();
    }, 1000);

    document.querySelector('#feedbackForm')?.addEventListener('submit', (event) => collectAllValuesFromFeedbackForm({ event, inputs, areaLoading, formSubmit }));
});

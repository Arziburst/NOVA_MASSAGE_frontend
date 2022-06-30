import { ChildNodeExtended, ContactUsInput } from './types';

// const makeRequestToContactUs = async (body: ContactUsInput): Promise<boolean> => {
//     const response = await fetch(`${process.env.API_URL}/contactUs`, {
//         method:  'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });

//     if (response.status !== 200) {
//         throw new Error('makeRequestToContactUs failed');
//     }

//     return response.json();
// };


const collectAllValuesFromFeedbackForm = async (event: Event) => {
    event.preventDefault();
    const feedback = document.querySelector('#feedback');

    const area = document.querySelector('.area');
    const areaTitle = document.querySelector('#areaTitle');
    const areaText = document.querySelector('#areaText');
    const areaTime = document.querySelector('#areaTime');
    const areaButton = document.querySelector('.area__button');
    const formSubmit = document.querySelector('.form__submit');

    const inputs = document.querySelectorAll('.form__input');
    const textarea = document.querySelectorAll('.form__textarea');


    const footerOrder2: any = document.querySelector('.footer__order_2');


    if (
        feedback === null
        || area === null
        || formSubmit === null
        || footerOrder2 === null
        || areaButton === null
        || areaTime === null
        || areaTitle === null
        || areaText === null
    ) {
        return;
    }

    // const contactUsInput = Array.from(feedback.childNodes).reduce<ContactUsInput>(
    //     (acc, inputElement: ChildNodeExtended) => {
    //         if (!inputElement.attributes) {
    //             return acc;
    //         }

    //         return {
    //             ...acc,
    //             [ inputElement.attributes.name.value ]: inputElement.value,
    //         };
    //     }, {},
    // );

    // const result = await makeRequestToContactUs(contactUsInput);


    //!!!!!!!!!


    const changeDisabledForInputsAndTextarea = (boolean: boolean) => {
        inputs.forEach((element: any) => {
            element.disabled = boolean;
        });
        textarea.forEach((element: any) => {
            element.disabled = boolean;
        });
    };
    changeDisabledForInputsAndTextarea(true);


    const result: any = true;
    //! HERE MODAL APPEAR!!!


    const getTime = () => {
        const dayTime: number = 1000 * 60 * 60  * 12;

        const time: number = dayTime - (Date.now() - new Date(Number(localStorage.getItem('time'))).getTime());
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        areaTime.innerHTML = `${hours}:${mins}:${secs}`;
    };

    if (result === true) {
        if (localStorage.getItem('time')) {
            areaTitle.innerHTML = 'Доступ закрыт';
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
    }


    area.classList.add('area--active');
    footerOrder2.style.display = 'none';

    areaButton.addEventListener('click', (event: Event) => {
        event.preventDefault();
        changeDisabledForInputsAndTextarea(false);
        const area = document.querySelector('.area');
        const footerOrder2: any = document.querySelector('.footer__order_2');

        //! Тут треба стирати при false для клієнта?
        if (result === true) {
            feedback.childNodes.forEach((element: any) => {
                element.value = '';
            });
        }

        area?.classList.remove('area--active');
        footerOrder2.style.display = 'flex';
    });

    // console.log('🚀result', result);
};

window.addEventListener('load', () => {
    document.querySelector('#feedbackForm')?.addEventListener('submit', collectAllValuesFromFeedbackForm);
});


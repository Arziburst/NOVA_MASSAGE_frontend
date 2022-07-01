// Types
import { HTMLElementsTypes, ContactUsInput } from './types';

// Tools
import { getTimeDifference, isFormBlockedHandler, toggleHTLMElementsDisabledState } from './utils';
import { WHEN_REQUEST_WAS_SENT } from '../../init/constants';

let isRequestFetching = false;
let isBlockTogglerActive = isFormBlockedHandler();

const collectAllValuesFromFeedbackForm = async ({ event, inputs, spinner, buttonSubmit }: HTMLElementsTypes) => {
    event.preventDefault();

    const contactUsInputsData = Array.from(inputs).reduce<ContactUsInput>(
        (acc, inputElement: HTMLInputElement | HTMLTextAreaElement) => {
            if (!inputElement.name) {
                return acc;
            }

            return {
                ...acc,
                [ inputElement.name ]: inputElement.value,
            };
        }, {},
    );

    try {
        isRequestFetching = true; // eslint-disable-line @typescript-eslint/no-unused-vars
        toggleHTLMElementsDisabledState({ isFormBlocked: true, inputs, buttonSubmit });
        spinner.style.display = 'block';

        const response = await fetch(`${process.env.API_URL}/contactUs`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactUsInputsData),
        });

        if (response.status !== 200) {
            throw new Error('makeRequestToContactUs failed');
        }

        localStorage.setItem(WHEN_REQUEST_WAS_SENT, `${Date.now()}`);
    } catch (error) {
        console.log(error);
    } finally {
        spinner.style.display = 'none';
        isRequestFetching = false; // eslint-disable-line @typescript-eslint/no-unused-vars
    }
};

window.addEventListener('load', () => {
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form__input, .form__textarea'); // eslint-disable-line no-undef

    const buttonSubmitWrapper = document.querySelector<HTMLDivElement>('.footer__order_2');
    const buttonSubmit = document.querySelector<HTMLButtonElement>('.form__submit');
    const spinner = document.querySelector<HTMLDivElement>('.area__loading');

    const successMessageBlock = document.querySelector<HTMLDivElement>('.area');
    const timeToUnblockBlock = document.querySelector<HTMLSpanElement>('#areaTime');

    if (!(timeToUnblockBlock && successMessageBlock && buttonSubmitWrapper && spinner && inputs && buttonSubmit)) {
        return;
    }

    const checkIsTimeSubmitRequestFromForm = () => {
        const isFormBlocked = isFormBlockedHandler();

        if (isFormBlocked && isBlockTogglerActive) {
            toggleHTLMElementsDisabledState({ isFormBlocked, inputs, buttonSubmit });
            buttonSubmitWrapper.style.display = 'none';
            successMessageBlock.classList.add('area--active');
            isBlockTogglerActive = false;  // eslint-disable-line @typescript-eslint/no-unused-vars
        }

        if (isFormBlocked) {
            timeToUnblockBlock.innerHTML = getTimeDifference();
        }

        if (!isFormBlocked && !isBlockTogglerActive) {
            toggleHTLMElementsDisabledState({ isFormBlocked, inputs, buttonSubmit });
            buttonSubmitWrapper.style.display = 'flex';
            successMessageBlock.classList.remove('area--active');
            isBlockTogglerActive = true;  // eslint-disable-line @typescript-eslint/no-unused-vars
        }
    };

    checkIsTimeSubmitRequestFromForm();

    setInterval(() => {
        if (!isRequestFetching) {
            checkIsTimeSubmitRequestFromForm();
        }
    }, 1000);

    document.querySelector('#feedbackForm')?.addEventListener('submit', (event) => {
        collectAllValuesFromFeedbackForm({ event, inputs, spinner, buttonSubmit });
    });
});

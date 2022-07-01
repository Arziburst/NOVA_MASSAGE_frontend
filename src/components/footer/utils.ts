// Types
import { HTLMElementsDisabledStateTypes } from './types';

// Tools
import { WHEN_REQUEST_WAS_SENT, LIMIT_TIME } from '../../init/constants';

export const isFormBlockedHandler = () => {
    const whenRequestWasSent = localStorage.getItem(WHEN_REQUEST_WAS_SENT) || 0;
    const isFormBlocked = LIMIT_TIME > (Date.now() - Number(whenRequestWasSent));

    return isFormBlocked;
};

export const getTimeDifference = () => {
    const timeNumber: number = LIMIT_TIME - (Date.now() - new Date(
        Number(localStorage.getItem(WHEN_REQUEST_WAS_SENT)),
    ).getTime());

    const hours = Math.floor((timeNumber % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((timeNumber % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((timeNumber % (1000 * 60)) / 1000);

    return `${`0${hours}`.slice(-2)}:${`0${mins}`.slice(-2)}:${`0${secs}`.slice(-2)}`;
};

export const toggleHTLMElementsDisabledState = (
    { inputs, buttonSubmit, isFormBlocked }: HTLMElementsDisabledStateTypes,
) => {
    inputs.forEach((element) => {
        element.disabled = isFormBlocked;
        isFormBlocked ? element.style.opacity = '.5' : element.style.opacity = '1';
    });
    isFormBlocked ? buttonSubmit.style.opacity = '.5' : buttonSubmit.style.opacity = '1';
    buttonSubmit.disabled = isFormBlocked;
};

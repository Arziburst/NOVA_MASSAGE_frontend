import { ChildNodeExtended, ContactUsInput } from './types';

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

const collectAllValuesFromFeedbackForm = async (event: Event) => {
    event.preventDefault();
    const feedback = document.querySelector('#feedback');

    if (feedback === null) {
        return;
    }

    const contactUsInput = Array.from(feedback.childNodes).reduce<ContactUsInput>(
        (acc, inputElement: ChildNodeExtended) => {
            if (!inputElement.attributes) {
                return acc;
            }

            return {
                ...acc,
                [ inputElement.attributes.name.value ]: inputElement.value,
            };
        }, {},
    );

    const result = await makeRequestToContactUs(contactUsInput);

    // HERE MODAL APPEAR!!!
    console.log('🚀result', result);
};

window.addEventListener('load', () => {
    document.querySelector('#feedbackForm')?.addEventListener('submit', collectAllValuesFromFeedbackForm);
});


export type ContactUsInput = {
    name?: string;
    phone?: string;
    question?: string;
}

export type HTMLElementsTypes = {
    event: Event;
    inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>; // eslint-disable-line no-undef
    spinner: HTMLDivElement;
    buttonSubmit: HTMLButtonElement;
}

export type HTLMElementsDisabledStateTypes = {
    inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>; // eslint-disable-line no-undef
    buttonSubmit: HTMLButtonElement;
    isFormBlocked: boolean
}

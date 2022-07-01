export type ContactUsInput = {
    name?: string;
    phone?: string;
    question?: string;
}

export type changeDisabledForInputsAndSubmitTypes = {
    event: Event;
    // eslint-disable-next-line no-undef
    inputs: NodeListOf<HTMLInputElement & HTMLTextAreaElement>;
    areaLoading: HTMLDivElement;
    formSubmit: HTMLButtonElement;
}

export type ChildNodeExtended = {
    attributes?: {
        name: {
            value: string;
        };
    }
    value?: string;
} & ChildNode; // eslint-disable-line no-undef

export type ContactUsInput = {
    name?: string;
    phone?: string;
    question?: string;
}

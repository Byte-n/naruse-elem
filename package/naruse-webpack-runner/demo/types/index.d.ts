declare module 'Naruse' {
    export const Component: any;
    export const useState: any;
    export const createElement: any;
}

declare global {
    const Naruse = import('Naruse');
}


interface JSX {
    qwer: any;
}

declare module 'Naruse' {
    function cloneElement<P, T>(
        element: any,
        props?: P,
        ...children: any[]): any;

    function isValidElement<P>(object: {}): boolean;
}
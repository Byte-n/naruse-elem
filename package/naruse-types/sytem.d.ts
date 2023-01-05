interface SystemInfo {
    app: string,
    brand: string,
    currentBattery: string,
    fontSizeSetting: number,
    language: string,
    model: string,
    pixelRatio: number,
    platform: 'pc' | 'mb',
    screenHeight: number,
    screenWidth: number,
    statusBarHeight: number,
    storage: any,
    system: string,
    titleBarHeight: number,
    version: string,
    windowHeight: number,
    windowWidth: number,
    scaleWith: number,
    scaleHeight: number,
}

interface getSystemInfoSync {
    (): SystemInfo;
}

declare module 'Naruse' {
    let getSystemInfoSync: getSystemInfoSync;
    let getSystemInfo: () => Promise<SystemInfo>;
}

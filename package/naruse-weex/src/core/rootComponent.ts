import type { BaseComponent } from './component';
let rootId = 0;

export const isRootComponent = (component: BaseComponent) => {
    if (!rootId) {
        rootId = component._naruseId;
        return true;
    }
    return rootId === component._naruseId;
}
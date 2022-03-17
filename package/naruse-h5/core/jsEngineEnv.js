import { naruseCreateElement } from '../components/index';
import * as Storage from '../api/storage/index';


const Naruse = { Storage };


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
};


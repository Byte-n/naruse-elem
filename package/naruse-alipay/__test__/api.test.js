import {
    Naruse
} from '../build/lib.js';
import {
    expect
} from 'chai';
import {
    describe,
    it,
    beforeEach
} from 'mocha'

global.my = {
    getImageInfo({ src, success, fail, complete }) {
        success({ width: 123, height: 321 });
    }
}


export const test = () => {
    describe('eventCenter', () => {
        Naruse.getImageInfo({
            src: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            success: (res) => {
                console.log(JSON.stringify(res));
            }
        })
    })
}



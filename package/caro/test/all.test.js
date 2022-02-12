import assert from 'assert'
import { fsyncSync } from 'fs';
import { getPathById, getVnodeById } from '../index.js'

const mockVnode = {
    id: 1,
    type: 'view',
    onClick: [
        {
            type: 'changeDom',
            targetId: 1,
            props: {
                style: { background: 'red' }
            }
        }
    ],
    style: { witdh: '100%', background: 'red' },
    childNodes: [
        {
            type: 'text',
            id: 2,
            childNodes: '{{ 123 }}',
        },
        {
            type: 'view',
            childNodes: [
                {
                    type: 'text',
                    id: 12,
                    childNodes: [
                        {
                            type: 'text',
                            id: 13,
                        },
                        {
                            type: 'text',
                            id: 21,
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            type: 'image',
            style: { position: 'fixed' },
            src: '../../snapshot.png'
        }
    ]
}


describe('caro 测试', () => {
    describe('getPathById', () => {
        it('查找不到vnode', () => {
            assert.deepEqual(getPathById('qwer', mockVnode), undefined);
        })
        it('查找第一层vnode', () => {
            assert.deepEqual(getPathById(1, mockVnode), []);
        })
        it('查找第第二层vnode', () => {
            assert.deepEqual(getPathById(2, mockVnode), [0]);
        })
        it('查找迭代两层vnode', () => {
            assert.deepEqual(getPathById(12, mockVnode), [1, 0]);
        })
        it('查找迭代三层vnode', () => {
            assert.deepEqual(getPathById(13, mockVnode), [1, 0, 0]);
        })
        it('查找迭代三层vnode2', () => {
            assert.deepEqual(getPathById(21, mockVnode), [1, 0, 1]);
        })
    })

    describe('getVnodeById', () => {
        it('查找不到vnode', () => {
            assert.deepEqual(getVnodeById('qwer', mockVnode), undefined);
        })
        it('查找第一层vnode', () => {
            assert.deepEqual(getVnodeById(1, mockVnode), mockVnode);
        })
        it('查找第第二层vnode', () => {
            assert.deepEqual(getVnodeById(2, mockVnode), mockVnode.childNodes[0]);
        })
        it('查找迭代两层vnode', () => {
            assert.deepEqual(getVnodeById(12, mockVnode), mockVnode.childNodes[1].childNodes[0]);
        })
        it('查找迭代三层vnode', () => {
            assert.deepEqual(getVnodeById(13, mockVnode), mockVnode.childNodes[1].childNodes[0].childNodes[0]);
        })
        it('查找迭代三层vnode2', () => {
            assert.deepEqual(getVnodeById(21, mockVnode), mockVnode.childNodes[1].childNodes[0].childNodes[1]);
        })
    })
});
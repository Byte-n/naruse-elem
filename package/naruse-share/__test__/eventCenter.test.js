import { EventBus, globalEvent } from '../index';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha'
describe('eventCenter', () => {

    let events, inst;

    beforeEach(() => {
        events = new Map();
        inst = EventBus(events);
    });

    describe('op', () => {
        it('can be new', () => {
            const newEvent = new EventBus();
            expect(newEvent).to.have.property('on').that.is.a('function');
            expect(newEvent).to.have.property('off').that.is.a('function');
            expect(newEvent).to.have.property('emit').that.is.a('function');
            expect(newEvent).to.have.property('clear').that.is.a('function');
        });
    });

    describe('on()', () => {
        it('should be a function', () => {
            expect(inst)
                .to.have.property('on')
                .that.is.a('function');
        });

        it('should register handler for new type', () => {
            const foo = () => { };
            inst.on('foo', foo);

            expect(events.get('foo')).to.deep.equal([foo]);
        });

        it('should register handlers for any type strings', () => {
            const foo = () => { };
            inst.on('constructor', foo);

            expect(events.get('constructor')).to.deep.equal([foo]);
        });

        it('should append handler for existing type', () => {
            const foo = () => { };
            const bar = () => { };
            inst.on('foo', foo);
            inst.on('foo', bar);

            expect(events.get('foo')).to.deep.equal([foo, bar]);
        });

        it('should NOT normalize case', () => {
            const foo = () => { };
            inst.on('FOO', foo);
            inst.on('Bar', foo);
            inst.on('baz:baT!', foo);

            expect(events.get('FOO')).to.deep.equal([foo]);
            expect(events.has('foo')).to.equal(false);
            expect(events.get('Bar')).to.deep.equal([foo]);
            expect(events.has('bar')).to.equal(false);
            expect(events.get('baz:baT!')).to.deep.equal([foo]);
        });

        it('should add duplicate listeners', () => {
            const foo = () => { };
            inst.on('foo', foo);
            inst.on('foo', foo);
            expect(events.get('foo')).to.deep.equal([foo, foo]);
        });
    });

    describe('off()', () => {
        it('should be a function', () => {
            expect(inst)
                .to.have.property('off')
                .that.is.a('function');
        });

        it('should remove handler for type', () => {
            const foo = () => { };
            inst.on('foo', foo);
            inst.off('foo', foo);

            expect(events.get('foo')).to.be.empty;
        });

        it('should NOT normalize case', () => {
            const foo = () => { };
            inst.on('FOO', foo);
            inst.on('Bar', foo);
            inst.on('baz:bat!', foo);

            inst.off('FOO', foo);
            inst.off('Bar', foo);
            inst.off('baz:baT!', foo);

            expect(events.get('FOO')).to.be.empty;
            expect(events.has('foo')).to.equal(false);
            expect(events.get('Bar')).to.be.empty;
            expect(events.has('bar')).to.equal(false);
            expect(events.get('baz:bat!')).to.have.lengthOf(1);
        });

        it('should remove only the first matching listener', () => {
            const foo = () => { };
            inst.on('foo', foo);
            inst.on('foo', foo);
            inst.off('foo', foo);
            expect(events.get('foo')).to.deep.equal([foo]);
            inst.off('foo', foo);
            expect(events.get('foo')).to.deep.equal([]);
        });

        it('off("type") should remove all handlers of the given type', () => {
            inst.on('foo', () => { });
            inst.on('foo', () => { });
            inst.on('bar', () => { });
            inst.off('foo');
            expect(events.get('foo')).to.deep.equal([]);
            expect(events.get('bar')).to.have.length(1);
            inst.off('bar');
            expect(events.get('bar')).to.deep.equal([]);
        });
    });

    describe('emit()', () => {
        it('should be a function', () => {
            expect(inst)
                .to.have.property('emit')
                .that.is.a('function');
        });

        it('should invoke handler for type', () => {
            const event = { a: 'b' };

            inst.on('foo', (one, two) => {
                expect(one).to.deep.equal(event);
                expect(two).to.be.an('undefined');
            });

            inst.emit('foo', event);
        });

        it('should invoke * handlers', () => {
            const star = () => { ea.c = 123 },
                ea = { a: 'a' };

            events.set('*', [star]);
            inst.emit('foo', ea);


            expect(ea.c).equal(123);
        });
    });

    describe('clear', () => {
        it('should be a function', () => {
            expect(inst)
                .to.have.property('clear')
                .that.is.a('function');
        })
        it('should clear all handlers', () => {
            inst.on('foo', () => { });
            inst.on('bar', () => { });
            inst.clear();
            expect(events.size).equal(0);
        })
    });
});


describe('globalEvent', () => {
    it('should has some properties', () => {
        expect(globalEvent)
            .to.have.property('on')
            .that.is.a('function');
        expect(globalEvent)
            .to.have.property('off')
            .that.is.a('function');
        expect(globalEvent)
            .to.have.property('emit')
            .that.is.a('function');
    });
    it('should can trigger', () => {
        const ea = {};
        const foo = (arg) => { arg.c = 123 };
        globalEvent.on('foo', foo);
        expect(ea.c).equal(undefined);

        globalEvent.emit('foo', ea);
        expect(ea.c).equal(123);

        ea.c = undefined;
        globalEvent.off('foo', foo);
        globalEvent.emit('foo', ea);
        expect(ea.c).equal(undefined);
    });
})
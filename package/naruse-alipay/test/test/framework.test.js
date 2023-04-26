import { describe, expect, it, mockFn, mount, sleep, unmount } from "./utils";
import { Naruse } from '../naruse-alipay/lib';

const mainTestStart = () => {
    describe('框架基础测试', () => {
        it('组件挂载与卸载测试', async () => {
            const fn1 = mockFn();
            const fn2 = mockFn();
            const fn3 = mockFn();
            class TestComponent extends Naruse.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        test: 1
                    }
                }

                componentDidMount = fn1;
                componentWillUnmount = fn2;
                render() {
                    return Naruse.createElement('view', {}, 'test');
                }
            }
            mount(TestComponent);
            await sleep(10);
            expect(fn1.isCalled()).to.equal(true);
            unmount();
            await sleep(10);
            expect(fn2.isCalled()).to.equal(true);
        });

        it('组件更新测试', async () => {
            const fn1 = mockFn();
            const fn2 = mockFn();
            const fn3 = mockFn();
            let self = null;
            class TestComponent extends Naruse.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        test: 1
                    }
                    self = this;
                }
                componentDidMount = fn1;
                componentDidUpdate = fn2;
                componentWillUnmount = fn3;
                render() {
                    return Naruse.createElement('view', {}, 'test');
                }
            }
            mount(TestComponent);
            await sleep(10);
            expect(fn1.isCalled()).to.equal(true);
            self.setState({ test: 2 });
            await sleep(10);
            expect(fn2.isCalled()).to.equal(true);
            unmount();
            await sleep(10);
            expect(fn3.isCalled()).to.equal(true);
        });

        it('组件更新测试之 setState 回调测试', async () => {
            const fn1 = mockFn();
            const fn2 = mockFn();
            const fn3 = mockFn();
            let self = null;
            class TestComponent extends Naruse.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        test: 1
                    }
                    self = this;
                }
                componentDidMount = fn1;
                componentDidUpdate = fn2;
                componentWillUnmount = fn3;
                render() {
                    return Naruse.createElement('view', {}, 'test');
                }
            }
            mount(TestComponent);
            await sleep(10);
            expect(fn1.isCalled()).to.equal(true);
            self.setState({ test: 2 }, fn2);
            await sleep(10);
            expect(fn2.isCalled()).to.equal(true);
            unmount();
            await sleep(10);
            expect(fn3.isCalled()).to.equal(true);
        })

        it('组件更新测试之 setState 多回调测试', async () => {
            const fn1 = mockFn();
            const fn2 = mockFn();
            const fn3 = mockFn();
            let self = null;
            class TestComponent extends Naruse.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        test: 1
                    }
                    self = this;
                }
                componentDidMount = fn1;
                componentDidUpdate = fn2;
                componentWillUnmount = fn3;
                render() {
                    return Naruse.createElement('view', {}, 'test');
                }
            }
            mount(TestComponent);
            await sleep(10);
            expect(fn1.isCalled()).to.equal(true);
            self.setState({ test: 2 }, fn2);
            self.setState({ test: 3 }, fn3);
            await sleep(10);
            expect(fn2.isCalled()).to.equal(true);
            expect(fn3.isCalled()).to.equal(true);
            expect(self.state.test).to.equal(3);
            unmount();
            await sleep(10);
            expect(fn3.isCalled()).to.equal(true);
        });


        it('组件更新测试 didupdate ', async () => {
            const fn1 = mockFn();
            const fn2 = mockFn();
            const fn3 = mockFn();
            let self = null;
            class TestComponent extends Naruse.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        test: 1
                    }
                    self = this;
                }
                componentDidMount = fn1;
                componentDidUpdate = fn2;
                componentWillUnmount = fn3;
                render() {
                    return Naruse.createElement('view', {}, 'test');
                }
            }
            mount(TestComponent);
            await sleep(10);
            expect(fn1.isCalled()).to.equal(true);
            self.setState({ test: 2 });
            await sleep(10);
            expect(fn2.isCalled()).to.equal(true);
            unmount();
            await sleep(10);
            expect(fn3.isCalled()).to.equal(true);
        });

    });

    describe('全局事件中心测试', () => {

        it('once 测试', () => {

            const fn1 = mockFn();

            Naruse.globalEvent.once('test', fn1);
            Naruse.globalEvent.emit('test');

            expect(fn1.isCalled()).to.equal(true);

            Naruse.globalEvent.emit('test');

            expect(fn1.getCount()).to.equal(1);
        })
    })
}

export { mainTestStart }

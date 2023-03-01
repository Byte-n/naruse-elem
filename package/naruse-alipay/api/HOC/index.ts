import { createElement } from '../../core/createElement';
import { NaruseComponent } from '../../core/component';
import { getPageInstance } from '../../core/page';
export const withPage = (component) => {
    return class extends NaruseComponent {
        render () {
            const page = getPageInstance(this.$updater && this.$updater.component);
            const currentPage = {
                route: page.route,
                events: {
                    on: page.on.bind(page),
                    off: page.off.bind(page),
                },
            };
            return createElement(component, { ...this.props, currentPage });
        }
    };
};

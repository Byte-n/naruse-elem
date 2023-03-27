import React from 'react';
import polyfill from 'react/lib/ReactCurrentOwner';

if (React.version.indexOf('15') === 0 && !React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
        ReactCurrentOwner: polyfill,
    };
}

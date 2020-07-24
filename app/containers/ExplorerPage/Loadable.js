/**
 *
 * Asynchronously loads the component for ExplorerPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

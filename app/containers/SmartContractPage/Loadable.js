/**
 *
 * Asynchronously loads the component for SmartContractPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

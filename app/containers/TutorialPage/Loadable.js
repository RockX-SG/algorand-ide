/**
 *
 * Asynchronously loads the component for TutorialPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

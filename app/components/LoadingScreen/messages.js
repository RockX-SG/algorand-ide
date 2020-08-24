/*
 * LoadingScreen Messages
 *
 * This contains all the text for the LoadingScreen component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoadingScreen';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoadingScreen component!',
  },
});

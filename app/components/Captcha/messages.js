/*
 * Captcha Messages
 *
 * This contains all the text for the Captcha component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Captcha';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Captcha component!',
  },
});

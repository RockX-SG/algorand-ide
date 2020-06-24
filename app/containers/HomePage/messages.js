/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  smartContract: {
    id: `${scope}.smartContract`,
    defaultMessage: 'Smart Contract (ASC) Deployment',
  },
  smartAsset: {
    id: `${scope}.smartAsset`,
    defaultMessage: 'Smart Asset (ASA) Deployment',
  },
  tutorial: {
    id: `${scope}.tutorial`,
    defaultMessage: 'Tutorials',
  },
  wallet: {
    id: `${scope}.wallet`,
    defaultMessage: 'Wallet',
  },
});

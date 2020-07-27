import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingsPage state domain
 */

const selectSettingsPageDomain = state => state.settingsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingsPage
 */

const makeSelectSettingsPage = () =>
  createSelector(
    selectSettingsPageDomain,
    substate => substate,
  );

const makeSelectPureStake = () =>
  createSelector(
    selectSettingsPageDomain,
    substate => substate.enablePureStake,
  );

// export default makeSelectSettingsPage;
export {
  makeSelectSettingsPage,
  selectSettingsPageDomain,
  makeSelectPureStake,
};

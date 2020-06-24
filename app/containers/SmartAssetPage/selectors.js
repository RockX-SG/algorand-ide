import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the smartAssetPage state domain
 */

const selectSmartAssetPageDomain = state =>
  state.smartAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SmartAssetPage
 */

const makeSelectSmartAssetPage = () =>
  createSelector(
    selectSmartAssetPageDomain,
    substate => substate,
  );

export {
  selectSmartAssetPageDomain,
  makeSelectSmartAssetPage
};

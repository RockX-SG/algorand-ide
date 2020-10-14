import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsRevokeAssetPage state domain
 */

const selectTutorialJsRevokeAssetPageDomain = state =>
  state.tutorialJsRevokeAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsRevokeAssetPage
 */

const makeSelectTutorialJsRevokeAssetPage = () =>
  createSelector(
    selectTutorialJsRevokeAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsRevokeAssetPage;
export { selectTutorialJsRevokeAssetPageDomain };

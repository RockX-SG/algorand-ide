import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsOptInAssetPage state domain
 */

const selectTutorialJsOptInAssetPageDomain = state =>
  state.tutorialJsOptInAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsOptInAssetPage
 */

const makeSelectTutorialJsOptInAssetPage = () =>
  createSelector(
    selectTutorialJsOptInAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsOptInAssetPage;
export { selectTutorialJsOptInAssetPageDomain };

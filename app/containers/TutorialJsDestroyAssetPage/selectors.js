import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsDestroyAssetPage state domain
 */

const selectTutorialJsDestroyAssetPageDomain = state =>
  state.tutorialJsDestroyAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsDestroyAssetPage
 */

const makeSelectTutorialJsDestroyAssetPage = () =>
  createSelector(
    selectTutorialJsDestroyAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsDestroyAssetPage;
export { selectTutorialJsDestroyAssetPageDomain };

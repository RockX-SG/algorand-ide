import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsCreateAssetPage state domain
 */

const selectTutorialJsCreateAssetPageDomain = state =>
  state.tutorialJsCreateAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsCreateAssetPage
 */

const makeSelectTutorialJsCreateAssetPage = () =>
  createSelector(
    selectTutorialJsCreateAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsCreateAssetPage;
export { selectTutorialJsCreateAssetPageDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsFreezeAssetPage state domain
 */

const selectTutorialJsFreezeAssetPageDomain = state =>
  state.tutorialJsFreezeAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsFreezeAssetPage
 */

const makeSelectTutorialJsFreezeAssetPage = () =>
  createSelector(
    selectTutorialJsFreezeAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsFreezeAssetPage;
export { selectTutorialJsFreezeAssetPageDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsTransferAssetPage state domain
 */

const selectTutorialJsTransferAssetPageDomain = state =>
  state.tutorialJsTransferAssetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsTransferAssetPage
 */

const makeSelectTutorialJsTransferAssetPage = () =>
  createSelector(
    selectTutorialJsTransferAssetPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsTransferAssetPage;
export { selectTutorialJsTransferAssetPageDomain };

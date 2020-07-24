import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsLimitOrderPage state domain
 */

const selectTutorialJsLimitOrderPageDomain = state =>
  state.tutorialJsLimitOrderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsLimitOrderPage
 */

const makeSelectTutorialJsLimitOrderPage = () =>
  createSelector(
    selectTutorialJsLimitOrderPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsLimitOrderPage;
export { selectTutorialJsLimitOrderPageDomain };

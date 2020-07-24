import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsCreateAccountPage state domain
 */

const selectTutorialJsCreateAccountPageDomain = state =>
  state.tutorialJsCreateAccountPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsCreateAccountPage
 */

const makeSelectTutorialJsCreateAccountPage = () =>
  createSelector(
    selectTutorialJsCreateAccountPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsCreateAccountPage;
export { selectTutorialJsCreateAccountPageDomain };

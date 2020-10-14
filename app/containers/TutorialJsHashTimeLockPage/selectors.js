import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsHashTimeLockPage state domain
 */

const selectTutorialJsHashTimeLockPageDomain = state =>
  state.tutorialJsHashTimeLockPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsHashTimeLockPage
 */

const makeSelectTutorialJsHashTimeLockPage = () =>
  createSelector(
    selectTutorialJsHashTimeLockPageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsHashTimeLockPage;
export { selectTutorialJsHashTimeLockPageDomain };

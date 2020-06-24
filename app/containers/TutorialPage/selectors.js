import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialPage state domain
 */

const selectTutorialPageDomain = state => state.tutorialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialPage
 */

const makeSelectTutorialPage = () =>
  createSelector(
    selectTutorialPageDomain,
    substate => substate,
  );

export default makeSelectTutorialPage;
export { selectTutorialPageDomain };

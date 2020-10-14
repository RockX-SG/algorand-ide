import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialJsWriteTransactionNotePage state domain
 */

const selectTutorialJsWriteTransactionNotePageDomain = state =>
  state.tutorialJsWriteTransactionNotePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialJsWriteTransactionNotePage
 */

const makeSelectTutorialJsWriteTransactionNotePage = () =>
  createSelector(
    selectTutorialJsWriteTransactionNotePageDomain,
    substate => substate,
  );

export default makeSelectTutorialJsWriteTransactionNotePage;
export { selectTutorialJsWriteTransactionNotePageDomain };

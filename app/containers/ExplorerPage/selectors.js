import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the explorerPage state domain
 */

const selectExplorerPageDomain = state => state.explorerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExplorerPage
 */

const makeSelectExplorerPage = () =>
  createSelector(
    selectExplorerPageDomain,
    substate => substate,
  );

export default makeSelectExplorerPage;
export { selectExplorerPageDomain };

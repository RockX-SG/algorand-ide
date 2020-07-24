import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionPage state domain
 */

const selectTransactionPageDomain = state =>
  state.transactionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionPage
 */

const makeSelectTransactionPage = () =>
  createSelector(
    selectTransactionPageDomain,
    substate => substate,
  );

export default makeSelectTransactionPage;
export { selectTransactionPageDomain };

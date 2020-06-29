import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the smartContractPage state domain
 */

const selectSmartContractPageDomain = state =>
  state.smartContractPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SmartContractPage
 */

const makeSelectSmartContractPage = () =>
  createSelector(
    selectSmartContractPageDomain,
    substate => substate,
  );

const makeSelectCodeValue = () =>
   createSelector(
     selectSmartContractPageDomain,
     substate => substate.codeValue,
   );

 const makeSelectCodeCompileResponse = () =>
    createSelector(
      selectSmartContractPageDomain,
      substate => substate.codeCompileAddress,
    );


export {
  selectSmartContractPageDomain,
  makeSelectSmartContractPage,
  makeSelectCodeValue,
  makeSelectCodeCompileResponse
};

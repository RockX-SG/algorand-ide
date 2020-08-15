// import produce from 'immer';
import smartAssetPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('smartAssetPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      formSubmitted: false,
      inputNote: undefined,
      inputAddress: "VBW6SN2L5Z3AJTBEXLOZGOP4I2BCFYU34IC4HGKYOB25YQ3ICYOEO275KE",
      inputDefaultFrozen: false,
      inputTotalIssuance: 1000,
      inputUnitName: "TEST",
      inputAssetName: "test",
      inputAssetURL: "http://test.com",
      inputAssetMetadataHash: "16efaa3924a6fd9d3a4824799a4ac65d",
      inputManager: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
      inputReserve: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
      inputFreeze: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
      inputClawback: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
      txID: "-",
      assetID: "-",
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(smartAssetPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});

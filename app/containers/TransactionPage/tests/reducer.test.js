// import produce from 'immer';
import transactionPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('transactionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      sendAsaStep: 1,
      atomicStep: 1,
      assetBalance: 0,
      assetError: "",
      inputSendAmount: 0,
      inputSendAsaAmount: 0,
      inputAssetId: "",
      sendTxHash: "-",
      sendAsaTxHash: "-",
      optInTxHash: "-",
      routeSenders: [
        {},
        {}
      ],
      routeReceivers: [
        {},
        {}
      ],
      routeAmount: [
        {},
        {}
      ],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(transactionPageReducer(undefined, {})).toEqual(expectedResult);
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

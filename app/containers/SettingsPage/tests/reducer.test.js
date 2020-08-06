// import produce from 'immer';
import settingsPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('settingsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      serverAddress: 'http://127.0.0.1',
      serverPort: '5555',
      algodToken: '',
      enablePureStake: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(settingsPageReducer(undefined, {})).toEqual(expectedResult);
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

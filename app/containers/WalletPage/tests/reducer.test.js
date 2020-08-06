// import produce from 'immer';
import walletPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('walletPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      selectedAccount: "",
      address: "",
      addressShorten: "",
      mnemonic: "",
      balance: 0,
      assetBalance: 0,
      walletNumCount: 3,
      walletArray: [],
      addressArray: [],
      addressShortenArray: [],
      mnemonicArray: [],
      balanceArray: [],
      addressPrimary: "",
      addressSecondary: "",
      addressShortenPrimary: "",
      addressShortenSecondary: "",
      mnemonicPrimary: "",
      mnemonicSecondary: "",
      balancePrimary: 0,
      balanceSecondary: 0,
      inputAddress: "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM",
      inputAmount: "",
      faucetBalance: 0,
      faucetSendTxHash: "-",
      userSendTxHash: "-",
      addressList: [],
      network: "testnet",
      dropdownStatus: false,
      mnemonicRestore: "",
      currentPage: "explorer",
      captchaData: "",
      assetId: ""
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(walletPageReducer(undefined, {})).toEqual(expectedResult);
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

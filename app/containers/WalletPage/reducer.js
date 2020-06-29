/*
 *
 * WalletPage reducer
 *
 */
import produce from 'immer';
import {
  GENERATE_ACCOUNT_PRIMARY_SUCCESS,
  GENERATE_ACCOUNT_SECONDARY_SUCCESS,
  SEND_TRANSACTION_SUCCESS,
  CHANGE_ADDRESS,
  CHANGE_AMOUNT,
  GET_FAUCET_BALANCE_SUCCESS,
  TOGGLE_SELECTED_ACCOUNT,
  CHANGE_NETWORK
} from './constants';

export const initialState = {
  selectedAccount: 1,
  address: "",
  addressShorten: "",
  mnemonic: "",
  balance: 0,
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
  faucetSendTxHash: "",
  userSendTxHash: "",
  addressList: [],
  network: "testnet"
};

/* eslint-disable default-case, no-param-reassign */
const walletPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GENERATE_ACCOUNT_PRIMARY_SUCCESS:
        draft.addressPrimary = action.address;
        draft.addressShortenPrimary = action.addressShorten;
        draft.mnemonicPrimary = action.mnemonic;
        draft.balancePrimary = action.balance/1000000;
        draft.addressList[0] = action.address;

        if(draft.selectedAccount == 1){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }

        console.log("GENERATE_ACCOUNT_PRIMARY_SUCCESS");

        break;

      case GENERATE_ACCOUNT_SECONDARY_SUCCESS:
        draft.addressSecondary = action.address;
        draft.addressShortenSecondary = action.addressShorten;
        draft.mnemonicSecondary = action.mnemonic;
        draft.balanceSecondary = action.balance/1000000;
        draft.addressList[1] = action.address;

        if(draft.selectedAccount == 2){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }

        console.log("GENERATE_ACCOUNT_SECONDARY_SUCCESS");

        break;

      case GET_FAUCET_BALANCE_SUCCESS:
        draft.faucetBalance = action.balance/1000000;

        break;

      case TOGGLE_SELECTED_ACCOUNT:
        console.log("draft.selectedAccount", draft.selectedAccount);
        if(draft.selectedAccount == 1){
          draft.selectedAccount = 2;
        }else{
          draft.selectedAccount = 1;
        }

        break;

      case CHANGE_ADDRESS:
        draft.inputAddress = action.address;

        break;

      case CHANGE_AMOUNT:
        draft.inputAmount = action.amount;

        break;

      case SEND_TRANSACTION_SUCCESS:
        draft.faucetSendTxHash = action.txHash;
        draft.userSendTxHash = action.txHash;

        break;

      case CHANGE_NETWORK:
        draft.network = action.network;

        break;
        
        

    }
  });

export default walletPageReducer;

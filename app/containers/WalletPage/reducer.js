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
  CHANGE_NETWORK,
  SELECT_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  TOGGLE_DROPDOWN,
  SELECT_PAGE,
  RECAPTCHA_CHANGE
} from './constants';

export const initialState = {
  selectedAccount: "",
  address: "",
  addressShorten: "",
  mnemonic: "",
  balance: 0,
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
  captchaData: ""
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
        
        draft.addressArray[0] = action.address;
        draft.addressShortenArray[0] = action.addressShorten;
        draft.mnemonicArray[0] = action.mnemonic;
        draft.balanceArray[0] = action.balance/1000000;
        // draft.walletFullArray[0] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        if(draft.selectedAccount == action.address || draft.selectedAccount == ""){
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
        
        
        draft.addressArray[1] = action.address;
        draft.addressShortenArray[1] = action.addressShorten;
        draft.mnemonicArray[1] = action.mnemonic;
        draft.balanceArray[1] = action.balance/1000000;
        // draft.walletFullArray[1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        if(draft.selectedAccount == action.address){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }
        

        console.log("GENERATE_ACCOUNT_SECONDARY_SUCCESS");

        break;

      case ADD_ACCOUNT_SUCCESS:
      
        // draft.walletArray[draft.walletArray.length] = action.address;
        
        draft.addressArray[draft.addressArray.length] = action.address;
        draft.addressShortenArray[draft.addressShortenArray.length] = action.addressShorten;
        draft.mnemonicArray[draft.mnemonicArray.length] = action.mnemonic;
        draft.balanceArray[draft.balanceArray.length] = action.balance/1000000;
        
        // draft.walletFullArray[walletFullArray.length - 1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        
        break;

      case TOGGLE_DROPDOWN:
        draft.dropdownStatus = action.status;

        break;

      case SELECT_PAGE:
        draft.currentPage = action.page;

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

      case SELECT_ACCOUNT:
        draft.selectedAccount = action.address;

        console.log("SELECT_ACCOUNT", action.address);

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

      case RECAPTCHA_CHANGE:
        draft.captchaData = action.captchaData;

        break;
        
        

    }
  });

export default walletPageReducer;

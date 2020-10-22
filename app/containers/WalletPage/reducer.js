/*
 *
 * WalletPage reducer
 *
 */
import produce from 'immer';
import {
  GENERATE_ACCOUNT_PRIMARY_SUCCESS,
  GENERATE_ACCOUNT_SECONDARY_SUCCESS,
  GENERATE_ACCOUNT_TERTIARY_SUCCESS,
  GENERATE_ACCOUNT_QUARTERNARY_SUCCESS,
  GENERATE_ACCOUNT_QUINARY_SUCCESS,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,
  CHANGE_ADDRESS,
  CHANGE_AMOUNT,
  GET_FAUCET_BALANCE_SUCCESS,
  TOGGLE_SELECTED_ACCOUNT,
  CHANGE_NETWORK,
  SELECT_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  TOGGLE_DROPDOWN,
  SELECT_PAGE,
  RECAPTCHA_CHANGE,
  MNEMONIC_REGENERATE_SUCCESS,
  LOADING,
  LOADED,
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
  CHANGE_SETTINGS,
} from './constants';

export const initialState = {
  loading: false,
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
  addressTertiary: "",
  addressQuarternary: "",
  addressQuinary: "",
  addressShortenPrimary: "",
  addressShortenSecondary: "",
  addressShortenTertiary: "",
  addressShortenQuarternary: "",
  addressShortenQuinary: "",
  mnemonicPrimary: "",
  mnemonicSecondary: "",
  mnemonicTertiary: "",
  mnemonicQuarternary: "",
  mnemonicQuinary: "",
  balancePrimary: 0,
  balanceSecondary: 0,
  balanceTertiary: 0,
  balanceQuarternary: 0,
  balanceQuinary: 0,
  inputAddress: "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM",
  inputAmount: "",
  faucetBalance: 0,
  faucetSendTxHash: "-",
  faucetSendError: "-",
  userSendTxHash: "-",
  addressList: [],
  network: "testnet",
  explorer: "https://testnet.algoexplorer.io/",
  dropdownStatus: false,
  mnemonicRestore: "",
  currentPage: "explorer",
  captchaData: "",
  assetId: "",
  serverAddress: '',
  serverPort: '',
  algodToken: '',
  enablePureStake: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOADING:
        draft.loading = true;

        break;
        
      case LOADED:
        draft.loading = false;

        break;
        
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

      case GENERATE_ACCOUNT_TERTIARY_SUCCESS:
        draft.addressTertiary = action.address;
        draft.addressShortenTertiary = action.addressShorten;
        draft.mnemonicTertiary = action.mnemonic;
        draft.balanceTertiary = action.balance/1000000;
        draft.addressList[2] = action.address;
        
        
        draft.addressArray[2] = action.address;
        draft.addressShortenArray[2] = action.addressShorten;
        draft.mnemonicArray[2] = action.mnemonic;
        draft.balanceArray[2] = action.balance/1000000;
        // draft.walletFullArray[1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        if(draft.selectedAccount == action.address){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }
        

        console.log("GENERATE_ACCOUNT_TERTIARY_SUCCESS");

        break;

      case GENERATE_ACCOUNT_QUARTERNARY_SUCCESS:
        draft.addressQuarternary = action.address;
        draft.addressShortenQuarternary = action.addressShorten;
        draft.mnemonicQuarternary = action.mnemonic;
        draft.balanceQuarternary = action.balance/1000000;
        draft.addressList[3] = action.address;
        
        
        draft.addressArray[3] = action.address;
        draft.addressShortenArray[3] = action.addressShorten;
        draft.mnemonicArray[3] = action.mnemonic;
        draft.balanceArray[3] = action.balance/1000000;
        // draft.walletFullArray[1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        if(draft.selectedAccount == action.address){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }
        

        console.log("GENERATE_ACCOUNT_QUARTERNARY_SUCCESS");

        break;

      case GENERATE_ACCOUNT_QUINARY_SUCCESS:
        draft.addressQuinary = action.address;
        draft.addressShortenQuinary = action.addressShorten;
        draft.mnemonicQuinary = action.mnemonic;
        draft.balanceQuinary = action.balance/1000000;
        draft.addressList[4] = action.address;
        
        
        draft.addressArray[4] = action.address;
        draft.addressShortenArray[4] = action.addressShorten;
        draft.mnemonicArray[4] = action.mnemonic;
        draft.balanceArray[4] = action.balance/1000000;
        // draft.walletFullArray[1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        if(draft.selectedAccount == action.address){
          draft.address = action.address;
          draft.addressShorten = action.addressShorten;
          draft.mnemonic = action.mnemonic;
          draft.balance = action.balance/1000000;
        }
        

        console.log("GENERATE_ACCOUNT_QUINARY_SUCCESS");

        break;

      case ADD_ACCOUNT_SUCCESS:
      
        // draft.walletArray[draft.walletArray.length] = action.address;
        
        draft.addressArray[draft.addressArray.length] = action.address;
        draft.addressShortenArray[draft.addressShortenArray.length] = action.addressShorten;
        draft.mnemonicArray[draft.mnemonicArray.length] = action.mnemonic;
        draft.balanceArray[draft.balanceArray.length] = action.balance/1000000;
        
        // draft.walletFullArray[walletFullArray.length - 1] = [action.address, action.addressShorten, action.mnemonic, action.balance/1000000];
        
        
        break;

      case MNEMONIC_REGENERATE_SUCCESS:
      
        // draft.walletArray[draft.walletArray.length] = action.address;
        
        draft.addressArray[action.accountNum] = action.address;
        draft.addressShortenArray[action.accountNum] = action.addressShorten;
        draft.mnemonicArray[action.accountNum] = action.mnemonic;
        draft.balanceArray[action.accountNum] = action.balance/1000000;
        
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
        draft.address = action.address;

        console.log("SELECT_ACCOUNT", action.address);

        break;
        
      

      case CHANGE_ADDRESS:
        try{
          draft.inputAddress = action.address["value"];
        }catch(err){
          draft.inputAddress = "";
        }

        break;

      case CHANGE_AMOUNT:
        draft.inputAmount = action.amount;

        break;

      case SEND_TRANSACTION_SUCCESS:
        if(action.sendFrom == "user"){
          draft.faucetSendTxHash = "-";
          draft.userSendTxHash = action.txHash;
        }else if(action.sendFrom == "faucet"){
          draft.faucetSendTxHash = action.txHash;
          draft.userSendTxHash = "-";
        }else{
          
        }

        break;
        
      case SEND_TRANSACTION_ERROR:
        if(action.sendFrom == "user"){
          
        }else if(action.sendFrom == "faucet"){
          draft.faucetSendError = action.error;
        }else{
          
        }

        break;

      case CHANGE_NETWORK:
        draft.network = action.network;
        if(action.network == "mainnet"){
          draft.explorer = "https://algoexplorer.io/";
        }else if(action.network == "testnet"){
          draft.explorer = "https://testnet.algoexplorer.io/";
        }else if(action.network == "betanet"){
          draft.explorer = "https://betanet.algoexplorer.io/";
        }

        break;

      case RECAPTCHA_CHANGE:
        draft.captchaData = action.captchaData;

        break;

      case CHANGE_SERVER_ADDRESS:
        console.log("action.serverAddress", action.serverAddress)
        draft.serverAddress = action.serverAddress;
        break;

      case CHANGE_SERVER_PORT:
        draft.serverPort = action.serverPort;
        break;

      case CHANGE_ALGOD_TOKEN:
        draft.algodToken = action.algodToken;
        break;

      case CHANGE_SETTINGS:
        draft.enablePureStake = !draft.enablePureStake;
        break;
        
        

    }
  });

export default walletPageReducer;

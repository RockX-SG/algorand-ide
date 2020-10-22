/*
 *
 * TransactionPage reducer
 *
 */
import produce from 'immer';
import { 
  ADD_ROUTE,
  CONFIRM_ASSET_ID,
  CONFIRM_ASSET_ID_SUCCESS,
  CONFIRM_ASSET_ID_ERROR,
  CHANGE_ASSET_ID,
  CHANGE_SEND_AMOUNT,
  CHANGE_SEND_ASA_AMOUNT,
  SEND_ASA_TRANSACTION,
  SEND_ASA_TRANSACTION_SUCCESS,
  SEND_ASA_TRANSACTION_ERROR,
  OPT_IN_ASA_SUCCESS,
  CHANGE_ATOMIC_AMOUNT,
  CHANGE_ATOMIC_SENDER_ADDRESS,
  CHANGE_ATOMIC_RECEIVER_ADDRESS,
  CHANGE_ATOMIC_ASSET_TYPE,
  CHANGE_ATOMIC_ASSET_ID,
  CONFIRM_ATOMIC_ROUTE,
  CONFIRM_ATOMIC_ROUTE_SUCCESS,
  CONFIRM_ATOMIC_ROUTE_ERROR,
  SIGN_ROUTE,
  SIGN_ROUTE_SUCCESS,
  SEND_ATOMIC_TRANSFER,
  SEND_ATOMIC_TRANSFER_SUCCESS,
  CHANGE_ADDRESS
} from './constants';

export const initialState = {
  sendAsaStep: 1,
  atomicStep: 1,
  assetBalance: 0,
  assetError: "",
  inputSendAmount: 0,
  inputSendAsaAmount: 0,
  inputAssetId: "",
  sendTxHash: "-",
  sendAsaTxHash: "-",
  sendAtomicTxHash: "-",
  optInTxHash: "-",
  routeSenders: [
    [],
    [],
  ],
  atomicTxn: [],
  atomicKey: [],
  atomicTxGroup: "",
  atomicSignedTxn: [],
  inputAddress: ""
};

/* eslint-disable default-case, no-param-reassign */
const transactionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_ROUTE:
        if(draft.routeSenders.length < 10){
          draft.routeSenders.push([])
        }
      
        break;
        
      case SIGN_ROUTE:
        // draft.routeSenders[action.entryIndex][2] = action.amount;
      
        break;
        
      case SIGN_ROUTE_SUCCESS:
        draft.atomicSignedTxn[action.index] = action.signedTx;
        console.log("draft.atomicSignedTxn", draft.atomicSignedTxn);
      
        break;
        
      case SEND_ATOMIC_TRANSFER_SUCCESS:
        draft.sendAtomicTxHash = action.txHash;
      
        break;
        
        
      case CHANGE_ATOMIC_ASSET_ID:
        draft.routeSenders[action.entryIndex][4] = action.assetId;
      
        break;
        
      case CHANGE_ATOMIC_ASSET_TYPE:
        draft.routeSenders[action.entryIndex][3] = action.assetType;
      
        break;
        
      case CHANGE_ATOMIC_AMOUNT:
        draft.routeSenders[action.entryIndex][2] = action.amount;
      
        break;
        
      case CHANGE_ATOMIC_SENDER_ADDRESS:
        draft.routeSenders[action.entryIndex][0] = action.address;
      
        break;
      case CHANGE_ATOMIC_RECEIVER_ADDRESS:
        draft.routeSenders[action.entryIndex][1] = action.address;
      
        break;
        
      case CONFIRM_ASSET_ID:
        draft.sendAsaStep = 2;
      
        break;
        
      case CONFIRM_ATOMIC_ROUTE:
        draft.atomicStep = 2;
      
        break;
        
      case CONFIRM_ATOMIC_ROUTE_SUCCESS:
        draft.atomicTxn = action.atomicTxn;
        draft.atomicKey = action.atomicKey;
      
        break;
        
      case CONFIRM_ASSET_ID_SUCCESS:
        draft.assetBalance = action.balance;
        console.log("action.balance", action.balance);
      
        break;
        
      case CONFIRM_ASSET_ID_ERROR:
        draft.assetError = action.err;
      
        break;
        
      case CHANGE_ASSET_ID:
        draft.inputAssetId = action.id;
      
        break;
        
      case OPT_IN_ASA_SUCCESS:
        draft.optInTxHash = action.txHash;
      
        break;
        
        
      case CHANGE_SEND_AMOUNT:
        draft.inputSendAmount = action.amount;
      
        break;
        
      case CHANGE_SEND_ASA_AMOUNT:
        draft.inputSendAsaAmount = action.amount;
      
        break;
        
      case SEND_ASA_TRANSACTION_SUCCESS:
        draft.sendAsaTxHash = action.txHash;
        draft.assetBalance -= draft.inputSendAsaAmount;
      
        break;
        
      case CHANGE_ADDRESS:
        draft.inputAddress = action.address;

        break;
        
    }
  });

export default transactionPageReducer;

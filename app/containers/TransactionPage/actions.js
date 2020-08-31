/*
 *
 * TransactionPage actions
 *
 */

import { 
  ADD_ROUTE,
  CHANGE_ASSET_ID,
  CONFIRM_ASSET_ID,
  CONFIRM_ASSET_ID_SUCCESS,
  CONFIRM_ASSET_ID_ERROR,
  CHANGE_SEND_AMOUNT,
  CHANGE_SEND_ASA_AMOUNT,
  SEND_ASA_TRANSACTION,
  SEND_ASA_TRANSACTION_SUCCESS,
  SEND_ASA_TRANSACTION_ERROR,
  OPT_IN_ASA,
  OPT_IN_ASA_SUCCESS,
  CHANGE_ATOMIC_AMOUNT,
  CHANGE_ATOMIC_SENDER_ADDRESS,
  CHANGE_ATOMIC_RECEIVER_ADDRESS,
  CONFIRM_ATOMIC_ROUTE,
  CONFIRM_ATOMIC_ROUTE_SUCCESS,
  CONFIRM_ATOMIC_ROUTE_ERROR,
  SIGN_ROUTE,
  SIGN_ROUTE_SUCCESS,
  SIGN_ROUTE_ERROR,
  SEND_ATOMIC_TRANSFER,
  SEND_ATOMIC_TRANSFER_SUCCESS,
  SEND_ATOMIC_TRANSFER_ERROR
} from './constants';

export function addRoute() {
  return {
    type: ADD_ROUTE,
  };
}

export function signRoute(index) {
  console.log("index", index)
  return {
    type: SIGN_ROUTE,
    index
  };
}

export function signRouteSuccess(index, signedTx) {
  return {
    type: SIGN_ROUTE_SUCCESS,
    index,
    signedTx
  };
}

export function signRouteError() {
  return {
    type: SIGN_ROUTE_ERROR,
  };
}

export function sendAtomicTransfer() {
  return {
    type: SEND_ATOMIC_TRANSFER
  };
}

export function sendAtomicTransferSuccess(txHash) {
  return {
    type: SEND_ATOMIC_TRANSFER_SUCCESS,
    txHash
  };
}

export function sendAtomicTransferError() {
  return {
    type: SEND_ATOMIC_TRANSFER_ERROR,
  };
}



export function confirmAtomicRoute(){
  return {
    type: CONFIRM_ATOMIC_ROUTE,
  };
}

export function confirmAtomicRouteSuccess(atomicTxn, atomicKey){
  return {
    type: CONFIRM_ATOMIC_ROUTE_SUCCESS,
    atomicTxn, 
    atomicKey
  };
}

export function changeAtomicAmount(evt) {
  console.log("evt", evt.target);
  console.log("evt", evt.target.name);
  console.log("evt", evt.target.value);
  
  let indexCheck = evt.target.name.split("_");
  
  return {
    type: CHANGE_ATOMIC_AMOUNT,
    entryIndex: indexCheck[1],
    amount: evt.target.value,
  };
}

export function changeAtomicSenderAddress(response) {
  console.log("response", response);
  
  return {
    type: CHANGE_ATOMIC_SENDER_ADDRESS,
    entryIndex: response[1],
    address: response[0]["label"],
  };
}

export function changeAtomicReceiverAddress(response) {
  console.log("response", response);
  
  return {
    type: CHANGE_ATOMIC_RECEIVER_ADDRESS,
    entryIndex: response[1],
    address: response[0]["label"],
  };
}

export function changeAssetId(id) {
  return {
    type: CHANGE_ASSET_ID,
    id
  };
}

export function confirmAssetId() {
  return {
    type: CONFIRM_ASSET_ID,
  };
}

export function confirmAssetIdSuccess(balance) {
  return {
    type: CONFIRM_ASSET_ID_SUCCESS,
    balance
  };
}

export function confirmAssetIdError(err) {
  return {
    type: CONFIRM_ASSET_ID_ERROR,
    err
  };
}


export function changeSendAmount(amount) {
  return {
    type: CHANGE_SEND_AMOUNT,
    amount
  };
}

export function changeSendAsaAmount(amount) {
  return {
    type: CHANGE_SEND_ASA_AMOUNT,
    amount
  };
}

export function sendAsaTransaction() {
  console.log("SEND_ASA_TRANSACTION");
  return {
    type: SEND_ASA_TRANSACTION
  };
}

export function sendAsaTransactionSuccess(txHash) {
  return {
    type: SEND_ASA_TRANSACTION_SUCCESS,
    txHash
  };
}

export function sendAsaTransactionError() {
  return {
    type: SEND_ASA_TRANSACTION_ERROR
  };
}

export function optInAsa() {
  return {
    type: OPT_IN_ASA
  };
}

export function optInAsaSuccess(txHash) {
  return {
    type: OPT_IN_ASA_SUCCESS,
    txHash
  };
}




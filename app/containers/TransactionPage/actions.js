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
  OPT_IN_ASA_SUCCESS
} from './constants';

export function addRoute() {
  return {
    type: ADD_ROUTE,
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




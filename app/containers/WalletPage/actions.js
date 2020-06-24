/*
 *
 * WalletPage actions
 *
 */

import {
  GENERATE_ACCOUNT_PRIMARY,
  GENERATE_ACCOUNT_SECONDARY,
  GENERATE_ACCOUNT_PRIMARY_SUCCESS,
  GENERATE_ACCOUNT_SECONDARY_SUCCESS,
  GENERATE_ACCOUNT_ERROR,
  RESTORE_ACCOUNT_PRIMARY,
  RESTORE_ACCOUNT_SECONDARY,
  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,
  CHANGE_ADDRESS,
  CHANGE_AMOUNT,
  GET_FAUCET_BALANCE,
  GET_FAUCET_BALANCE_SUCCESS,
  GET_FAUCET_BALANCE_ERROR,
  TOGGLE_SELECTED_ACCOUNT
} from './constants';

export function generateAccountPrimary() {
  console.log("generateAccountPrimary")
  return {
    type: GENERATE_ACCOUNT_PRIMARY,
  };
}

export function generateAccountSecondary() {
  console.log("generateAccountSecondary")
  return {
    type: GENERATE_ACCOUNT_SECONDARY,
  };
}

export function generateAccountPrimarySuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: GENERATE_ACCOUNT_PRIMARY_SUCCESS,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}

export function generateAccountSecondarySuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: GENERATE_ACCOUNT_SECONDARY_SUCCESS,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}

export function generateAccountError() {
  return {
    type: GENERATE_ACCOUNT_ERROR,
  };
}

export function restoreAccountPrimary(data) {
  console.log("restoreAccountPrimary")
  return {
    type: RESTORE_ACCOUNT_PRIMARY,
    mnemonic: data[0],
    address: data[1],
  };
}

export function restoreAccountSecondary(data) {
  console.log("restoreAccountSecondary")
  return {
    type: RESTORE_ACCOUNT_SECONDARY,
    mnemonic: data[0],
    address: data[1],
  };
}




export function faucetSend() {
  return {
    type: SEND_TRANSACTION,
    sendFrom: "faucet",
  };
}

export function sendTransaction() {
  return {
    type: SEND_TRANSACTION,
    sendFrom: "user",
  };
}

export function sendTransactionSuccess(txHash) {
  return {
    type: SEND_TRANSACTION_SUCCESS,
    txHash
  };
}

export function sendTransactionError() {
  return {
    type: SEND_TRANSACTION_ERROR,
  };
}

export function changeAddress(address) {
  return {
    type: CHANGE_ADDRESS,
    address
  };
}

export function changeAmount(amount) {
  return {
    type: CHANGE_AMOUNT,
    amount
  };
}


export function getFaucetBalance() {
  return {
    type: GET_FAUCET_BALANCE,
  };
}

export function getFaucetBalanceSuccess(balance) {
  return {
    type: GET_FAUCET_BALANCE_SUCCESS,
    balance
  };
}

export function getFaucetBalanceError() {
  return {
    type: GET_FAUCET_BALANCE_ERROR,
  };
}


export function toggleSelectedAccount() {
  return {
    type: TOGGLE_SELECTED_ACCOUNT,
  };
}

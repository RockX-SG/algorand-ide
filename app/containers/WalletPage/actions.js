/*
 *
 * WalletPage actions
 *
 */

import {
  LOADING,
  LOADED,
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
  TOGGLE_SELECTED_ACCOUNT,
  CHANGE_NETWORK,
  SELECT_ACCOUNT,
  ADD_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_ERROR,
  TOGGLE_DROPDOWN,
  SELECT_PAGE,
  RECAPTCHA_CHANGE,
  MNEMONIC_REGENERATE,
  MNEMONIC_REGENERATE_SUCCESS,
  GET_ADDRESS_BALANCE,
  GET_ADDRESS_BALANCE_SUCCESS,
  GET_ADDRESS_BALANCE_ERROR
} from './constants';

export function loading() {
  return {
    type: LOADING,
  };
}

export function loaded() {
  return {
    type: LOADED,
  };
}

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


export function toggleDropdown(status) {
  return {
    type: TOGGLE_DROPDOWN,
    status
  };
}


export function faucetSend() {
  return {
    type: SEND_TRANSACTION,
    sendFrom: "faucet",
  };
}

export function faucetContractSend() {
  console.log("fundContract - SEND_TRANSACTION")
  return {
    type: SEND_TRANSACTION,
    sendFrom: "faucetContract",
  };
}

export function sendTransaction() {
  return {
    type: SEND_TRANSACTION,
    sendFrom: "user",
  };
}

export function sendTransactionSuccess(txHash, sendFrom) {
  return {
    type: SEND_TRANSACTION_SUCCESS,
    txHash,
    sendFrom
  };
}

export function sendTransactionError(error) {
  return {
    type: SEND_TRANSACTION_ERROR,
    error
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


export function getAddressBalance(address, sendFrom) {
  return {
    type: GET_ADDRESS_BALANCE,
    address,
    sendFrom
  };
}

export function getAddressBalanceSuccess(balance) {
  return {
    type: GET_ADDRESS_BALANCE_SUCCESS,
    balance
  };
}

export function getAddressBalanceError() {
  return {
    type: GET_ADDRESS_BALANCE_ERROR,
  };
}


export function toggleSelectedAccount() {
  return {
    type: TOGGLE_SELECTED_ACCOUNT,
  };
}

export function selectAccount(address) {
  console.log("address", address);
  return {
    type: SELECT_ACCOUNT,
    address
  };
}

export function addAccount() {
  console.log("addAccount")
  return {
    type: ADD_ACCOUNT,
  };
}

export function addAccountSuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: ADD_ACCOUNT_SUCCESS,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}

export function addAccountError() {
  return {
    type: ADD_ACCOUNT_ERROR,
  };
}


export function changeNetwork(network) {
  return {
    type: CHANGE_NETWORK,
    network
  };
}

export function selectPage(page) {
  return {
    type: SELECT_PAGE,
    page
  };
}

export function recaptchaChange(captchaData) {
  console.log("captchaData", captchaData)
  return {
    type: RECAPTCHA_CHANGE,
    captchaData
  };
}

export function mnemonicRegenerate(accountNum) {
  console.log("accountNum", accountNum)
  return {
    type: MNEMONIC_REGENERATE,
    accountNum
  };
}

export function mnemonicRegenerateSuccess(accountNum, address, addressShorten, mnemonic, balance) {
  console.log(accountNum, address, addressShorten, mnemonic, balance)
  return {
    type: MNEMONIC_REGENERATE_SUCCESS,
    accountNum,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}



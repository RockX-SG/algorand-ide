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
  GENERATE_ACCOUNT_TERTIARY,
  GENERATE_ACCOUNT_QUARTERNARY,
  GENERATE_ACCOUNT_QUINARY,
  GENERATE_ACCOUNT_PRIMARY_SUCCESS,
  GENERATE_ACCOUNT_SECONDARY_SUCCESS,
  GENERATE_ACCOUNT_TERTIARY_SUCCESS,
  GENERATE_ACCOUNT_QUARTERNARY_SUCCESS,
  GENERATE_ACCOUNT_QUINARY_SUCCESS,
  GENERATE_ACCOUNT_ERROR,
  RESTORE_ACCOUNT_PRIMARY,
  RESTORE_ACCOUNT_SECONDARY,
  RESTORE_ACCOUNT_TERTIARY,
  RESTORE_ACCOUNT_QUARTERNARY,
  RESTORE_ACCOUNT_QUINARY,
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
  GET_ADDRESS_BALANCE_ERROR,
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
  CHANGE_SETTINGS,
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

export function generateAccountTertiary() {
  console.log("generateAccountTertiary")
  return {
    type: GENERATE_ACCOUNT_TERTIARY,
  };
}

export function generateAccountQuarternary() {
  console.log("generateAccountQuarternary")
  return {
    type: GENERATE_ACCOUNT_QUARTERNARY,
  };
}

export function generateAccountQuinary() {
  console.log("generateAccountQuinary")
  return {
    type: GENERATE_ACCOUNT_QUINARY,
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

export function generateAccountTertiarySuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: GENERATE_ACCOUNT_TERTIARY_SUCCESS,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}

export function generateAccountQuarternarySuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: GENERATE_ACCOUNT_QUARTERNARY_SUCCESS,
    address,
    addressShorten,
    mnemonic,
    balance
  };
}

export function generateAccountQuinarySuccess(address, addressShorten, mnemonic, balance) {
  console.log(address, addressShorten, mnemonic, balance)
  return {
    type: GENERATE_ACCOUNT_QUINARY_SUCCESS,
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

export function restoreAccountTertiary(data) {
  console.log("restoreAccountTertiary")
  return {
    type: RESTORE_ACCOUNT_TERTIARY,
    mnemonic: data[0],
    address: data[1],
  };
}

export function restoreAccountQuarternary(data) {
  console.log("restoreAccountQuarternary")
  return {
    type: RESTORE_ACCOUNT_QUARTERNARY,
    mnemonic: data[0],
    address: data[1],
  };
}

export function restoreAccountQuinary(data) {
  console.log("restoreAccountQuinary")
  return {
    type: RESTORE_ACCOUNT_QUINARY,
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

export function sendTransactionError(error, sendFrom) {
  return {
    type: SEND_TRANSACTION_ERROR,
    error,
    sendFrom
  };
}

export function changeAddress(address) {
  console.log("CHANGE_ADDRESS", address)
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
  console.log("SELECT_ACCOUNT", address);
  return {
    type: SELECT_ACCOUNT,
    address
  };
}

export function addAccount() {
  console.log("ADD_ACCOUNT")
  console.log("addAccount")
  return {
    type: ADD_ACCOUNT,
  };
}

export function addAccountSuccess(address, addressShorten, mnemonic, balance) {
  console.log("ADD_ACCOUNT_SUCCESS")
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
  console.log("CHANGE_NETWORK");
  console.log("CHANGE_NETWORK");
  console.log("CHANGE_NETWORK");
  console.log("CHANGE_NETWORK");
  console.log("CHANGE_NETWORK");
  console.log(network);
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

export function changeServerAddress(serverAddress) {
  console.log("CHANGE_SERVER_ADDRESS", serverAddress)
  return {
    type: CHANGE_SERVER_ADDRESS,
    serverAddress,
  };
}
export function changeServerPort(serverPort) {
  console.log("CHANGE_SERVER_PORT", serverPort)
  return {
    type: CHANGE_SERVER_PORT,
    serverPort,
  };
}
export function changeAlgodToken(algodToken) {
  console.log("CHANGE_ALGOD_TOKEN", algodToken)
  return {
    type: CHANGE_ALGOD_TOKEN,
    algodToken,
  };
}

export function changeSettings(status) {
  return {
    type: CHANGE_SETTINGS
  };
}


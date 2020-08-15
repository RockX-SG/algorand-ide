import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  GENERATE_ACCOUNT_PRIMARY,
  RESTORE_ACCOUNT_PRIMARY,
  GENERATE_ACCOUNT_SECONDARY,
  RESTORE_ACCOUNT_SECONDARY,
  SEND_TRANSACTION,
  GET_FAUCET_BALANCE,
  ADD_ACCOUNT,
  MNEMONIC_REGENERATE
} from 'containers/WalletPage/constants';

import {
  generateAccountPrimarySuccess,
  generateAccountSecondarySuccess,
  generateAccountError,
  sendTransactionSuccess,
  sendTransactionError,
  getFaucetBalanceSuccess,
  getFaucetBalanceError,
  addAccountSuccess,
  addAccountError,
  mnemonicRegenerateSuccess
} from 'containers/WalletPage/actions';

import {
  makeSelectWalletPage
} from 'containers/WalletPage/selectors';

import {
  makeSelectExplorerPage
} from 'containers/ExplorerPage/selectors';

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

// Individual exports for testing
export default function* walletPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GENERATE_ACCOUNT_PRIMARY, generateAccountPrimary);
  yield takeLatest(RESTORE_ACCOUNT_PRIMARY, restoreAccountPrimary);
  yield takeLatest(GENERATE_ACCOUNT_SECONDARY, generateAccountSecondary);
  yield takeLatest(RESTORE_ACCOUNT_SECONDARY, restoreAccountSecondary);
  yield takeLatest(SEND_TRANSACTION, sendTransaction);
  yield takeLatest(GET_FAUCET_BALANCE, getFaucetBalance);
  yield takeLatest(ADD_ACCOUNT, addAccount);
  yield takeLatest(MNEMONIC_REGENERATE, mnemonicRegenerate);
  
}

export function* generateAccountPrimary() {
  var keys = algosdk.generateAccount();

  console.log("keys", keys["addr"]);

  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);

  localStorage.setItem('addressPrimary', keys["addr"]);

  localStorage.setItem('mnemonicPrimary', mnemonic);

  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);

  yield put(generateAccountPrimarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}

export function* generateAccountSecondary() {
  var keys = algosdk.generateAccount();

  console.log("keys", keys["addr"]);

  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);

  localStorage.setItem('addressSecondary', keys["addr"]);

  localStorage.setItem('mnemonicSecondary', mnemonic);

  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);

  yield put(generateAccountSecondarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}

export function* restoreAccountPrimary(data) {
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountPrimarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

export function* restoreAccountSecondary(data) {
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountSecondarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

function shortenAddress(addr){
  let addressStart = addr.substr(0, 5);
  let addressEnd = addr.substr(addr.length - 5, 5);

  let address = addressStart + "..." + addressEnd;
  console.log("addressShorten", address);

  return address
}



export function* sendTransaction(data) {
  console.log(data["sendFrom"]);
  let explorerInfo = yield select(makeSelectExplorerPage());
  let walletInfo = yield select(makeSelectWalletPage());

  let addressTo;
  let amount;
  let keys;

  let mnemonicFaucet = "core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign";
  let keysFaucet = algosdk.mnemonicToSecretKey(mnemonicFaucet);
  
  // draft.addressArray[0] = action.address;
  // draft.mnemonicArray[0] = action.mnemonic;
  
  let mnemonicUser;
  mnemonicUser = walletInfo["mnemonic"];
  console.log("mnemonicUser", mnemonicUser);
  // if(walletInfo["selectedAccount"] == 1){
  //   mnemonicUser = localStorage.getItem('mnemonicPrimary');
  // }else if(walletInfo["selectedAccount"] == 2){
  //   mnemonicUser = localStorage.getItem('mnemonicSecondary');
  // }
  let keysUser = algosdk.mnemonicToSecretKey(mnemonicUser);
  
  let captchaData = walletInfo["captchaData"];
  
  if(captchaData == "" || captchaData == undefined || captchaData == null){
    console.log("recaptcha error")
    yield put(sendTransactionError("recaptcha"));
  }else{

    if(data["sendFrom"] == "user"){
      addressTo = walletInfo["inputAddress"];
      amount = walletInfo["inputAmount"] * 1000000;

      keys = keysUser;
    }else if(data["sendFrom"] == "faucet"){
      addressTo = keysUser["addr"];
      amount = 5 * 1000000;

      keys = keysFaucet;
    }else if(data["sendFrom"] == "faucetContract"){
      addressTo = explorerInfo["codeCompileAddress"];
      amount = 5 * 1000000;

      keys = keysFaucet;
    }


    console.log("addressTo", addressTo);

    let params = yield call(algodclient.getTransactionParams);
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "to": addressTo,
        "fee": 10,
        "amount": amount,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": new Uint8Array(0),
    };
    console.log(txn);

    const txHeaders = {
        'Content-Type' : 'application/x-binary'
    }

    let signedTxn = algosdk.signTransaction(txn, keys.sk);
    console.log(signedTxn);
    let tx = yield call(algodclient.sendRawTransaction, signedTxn.blob, txHeaders);
    console.log("Transaction : " + tx.txId);


    let status = yield call(algodclient.status);
    console.log("status : " + status);
    let lastround = status.lastRound;
    console.log("lastround : " + lastround);
    while (true) {
      let pendingInfo = yield call(algodclient.pendingTransactionInformation, tx.txId);
      if (pendingInfo.round !== null && pendingInfo.round > 0) {
        //Got the completed Transaction
        console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
        break;
      }
      lastround++;
      yield call(algodclient.statusAfterBlock, lastround);
    }
    console.log("done");

    yield put(sendTransactionSuccess(tx.txId));
  }
}

export function* getFaucetBalance() {
  // let mnemonicFaucet = "core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign"
  // let addr = "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM"

  let accountInfo = yield call(algodclient.accountInformation, "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM");

  yield put(getFaucetBalanceSuccess(accountInfo["amount"]));
}


export function* addAccount() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  var keys = algosdk.generateAccount();
  
  console.log("keys", keys["addr"]);
  
  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);
  
  // retrieve num of account here
  let n = walletInfo["walletArray"].length + 1;
  
  localStorage.setItem('address'+n, keys["addr"]);
  
  localStorage.setItem('mnemonic'+n, mnemonic);
  
  localStorage.setItem('totalAccount', n);
  
  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);
  
  yield put(addAccountSuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}


export function* mnemonicRegenerate(data) {
  console.log(data["accountNum"]);
  let walletInfo = yield select(makeSelectWalletPage());
  
  var keys = algosdk.generateAccount();
  
  console.log("keys", keys["addr"]);
  
  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);
  
  // retrieve num of account here
  let n = data["accountNum"];
  
  localStorage.setItem('address'+n, keys["addr"]);
  
  localStorage.setItem('mnemonic'+n, mnemonic);
  
  localStorage.setItem('totalAccount', n);
  
  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);
  
  yield put(mnemonicRegenerateSuccess(data["accountNum"], keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}




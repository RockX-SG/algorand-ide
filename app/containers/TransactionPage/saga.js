import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  SEND_ASA_TRANSACTION,
  CONFIRM_ASSET_ID,
  OPT_IN_ASA
} from 'containers/TransactionPage/constants';

import {
  sendAsaTransactionSuccess,
  sendAsaTransactionError,
  confirmAssetIdSuccess,
  confirmAssetIdError,
  optInAsaSuccess
} from 'containers/TransactionPage/actions';

import {
  makeSelectWalletPage
} from 'containers/WalletPage/selectors';

import {
  makeSelectTransactionPage
} from 'containers/TransactionPage/selectors';

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

// Individual exports for testing
export default function* transactionPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_ASA_TRANSACTION, sendAsaTransaction);
  yield takeLatest(CONFIRM_ASSET_ID, confirmAssetId);
  yield takeLatest(OPT_IN_ASA, optInAsa);
}

export function* confirmAssetId() {
  console.log("confirmAssetId")
  let transactionInfo = yield select(makeSelectTransactionPage());
  let walletInfo = yield select(makeSelectWalletPage());
  
  //11069099
  
  let mnemonic = walletInfo["mnemonic"];
  console.log("mnemonic", mnemonic);
  
  let address = walletInfo["address"];
  console.log("address", address);
  
  let keysUser = algosdk.mnemonicToSecretKey(mnemonic);
  
  let assetId = transactionInfo["inputAssetId"];
  console.log("assetId", assetId);
  
  try {
    let act = yield call(algodclient.accountInformation, address);
    console.log("Account Information for: " + JSON.stringify(act.assets[assetId]));
    
    let balance = act.assets[assetId]["amount"]
    console.log("balance: " + balance);
    
    yield put(confirmAssetIdSuccess(balance));
  }
  catch(err) {
    yield put(confirmAssetIdError("Please first opt-in to the asset id"));
  }
  
  
}

export function* sendAsaTransaction() {
  console.log("sendAsaTransaction")
  let transactionInfo = yield select(makeSelectTransactionPage());
  let walletInfo = yield select(makeSelectWalletPage());

  let keys;
  
  let mnemonic = walletInfo["mnemonic"];
  console.log("mnemonic", mnemonic);
  
  let address = walletInfo["address"];
  console.log("address", address);
  
  let keysUser = algosdk.mnemonicToSecretKey(mnemonic);
  
  let captchaData = walletInfo["captchaData"];
  
  let assetId = parseInt(transactionInfo["inputAssetId"]);
  console.log("assetId", assetId);
  
  // let act = yield call(algodclient.accountInformation, address);
  // console.log("Account Information for: " + JSON.stringify(act.assets[assetId]));
  
  if(captchaData == "" || captchaData == undefined || captchaData == null){
    console.log("recaptcha error")
    yield put(sendTransactionError("recaptcha"));
  }else{


    keys = keysUser;
    //11069099

    let params = yield call(algodclient.getTransactionParams);
    let endRound = params.lastRound + parseInt(1000);
    
    var sender = address; 
    var recipient = walletInfo["inputAddress"];
    var revocationTarget = undefined;
    var closeRemainderTo = undefined;
    // let ​note = undefined;    
    
    var amount = 10; //walletInfo["inputAmount"];
    console.log("amount", amount);
    console.log("assetId", assetId);
    
    var xtxn = algosdk.makeAssetTransferTxn(sender, recipient, closeRemainderTo, revocationTarget, 10, amount, params.lastRound, endRound, undefined, params.genesishashb64, params.genesisID, assetId);
    
    console.log("xtxn", xtxn);
    
    var rawSignedTxn = xtxn.signTxn(keys.sk)
    console.log("rawSignedTxn", rawSignedTxn);
    

    var xtx = yield call(algodclient.sendRawTransaction, rawSignedTxn);
    console.log("Transaction : " + xtx.txId);


    let status = yield call(algodclient.status);
    console.log("status : " + status);
    let lastround = status.lastRound;
    console.log("lastround : " + lastround);
    while (true) {
      let pendingInfo = yield call(algodclient.pendingTransactionInformation, xtx.txId);
      if (pendingInfo.round !== null && pendingInfo.round > 0) {
        //Got the completed Transaction
        console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
        break;
      }
      lastround++;
      yield call(algodclient.statusAfterBlock, lastround);
    }
    console.log("done");

    yield put(sendAsaTransactionSuccess(xtx.txId));
  }
}



export function* optInAsa() {
  console.log("sendAsaTransaction")
  let transactionInfo = yield select(makeSelectTransactionPage());
  let walletInfo = yield select(makeSelectWalletPage());

  let keys;
  
  let mnemonic = walletInfo["mnemonic"];
  console.log("mnemonic", mnemonic);
  
  let address = walletInfo["address"];
  console.log("address", address);
  
  let keysUser = algosdk.mnemonicToSecretKey(mnemonic);
  
  let captchaData = walletInfo["captchaData"];
  
  let assetId = parseInt(transactionInfo["inputAssetId"]);
  console.log("assetId", assetId);
  
  // let act = yield call(algodclient.accountInformation, address);
  // console.log("Account Information for: " + JSON.stringify(act.assets[assetId]));
  
  if(captchaData == "" || captchaData == undefined || captchaData == null){
    console.log("recaptcha error")
    yield put(sendTransactionError("recaptcha"));
  }else{


    keys = keysUser;
    //11069099

    let params = yield call(algodclient.getTransactionParams);
    let endRound = params.lastRound + parseInt(1000);
    
    var sender = address; 
    var recipient = walletInfo["inputAddress"];
    var revocationTarget = undefined;
    var closeRemainderTo = undefined;
    // let ​note = undefined;    
    
    var amount = 0; //walletInfo["inputAmount"];
    console.log("amount", amount);
    console.log("assetId", assetId);
    
    var xtxn = algosdk.makeAssetTransferTxn(sender, sender, closeRemainderTo, revocationTarget, 10, amount, params.lastRound, endRound, undefined, params.genesishashb64, params.genesisID, assetId);
    
    console.log("xtxn", xtxn);
    
    var rawSignedTxn = xtxn.signTxn(keys.sk)
    console.log("rawSignedTxn", rawSignedTxn);
    

    var xtx = yield call(algodclient.sendRawTransaction, rawSignedTxn);
    console.log("Transaction : " + xtx.txId);


    let status = yield call(algodclient.status);
    console.log("status : " + status);
    let lastround = status.lastRound;
    console.log("lastround : " + lastround);
    while (true) {
      let pendingInfo = yield call(algodclient.pendingTransactionInformation, xtx.txId);
      if (pendingInfo.round !== null && pendingInfo.round > 0) {
        //Got the completed Transaction
        console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
        break;
      }
      lastround++;
      yield call(algodclient.statusAfterBlock, lastround);
    }
    console.log("done");

    yield put(optInAsaSuccess(xtx.txId));
  }
}




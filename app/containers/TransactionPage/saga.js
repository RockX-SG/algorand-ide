import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  SEND_ASA_TRANSACTION,
  CONFIRM_ASSET_ID,
  OPT_IN_ASA,
  CONFIRM_ATOMIC_ROUTE,
  SIGN_ROUTE,
  SEND_ATOMIC_TRANSFER
} from 'containers/TransactionPage/constants';

import {
  sendAsaTransactionSuccess,
  sendAsaTransactionError,
  confirmAssetIdSuccess,
  confirmAssetIdError,
  optInAsaSuccess,
  confirmAtomicRouteSuccess,
  confirmAtomicRouteError,
  signRouteSuccess,
  signRouteError,
  sendAtomicTransferSuccess,
  sendAtomicTransferError,
} from 'containers/TransactionPage/actions';

import {
  loaded,
} from 'containers/WalletPage/actions';

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
  yield takeLatest(CONFIRM_ATOMIC_ROUTE, confirmAtomicRoute);
  yield takeLatest(SIGN_ROUTE, signRoute);
  yield takeLatest(SEND_ATOMIC_TRANSFER, sendAtomicTransfer);
  
}



export function* confirmAtomicRoute() {
  console.log("confirmAtomicRoute")
  let transactionInfo = yield select(makeSelectTransactionPage());
  let walletInfo = yield select(makeSelectWalletPage());
  
  let atomicTxn = [];
  let atomicKey = [];
  
  let route = transactionInfo["routeSenders"];
  console.log("route", route);
  
  let addressArray = walletInfo["addressArray"];
  console.log("addressArray", addressArray);
  
  let mnemonicArray = walletInfo["mnemonicArray"];
  console.log("mnemonicArray", mnemonicArray);
  
  let params = yield call(algodclient.getTransactionParams);
  // let params = yield call(algodclient.getTransactionParams().do);
  
  for(var i=0; i<route.length; i++){
    let amount = route[i][2] * 1000000;
    
    // var txn = {
    //     "from": route[i][0],
    //     "to": route[i][1],
    //     "fee": 10,
    //     "amount": amount,
    //     "firstRound": params.lastRound,
    //     "lastRound": endRound,
    //     "genesisID": params.genesisID,
    //     "genesisHash": params.genesishashb64,
    // };
    // let txTest = algosdk.makePaymentTxnWithSuggestedParams(route[i][0], route[i][1], amount, undefined, undefined, params); 
    // console.log("txTest", txTest);
    // let txn = algosdk.makePaymentTxnWithSuggestedParams(route[i][0], route[i][1], amount, undefined, undefined, params);  
    
    let txn = algosdk.makePaymentTxn(route[i][0], 
        route[i][1], 10, amount, undefined, 
        params.lastRound, params.lastRound + 1000, new Uint8Array(0), 
        params.genesishashb64, params.genesisID);
    
    atomicTxn.push(txn);
    
    for(var x=0; x<addressArray.length; x++){
      if(route[i][0] == addressArray[x]){
        var key = algosdk.mnemonicToSecretKey(mnemonicArray[x]);
        
        atomicKey.push(key.sk);
        
        break;
      }
      
    }
  }
  console.log("atomicTxn", atomicTxn);
  
  // assign group id
  let atomicTxGroup = algosdk.assignGroupID(atomicTxn);
  
  console.log("atomicKey", atomicKey);
  console.log("atomicTxGroup", atomicTxGroup);
  
  console.log(atomicTxn.length == atomicKey.length);

  console.log(atomicTxGroup.length == atomicKey.length);
  
  
  // let signed = []
  // for (var i=0; i<atomicTxGroup.length; i++) {
  //   let signedTx = atomicTxGroup[i].signTxn( atomicKey[i] )
  //   console.log("signedTx", signedTx);
  //   signed.push(signedTx);
  // }
  // 
  // let tx = yield call(algodclient.sendRawTransactions, signed);
  // console.log("Transaction : " + tx.txId);
  
  try {
    yield put(confirmAtomicRouteSuccess(atomicTxn, atomicKey));
  }
  catch(err) {
    yield put(confirmAtomicRouteError(""));
  }
}

export function* signRoute(data) {
  console.log("signRoute")
  console.log(data["index"]);
  
  let transactionInfo = yield select(makeSelectTransactionPage());
  
  let atomicTxn = transactionInfo["atomicTxn"];
  let atomicKey = transactionInfo["atomicKey"];
  
  let signedTx = atomicTxn[data["index"]].signTxn( atomicKey[data["index"]] )
  
  // let tx = yield call(algodclient.sendRawTransactions, signed);
  // console.log("Transaction : " + tx.txId);
  
  try {
    yield put(signRouteSuccess(data["index"], signedTx));
  }
  catch(err) {
    yield put(signRouteError(""));
  }
}


export function* sendAtomicTransfer() {
  console.log("sendAtomicTransfer")
  
  let transactionInfo = yield select(makeSelectTransactionPage());
  
  let atomicSignedTxn = transactionInfo["atomicSignedTxn"];
  
  let tx = yield call(algodclient.sendRawTransactions, atomicSignedTxn);
  let txHash = tx.txId;
  console.log("Transaction : " + tx.txId);
  
  try {

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
      
    yield put(sendAtomicTransferSuccess(txHash));
    yield put(loaded());
  }
  catch(err) {
    yield put(sendAtomicTransferError(""));
    yield put(loaded());
  }
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
    yield put(loaded());
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
    yield put(loaded());
  }
}




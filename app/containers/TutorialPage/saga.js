import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  JS_EXECUTE_CODE_TUTORIAL,
  FAUCET_SEND
} from 'containers/TutorialPage/constants';

import {
  jsCodeExecuteTutorialSuccess,
  jsCodeExecuteTutorialError,
  faucetSendSuccess
} from 'containers/TutorialPage/actions';

import {
  loaded,
} from 'containers/WalletPage/actions';


import {
  makeSelectTutorialPage
} from 'containers/TutorialPage/selectors';

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);


let tealBackendAPI = "https://algorand.rockx.com/teal/"; //'http://127.0.0.1:5000'
// let tealBackendAPI = 'http://127.0.0.1:5000'; //"http://teal-dev.rockx.com"; //'http://127.0.0.1:5000'

// Individual exports for testing
export default function* tutorialPageSaga() {
  // See example in containers/HomePage/saga.js
  console.log("------");
  yield takeLatest(JS_EXECUTE_CODE_TUTORIAL, jsCodeExecuteTutorial);
  yield takeLatest(FAUCET_SEND, faucetSend);
  
}

export function* jsCodeExecuteTutorial(codeData) {
  console.log("------");
  console.log("------");
  console.log("jsCodeExecuteTutorial")
  console.log("code", codeData)
  
  let tutorial = codeData["tutorial"];
  let step = codeData["step"];
  
  var formData = new FormData();
  formData.append('code', codeData["code"]);
  // formData.append('auth[password]', );
  
  
  const response = yield fetch(tealBackendAPI + '/execute/js', {
    method: 'POST',
    body: formData
  })
  
  const data = yield response.json()
  console.log("data123", data)
  
  if(data["response_status"] !== 400){
    console.log("data", data["response"]);
    for(var i = 0; i < data["response"].length; i++){
      console.log("data", data["response"][i]);
      if(data["response"][i] == undefined || data["response"][i] == ""){
        
      }else{
        yield put(jsCodeExecuteTutorialSuccess(tutorial, step, data["response"][i]));
      }
    }
    yield put(loaded());
  }else{
    yield put(jsCodeExecuteTutorialError(data));
    yield put(loaded());
  }
}



export function* faucetSend(codeData) {
  console.log("faucetSend");
  let tutorialInfo = yield select(makeSelectTutorialPage());

  let addressTo;
  let amount;
  let keys;

  let mnemonicFaucet = "core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign";
  let keysFaucet = algosdk.mnemonicToSecretKey(mnemonicFaucet);
  
  addressTo = tutorialInfo["inputAddress"];
  amount = 5 * 1000000;

  keys = keysFaucet;


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
  
  let tutorial = codeData["tutorial"];
  let step = codeData["step"];
  
  yield put(jsCodeExecuteTutorialSuccess(tutorial, step, tx.txId));
  
  yield put(loaded());
}



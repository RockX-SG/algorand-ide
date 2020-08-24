import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  CODE_DEPLOY,
  CODE_COMPILE,
  JS_EXECUTE_CODE,
} from 'containers/ExplorerPage/constants';

import {
  codeCompileSuccess,
  codeCompileError,
  jsCodeExecuteSuccess,
  jsCodeExecuteError,
} from 'containers/ExplorerPage/actions';

import {
  loaded,
  getAddressBalance,
} from 'containers/WalletPage/actions';

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


let tealBackendAPI = 'http://127.0.0.1:5000'; //"http://teal-dev.rockx.com"; //'http://127.0.0.1:5000'

// Individual exports for testing
export default function* explorerPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(CODE_DEPLOY, codeDeploy);
  yield takeLatest(CODE_COMPILE, codeCompile);
  yield takeLatest(JS_EXECUTE_CODE, jsCodeExecute);
}

// export function* codeDeploy() {
//   let contractInfo = yield select(makeSelectExplorerPage());
//   console.log("codeValue", contractInfo["teal"]["codeValue"])
// 
//   let params = yield call(algodclient.getTransactionParams);
//   let endRound = params.lastRound + parseInt(1000);
//   // let fee = await algodclient.suggestedFee();
// 
//   // create logic sig
//   // b64 example "ASABACI="
//   let program = new Uint8Array(Buffer.from("ASABACI=", "base64"));
//   // let program = new Uint8Array(Buffer.from("base64-encoded-program"<PLACEHOLDER>, "base64"));
//   let lsig = algosdk.makeLogicSig(program);
// 
//   var formData = new FormData();
//   formData.append('code', contractInfo["teal"]["codeValue"]);
//   // formData.append('auth[password]', );
// 
// 
//   const response = yield fetch(tealBackendAPI, {
//     method: 'POST',
//     body: formData
//   })
//   // create a transaction
//   // let txn = {
//   //     "from": lsig.address(),
//   //     "to": "receiver-address"<PLACEHOLDER>,
//   //     "fee": params.fee,
//   //     "amount": amount<PLACEHOLDER>,
//   //     "firstRound": params.lastRound,
//   //     "lastRound": endRound,
//   //     "genesisID": params.genesisID,
//   //     "genesisHash": params.genesishashb64
//   // };
// 
//   // Create the LogicSigTransaction with contract account LogicSig
//   // let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);
// 
//   // send raw LogicSigTransaction to network
//   // let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
//   // console.log("Transaction : " + tx.txId);
// 
//   // yield put(generateAccountPrimarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
// }


export function* codeCompile() {
  console.log("codeCompile")
  let contractInfo = yield select(makeSelectExplorerPage());
  console.log("contractInfo", contractInfo)
  console.log("codeValue", contractInfo["teal"]["codeValue"])
  
  var formData = new FormData();
  formData.append('code', contractInfo["teal"]["codeValue"]);
  // formData.append('auth[password]', );
  
  
  const response = yield fetch(tealBackendAPI + '/compile', {
    method: 'POST',
    body: formData
  })
  
  const data = yield response.json()
  console.log(data)
  console.log(data["address"])
  // create a transaction
  // let txn = {
  //     "from": lsig.address(),
  //     "to": "receiver-address"<PLACEHOLDER>,
  //     "fee": params.fee,
  //     "amount": amount<PLACEHOLDER>,
  //     "firstRound": params.lastRound,
  //     "lastRound": endRound,
  //     "genesisID": params.genesisID,
  //     "genesisHash": params.genesishashb64
  // };
  
  // Create the LogicSigTransaction with contract account LogicSig
  // let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);
  
  // send raw LogicSigTransaction to network
  // let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
  // console.log("Transaction : " + tx.txId);
  
  if(data["response_status"] !== 400){
    yield put(codeCompileSuccess(data));
    yield put(getAddressBalance(data["address"], "contract"));
    yield put(loaded());
  }else{
    yield put(codeCompileError(data));
    yield put(loaded());
  }
}

export function* jsCodeExecute() {
  console.log("jsCodeExecute")
  let contractInfo = yield select(makeSelectExplorerPage());
  console.log("contractInfo", contractInfo)
  console.log("codeValue", contractInfo["javascript"]["codeValue"])

  var formData = new FormData();
  formData.append('code', contractInfo["javascript"]["codeValue"]);
  // formData.append('auth[password]', );


  const response = yield fetch(tealBackendAPI + '/execute/js', {
    method: 'POST',
    body: formData
  })

  const data = yield response.json()
  console.log("data123", data)
  // create a transaction
  // let txn = {
  //     "from": lsig.address(),
  //     "to": "receiver-address"<PLACEHOLDER>,
  //     "fee": params.fee,
  //     "amount": amount<PLACEHOLDER>,
  //     "firstRound": params.lastRound,
  //     "lastRound": endRound,
  //     "genesisID": params.genesisID,
  //     "genesisHash": params.genesishashb64
  // };

  // Create the LogicSigTransaction with contract account LogicSig
  // let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

  // send raw LogicSigTransaction to network
  // let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
  // console.log("Transaction : " + tx.txId);
  
  if(data["response_status"] !== 400){
    console.log("data", data["response"]);
    for(var i = 0; i < data["response"].length; i++){
      yield put(jsCodeExecuteSuccess(data["response"][i]));
    }
    yield put(loaded());
  }else{
    yield put(jsCodeExecuteError(data));
    yield put(loaded());
  }
}

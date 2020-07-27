import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  CODE_DEPLOY,
  CODE_COMPILE
} from 'containers/SmartContractPage/constants';

import {
  codeCompileSuccess,
  codeCompileError,
} from 'containers/SmartContractPage/actions';

import {
  makeSelectSmartContractPage
} from 'containers/SmartContractPage/selectors';

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

// Individual exports for testing
export default function* smartContractPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CODE_DEPLOY, codeDeploy);
  yield takeLatest(CODE_COMPILE, codeCompile);
}

export function* codeDeploy() {
  let contractInfo = yield select(makeSelectSmartContractPage());
  console.log("codeValue", contractInfo["codeValue"])

  let params = yield call(algodclient.getTransactionParams);
  let endRound = params.lastRound + parseInt(1000);
  // let fee = await algodclient.suggestedFee();

  // create logic sig
  // b64 example "ASABACI="
  let program = new Uint8Array(Buffer.from("ASABACI=", "base64"));
  // let program = new Uint8Array(Buffer.from("base64-encoded-program"<PLACEHOLDER>, "base64"));
  let lsig = algosdk.makeLogicSig(program);
  
  var formData = new FormData();
  formData.append('code', contractInfo["codeValue"]);
  // formData.append('auth[password]', );


let tealBackendAPI = "http://teal-dev.rockx.com:5000"; //'http://127.0.0.1:5000'
  const response = yield fetch(tealBackendAPI, {
    method: 'POST',
    body: formData
  })
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
  
  // yield put(generateAccountPrimarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}


export function* codeCompile() {
  let contractInfo = yield select(makeSelectSmartContractPage());
  console.log("codeValue", contractInfo["codeValue"])
  
  var formData = new FormData();
  formData.append('code', contractInfo["codeValue"]);
  // formData.append('auth[password]', );
  formData.append('xxxxxxxxxxxxxxxx');
  
  let tealBackendAPI = "http://teal-dev.rockx.com:5000"; //'http://127.0.0.1:5000'
  const response = yield fetch(tealBackendAPI + '/compile', {
    method: 'POST',
    body: formData
  })
  
  const data = yield response.json()
  console.log(data)
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
  }else{
    yield put(codeCompileError(data));
  }
}

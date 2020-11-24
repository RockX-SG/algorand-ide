import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  TEAL_CODE_DEPLOY,
  CODE_COMPILE,
  JS_EXECUTE_CODE,
} from 'containers/ExplorerPage/constants';

import {
  codeCompileSuccess,
  codeCompileError,
  jsCodeExecuteSuccess,
  jsCodeExecuteError,
  tealAddToBash,
  tealCodeDeployError
} from 'containers/ExplorerPage/actions';

import {
  loaded,
  getAddressBalance,
} from 'containers/WalletPage/actions';

import {
  makeSelectWalletPage
} from 'containers/WalletPage/selectors';

import {
  makeSelectExplorerPage
} from 'containers/ExplorerPage/selectors';

var algosdk = require('algosdk')

// const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
// const port = '';
// const token = {
//     'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
// }
// 
// const algodclient = new algosdk.Algod(token, baseServer, port);


// let tealBackendAPI = "http://teal-dev.rockx.com"; //'http://127.0.0.1:5000'
let tealBackendAPI = "https://algorand.rockx.com/teal/"; //'http://127.0.0.1:5000'
// let tealBackendAPI = 'http://127.0.0.1:5000';

// Individual exports for testing
export default function* explorerPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TEAL_CODE_DEPLOY, tealCodeDeploy);
  yield takeLatest(CODE_COMPILE, codeCompile);
  yield takeLatest(JS_EXECUTE_CODE, jsCodeExecute);
}

export function* tealCodeDeploy() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let contractInfo = yield select(makeSelectExplorerPage());
  
  
  let contractBase64 = contractInfo["teal"]["contractBase64"];
  console.log("contractBase64", contractBase64)
  
  let addressTo = walletInfo["address"];
  console.log("addressTo", addressTo);
  
  // int 1
  // always eval to true
  let program = new Uint8Array(Buffer.from(contractBase64 , "base64"));
  
  let lsig = algosdk.makeLogicSig(program);
  console.log("lsig", lsig);
  
  let sender = lsig.address();
  console.log("sender", sender);
  
  let amount = 1 * 1000000;
  
  let params = yield call(algodclient.getTransactionParams);
  let endRound = params.lastRound + parseInt(1000);
  
  // create a transaction
  let txn = {
      "from": lsig.address(),
      // "to": "receiver-address" < PLACEHOLDER >,
      "to": addressTo,      
      "fee": 10,
      // "amount": amount < PLACEHOLDER >,
      "amount": amount,
      "firstRound": params.lastRound,
      "lastRound": endRound,
      "genesisID": params.genesisID,
      "genesisHash": params.genesishashb64
  };
  // Create the LogicSigTransaction with contract account LogicSig 
  let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);
  console.log("rawSignedTxn : " + rawSignedTxn.blob);
  
  // let txns = [{
  //     lsig: lsig,
  //     txn: txn,
  // }];  
  // const dr = new algosdk.modelsv2.DryrunRequest({
  //     txns: txns,
  //     sources: sources,
  // });
  // 
  // // let dryrunResponse = await algodclient.dryrun(dr).do();
  // let dryrunResponse = yield call(algodclient.dryrun(dr).do);
  // console.log("dryrunResponse : " + dryrunResponse);
  // // send raw LogicSigTransaction to network
  // // console.log("This is expected to fail as the program is int 0 and will return false : ");     
  // // let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
  
  
  console.log("----");
  try {
    let tx = yield call(algodclient.sendRawTransaction, rawSignedTxn.blob);
    console.log("----");
    console.log("Transaction : " + tx.txId);
    console.log("----");
            
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
    
    console.log("----");
    // if(data["sendFrom"] == "faucetContract"){
    yield put(tealAddToBash(tx.txId));
    // }else{
    //   yield put(sendTransactionSuccess(tx.txId, data["sendFrom"]));
    // }
    
    console.log("----");
    
    yield put(loaded());
    console.log("----");
  }
  catch(err) {
    yield put(tealCodeDeployError());
    
    yield put(loaded());
  }
  
}

// function dryrunDebugging(lsig, txn, data) {
//     if (data == null)
//     {
//         //compile
//         txns = [{
//             lsig: lsig,
//             txn: txn,
//         }];        
//     }
//     else
//     {
//         // source
//         txns = [{
//             txn: txn,
//         }];
//         sources = [new algosdk.modelsv2.DryrunSource("lsig", data.toString("utf8"), 0)];
//     }
//     const dr = new algosdk.modelsv2.DryrunRequest({
//         txns: txns,
//         sources: sources,
//     });
//     dryrunResponse = await algodclient.dryrun(dr).do();
//     return dryrunResponse;
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
    console.log("compile success");
    
    localStorage.setItem('contractAddress', data["address"]);
    
    yield put(codeCompileSuccess(data));
    yield put(getAddressBalance(data["address"], "contract"));
    yield put(loaded());
  }else{
    console.log("compile fail");
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


function getServer(walletInfo){
  let server;
  
  if(walletInfo["enablePureStake"] == true){
    server = walletInfo["serverAddress"];
  }else{
    if(walletInfo["network"] == "mainnet"){
      server = 'https://mainnet-algorand.api.purestake.io/ps1';
    }else if(walletInfo["network"] == "testnet"){
      server = 'https://testnet-algorand.api.purestake.io/ps1';
    }else if(walletInfo["network"] == "betanet"){
      server = 'https://betanet-algorand.api.purestake.io/ps1';
    }
  }
  console.log("server", server);

  return server;
}
function getPort(walletInfo){
  let port;
  
  if(walletInfo["enablePureStake"] == true){
    port = walletInfo["serverPort"];
  }else{
    port = '';
  }
  console.log("port", port);
  
  return port;
}
function getToken(walletInfo){
  let token;
  
  if(walletInfo["enablePureStake"] == true){
    token = {
        'X-API-Key': walletInfo["algodToken"]
    }
  }else{
    token = {
        'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
    }
  }
  console.log("token", token);
  
  return token;
}


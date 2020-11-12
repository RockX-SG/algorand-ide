import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  CHANGE_NETWORK,
  GENERATE_ACCOUNT_PRIMARY,
  RESTORE_ACCOUNT_PRIMARY,
  GENERATE_ACCOUNT_SECONDARY,
  RESTORE_ACCOUNT_SECONDARY,
  GENERATE_ACCOUNT_TERTIARY,
  RESTORE_ACCOUNT_TERTIARY,
  GENERATE_ACCOUNT_QUARTERNARY,
  RESTORE_ACCOUNT_QUARTERNARY,
  GENERATE_ACCOUNT_QUINARY,
  RESTORE_ACCOUNT_QUINARY,
  SEND_TRANSACTION,
  GET_FAUCET_BALANCE,
  ADD_ACCOUNT,
  MNEMONIC_REGENERATE,
  GET_ADDRESS_BALANCE,
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
  GET_ADDRESS_ASA,
} from 'containers/WalletPage/constants';

import {
  loaded,
  generateAccountPrimarySuccess,
  generateAccountSecondarySuccess,
  generateAccountTertiarySuccess,
  generateAccountQuarternarySuccess,
  generateAccountQuinarySuccess,
  generateAccountError,
  sendTransactionSuccess,
  sendTransactionError,
  getFaucetBalanceSuccess,
  getFaucetBalanceError,
  addAccountSuccess,
  addAccountError,
  mnemonicRegenerateSuccess,
  getAddressBalanceSuccess,
  getAddressBalanceError,
  getAddressAsaSuccess,
} from 'containers/WalletPage/actions';

import {
  tealAddToBash,
  tealGetContractBalance,
} from 'containers/ExplorerPage/actions';

import {
  makeSelectWalletPage
} from 'containers/WalletPage/selectors';

import {
  makeSelectExplorerPage
} from 'containers/ExplorerPage/selectors';

import {
  makeSelectTransactionPage
} from 'containers/TransactionPage/selectors';



var algosdk = require('algosdk')

// const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
// const port = '';
// const token = {
//     'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
// }
// 
// const algodclient = new algosdk.Algod(token, baseServer, port);

// Individual exports for testing
export default function* walletPageSaga() {
  // See example in containers/HomePage/saga.js
  
  yield takeEvery(CHANGE_NETWORK, changeNetwork);
  
  yield takeLatest(GENERATE_ACCOUNT_PRIMARY, generateAccountPrimary);
  yield takeLatest(RESTORE_ACCOUNT_PRIMARY, restoreAccountPrimary);
  yield takeLatest(GENERATE_ACCOUNT_SECONDARY, generateAccountSecondary);
  yield takeLatest(RESTORE_ACCOUNT_SECONDARY, restoreAccountSecondary);
  yield takeLatest(GENERATE_ACCOUNT_TERTIARY, generateAccountTertiary);
  yield takeLatest(RESTORE_ACCOUNT_TERTIARY, restoreAccountTertiary);
  yield takeLatest(GENERATE_ACCOUNT_QUARTERNARY, generateAccountQuarternary);
  yield takeLatest(RESTORE_ACCOUNT_QUARTERNARY, restoreAccountQuarternary);
  yield takeLatest(GENERATE_ACCOUNT_QUINARY, generateAccountQuinary);
  yield takeLatest(RESTORE_ACCOUNT_QUINARY, restoreAccountQuinary);
  yield takeLatest(SEND_TRANSACTION, sendTransaction);
  yield takeLatest(GET_FAUCET_BALANCE, getFaucetBalance);
  yield takeLatest(GET_ADDRESS_BALANCE, getAddressBalance);
  yield takeEvery(ADD_ACCOUNT, addAccount);
  yield takeLatest(MNEMONIC_REGENERATE, mnemonicRegenerate);
  
  yield takeLatest(CHANGE_SERVER_ADDRESS, restoreServerAddress);
  yield takeLatest(CHANGE_SERVER_PORT, restoreServerPort);
  yield takeLatest(CHANGE_ALGOD_TOKEN, restoreAlgodToken);
  
  yield takeLatest(GET_ADDRESS_ASA, getAddressAsa);
  
}


export function* changeNetwork() {
  console.log("changeNetwork")
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  // if(walletInfo["currentPage"] == "wallet"){
  //   yield put(getFaucetBalance());
  // }
  
  let accountInfo;
  accountInfo = yield call(algodclient.accountInformation, walletInfo["addressPrimary"]);
  console.log("accountInfo", accountInfo)
  
  yield put(generateAccountPrimarySuccess(walletInfo["addressPrimary"], walletInfo["addressShortenPrimary"], walletInfo["mnemonicPrimary"], accountInfo["amount"]));
  
  // accountInfo = yield call(algodclient.accountInformation, walletInfo["addressSecondary"]);
  // 
  // yield put(generateAccountSecondarySuccess(walletInfo["addressSecondary"], walletInfo["addressShortenSecondary"], walletInfo["mnemonicSecondary"], accountInfo["amount"]));
  // 
  // accountInfo = yield call(algodclient.accountInformation, walletInfo["addressTertiary"]);
  // 
  // yield put(generateAccountTertiarySuccess(walletInfo["addressTertiary"], walletInfo["addressShortenTertiary"], walletInfo["mnemonicTertiary"], accountInfo["amount"]));
  // 
  // accountInfo = yield call(algodclient.accountInformation, walletInfo["addressQuarternary"]);
  // 
  // yield put(generateAccountQuarternarySuccess(walletInfo["addressQuarternary"], walletInfo["addressShortenQuarternary"], walletInfo["mnemonicQuarternary"], accountInfo["amount"]));
  // 
  // accountInfo = yield call(algodclient.accountInformation, walletInfo["addressQuinary"]);
  // 
  // yield put(generateAccountQuinarySuccess(walletInfo["addressQuinary"], walletInfo["addressShortenQuinary"], walletInfo["mnemonicQuinary"], accountInfo["amount"]));
  
  yield put(loaded());
}

export function* generateAccountPrimary() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);

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
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
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

export function* generateAccountTertiary() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  var keys = algosdk.generateAccount();

  console.log("keys", keys["addr"]);

  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);

  localStorage.setItem('addressTertiary', keys["addr"]);

  localStorage.setItem('mnemonicTertiary', mnemonic);

  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);

  yield put(generateAccountTertiarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}

export function* generateAccountQuarternary() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  var keys = algosdk.generateAccount();

  console.log("keys", keys["addr"]);

  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);

  localStorage.setItem('addressQuarternary', keys["addr"]);

  localStorage.setItem('mnemonicQuarternary', mnemonic);

  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);

  yield put(generateAccountQuarternarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}

export function* generateAccountQuinary() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  var keys = algosdk.generateAccount();

  console.log("keys", keys["addr"]);

  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);

  localStorage.setItem('addressQuinary', keys["addr"]);

  localStorage.setItem('mnemonicQuinary', mnemonic);

  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);

  yield put(generateAccountQuinarySuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
}

export function* restoreAccountPrimary(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)
  
  yield put(generateAccountPrimarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

export function* restoreAccountSecondary(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountSecondarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

export function* restoreAccountTertiary(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountTertiarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

export function* restoreAccountQuarternary(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountQuarternarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

export function* restoreAccountQuinary(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  // let accountInfo = getAccountInfo(data["address"]);
  let addressShorten = shortenAddress(data["address"]);
  console.log("accountInfo", accountInfo)

  yield put(generateAccountQuinarySuccess(data["address"], addressShorten, data["mnemonic"], accountInfo["amount"]));

}

function shortenAddress(addr){
  let addressStart = addr.substr(0, 5);
  let addressEnd = addr.substr(addr.length - 5, 5);

  let address = addressStart + "..." + addressEnd;
  console.log("addressShorten", address);

  return address
}



export function* sendTransaction(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  
  console.log("sendTransaction");
  console.log(data["sendFrom"]);
  let explorerInfo = yield select(makeSelectExplorerPage());
  let transactionInfo = yield select(makeSelectTransactionPage());

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
  
  if((data["sendFrom"] == "faucet") && (captchaData == "" || captchaData == undefined || captchaData == null)){
  // if((data["sendFrom"] !== "faucetContract") && (captchaData == "" || captchaData == undefined || captchaData == null)){
    console.log("recaptcha error")
    yield put(sendTransactionError("recaptcha"));
  }else{
    if(data["sendFrom"] == "user"){
      addressTo = walletInfo["inputAddress"];
      amount = transactionInfo["inputSendAmount"] * 1000000;

      keys = keysUser;
    }else if(data["sendFrom"] == "faucet"){
      // addressTo = keysUser["addr"]; 
      addressTo = walletInfo["inputAddress"];
      amount = 100 * 1000000;

      keys = keysFaucet;
    }else if(data["sendFrom"] == "faucetContract"){
      console.log("teal address", explorerInfo["teal"]["codeCompileAddress"])
      addressTo = explorerInfo["teal"]["codeCompileAddress"];
      amount = 5 * 1000000;

      keys = keysFaucet;
    }
    
    let selectedAlgodClient = algodclient;

    console.log("addressTo", addressTo);
    
    let accountInfo = yield call(selectedAlgodClient.accountInformation, addressTo);
    console.log("accountInfo", accountInfo);
    let addressToBalance = accountInfo["amount"]/1000000;
    
    console.log("addressToBalance", addressToBalance);
    
    if(data["sendFrom"] == "faucet" && addressToBalance >= 50){
      yield put(sendTransactionError("Receiver address has more than sufficient ALGO. Leave some testnet ALGO for others to test with", data["sendFrom"]));
    }else{

      let params = yield call(selectedAlgodClient.getTransactionParams);
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
      let tx = yield call(selectedAlgodClient.sendRawTransaction, signedTxn.blob, txHeaders);
      console.log("Transaction : " + tx.txId);


      let status = yield call(selectedAlgodClient.status);
      console.log("status : " + status);
      let lastround = status.lastRound;
      console.log("lastround : " + lastround);
      while (true) {
        let pendingInfo = yield call(selectedAlgodClient.pendingTransactionInformation, tx.txId);
        if (pendingInfo.round !== null && pendingInfo.round > 0) {
          //Got the completed Transaction
          console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
          break;
        }
        lastround++;
        yield call(selectedAlgodClient.statusAfterBlock, lastround);
      }
      console.log("done");
      
      if(data["sendFrom"] == "faucetContract"){
        yield put(tealAddToBash(tx.txId));
      }else{
        yield put(sendTransactionSuccess(tx.txId, data["sendFrom"]));
      }
    }
    
    
    yield put(loaded());
  }
}

export function* getFaucetBalance() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  // let mnemonicFaucet = "core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign"
  // let addr = "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM"

  let accountInfo = yield call(algodclient.accountInformation, "CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM");

  yield put(getFaucetBalanceSuccess(accountInfo["amount"]));
}

export function* getAddressBalance(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  console.log("data", data)
  let accountInfo = yield call(algodclient.accountInformation, data["address"]);
  
  if(data["sendFrom"] == "contract"){
    yield put(tealGetContractBalance(accountInfo["amount"]));
  }else{
    yield put(getAddressBalanceSuccess(accountInfo["amount"]));
  }
}


export function* addAccount() {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let localMnemonicTertiary = localStorage.getItem('mnemonicTertiary');
  let localAddressTertiary = localStorage.getItem('addressTertiary');
  let localMnemonicQuarternary = localStorage.getItem('mnemonicQuarternary');
  let localAddressQuarternary = localStorage.getItem('addressQuarternary');
  let localMnemonicQuinary = localStorage.getItem('mnemonicQuinary');
  let localAddressQuinary = localStorage.getItem('addressQuinary');
  
  console.log("localMnemonicTertiary", localMnemonicTertiary);
  
  var keys = algosdk.generateAccount();
  
  console.log("keys", keys["addr"]);
  
  var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  console.log("mnemonic", mnemonic);
  
  let accountInfo = yield call(algodclient.accountInformation, keys["addr"]);
  let addressShorten = shortenAddress(keys["addr"]);
  
  console.log("walletInfo[addressArray].length", walletInfo["addressArray"].length);
  
  if(walletInfo["addressArray"].length == 2){
    if(localMnemonicTertiary == "" || localMnemonicTertiary == null){
      // onGenerateAccountTertiary();
      console.log("xxxx");

      localStorage.setItem('addressTertiary', keys["addr"]);
      localStorage.setItem('mnemonicTertiary', mnemonic);
      
      yield put(addAccountSuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
    }else{
      console.log("yyyy");
      // onRestoreAccountTertiary([localMnemonicTertiary, localAddressTertiary]);
      let accountInfoTertiary = yield call(algodclient.accountInformation, localAddressTertiary);
      let addressShortenTertiary = shortenAddress(localAddressTertiary);

      localStorage.setItem('addressTertiary', localAddressTertiary);
      localStorage.setItem('mnemonicTertiary', localMnemonicTertiary);
      
      yield put(addAccountSuccess(localAddressTertiary, addressShortenTertiary, localMnemonicTertiary, accountInfoTertiary["amount"]));
    }
    
    localStorage.setItem('totalAccount', 3);
  }else if(walletInfo["addressArray"].length == 3){
    if(localMnemonicQuarternary == "" || localMnemonicQuarternary == null){
      // onGenerateAccountQuarternary();

      localStorage.setItem('addressQuarternary', keys["addr"]);
      localStorage.setItem('mnemonicQuarternary', mnemonic);
      
      yield put(addAccountSuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
    }else{
      // onRestoreAccountQuarternary([localMnemonicQuarternary, localAddressQuarternary]);
      let accountInfoQuarternary = yield call(algodclient.accountInformation, localAddressQuarternary);
      let addressShortenQuarternary = shortenAddress(localAddressQuarternary);

      localStorage.setItem('addressQuarternary', localAddressQuarternary);
      localStorage.setItem('mnemonicQuarternary', localMnemonicQuarternary);
      
      yield put(addAccountSuccess(localAddressQuarternary, addressShortenQuarternary, localMnemonicQuarternary, accountInfoQuarternary["amount"]));
    }
    
    localStorage.setItem('totalAccount', 4);
  }else if(walletInfo["addressArray"].length == 4){
    if(localMnemonicQuinary == "" || localMnemonicQuinary == null){
      // onGenerateAccountQuinary();

      localStorage.setItem('addressQuinary', keys["addr"]);
      localStorage.setItem('mnemonicQuinary', mnemonic);
      
      yield put(addAccountSuccess(keys["addr"], addressShorten, mnemonic, accountInfo["amount"]));
    }else{
      // onRestoreAccountQuinary([localMnemonicQuinary, localAddressQuinary]);
      let accountInfoQuinary = yield call(algodclient.accountInformation, localAddressQuinary);
      let addressShortenQuinary = shortenAddress(localAddressQuinary);

      localStorage.setItem('addressQuinary', localAddressQuinary);
      localStorage.setItem('mnemonicQuinary', localMnemonicQuinary);
      
      yield put(addAccountSuccess(localAddressQuinary, addressShortenQuinary, localMnemonicQuinary, accountInfoQuinary["amount"]));
    }
    
    localStorage.setItem('totalAccount', 5);
  }
  
  yield put(loaded());
}


export function* mnemonicRegenerate(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  
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


export function* getAddressAsa(data) {
  let walletInfo = yield select(makeSelectWalletPage());
  
  let baseServer = getServer(walletInfo);
  let port = getPort(walletInfo);
  let token = getToken(walletInfo);

  let algodclient = new algosdk.Algod(token, baseServer, port);
  
  let address = data["address"];
  
  let accountInfo;
  accountInfo = yield call(algodclient.accountInformation, address);
  console.log("accountInfo", accountInfo)
  
  let assetAsaArray = [];
  
  for (var key in accountInfo["thisassettotal"]) {
    let assetAsaArraySingle = accountInfo["thisassettotal"][key];
    
    assetAsaArraySingle["id"] = key;
    
    assetAsaArray.push(assetAsaArraySingle);
  }
  console.log(assetAsaArray);
  
  yield put(getAddressAsaSuccess(data["accountNum"], assetAsaArray));
}


export function* restoreServerAddress(data) {
  console.log("data", data)
  localStorage.setItem('serverAddress', data["serverAddress"]);
}

export function* restoreServerPort(data) {
  console.log("data", data)
  localStorage.setItem('serverPort', data["serverPort"]);
}

export function* restoreAlgodToken(data) {
  console.log("data", data)
  localStorage.setItem('algodToken', data["algodToken"]);
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

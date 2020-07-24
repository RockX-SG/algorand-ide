import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  CREATE_ASSET
} from 'containers/SmartAssetPage/constants';

import {
  createAssetSuccess,
  createAssetError
} from 'containers/SmartAssetPage/actions';

import {
  makeSelectSmartAssetPage
} from 'containers/SmartAssetPage/selectors';

import {
  makeSelectWalletPage
} from 'containers/WalletPage/selectors';

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

// Individual exports for testing
export default function* smartAssetPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_ASSET, createAsset);
}

export function* createAsset() {
  let smartAssetInfo = yield select(makeSelectSmartAssetPage());
  let walletInfo = yield select(makeSelectWalletPage());

  // let mnemonic = localStorage.getItem('mnemonic');
  let mnemonic = walletInfo["mnemonic"];
  let keys = algosdk.mnemonicToSecretKey(mnemonic);
  
  console.log("mnemonic", mnemonic);
  
  let captchaData = walletInfo["captchaData"];
  
  if(captchaData == "" || captchaData == undefined || captchaData == null){
    console.log("recaptcha error")
    yield put(createAssetError("recaptcha"));
  }else{

    let params = yield call(algodclient.getTransactionParams);
    let endRound = params.lastRound + parseInt(1000);

    let sFee = yield call(algodclient.suggestedFee);
    let fee = sFee.fee;

    let decimals = 0;
    console.log("test");

    let manager = smartAssetInfo["inputManager"];
    let reserve = smartAssetInfo["inputReserve"];
    let freeze = smartAssetInfo["inputFreeze"];
    let clawback = smartAssetInfo["inputClawback"];

    let txn = algosdk.makeAssetCreateTxn(smartAssetInfo["inputAddress"], fee, params.lastRound, endRound, smartAssetInfo["inputNote"], params.genesishashb64, params.genesisID, smartAssetInfo["inputTotalIssuance"], decimals, smartAssetInfo["inputDefaultFrozen"], manager, reserve, freeze, clawback, smartAssetInfo["inputUnitName"], smartAssetInfo["inputAssetName"], smartAssetInfo["inputAssetURL"], smartAssetInfo["inputAssetMetadataHash"]);
    console.log(txn);
    console.log("xxx",smartAssetInfo["inputReserve"]);

    let rawSignedTxn = txn.signTxn(keys.sk);
    console.log(rawSignedTxn);

    let tx = yield call(algodclient.sendRawTransaction, rawSignedTxn);
    console.log("Transaction : " + tx.txId);

    let assetID = null;

    // wait for transaction to be confirmed
    yield call(waitForConfirmation, algodclient, tx.txId);


    // // Get the new asset's information from the creator account
    let ptx = yield call(algodclient.pendingTransactionInformation, tx.txId);
    assetID = ptx.txresults.createdasset;
    console.log("AssetID = " + assetID);

    yield put(createAssetSuccess(tx.txId, assetID));
  }
}

const waitForConfirmation = async function (algodclient, txId) {
  let lastround = (await algodclient.status()).lastRound;
  while (true) {
    const pendingInfo = await algodclient.pendingTransactionInformation(txId);
    if (pendingInfo.round !== null && pendingInfo.round > 0) {
      //Got the completed Transaction
      console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
      break;
    }
    lastround++;
    await algodclient.statusAfterBlock(lastround);
  }
};

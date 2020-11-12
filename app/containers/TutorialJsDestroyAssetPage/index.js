/**
 *
 * TutorialJsDestroyAssetPage
 *
 */
 
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTutorialJsDestroyAssetPage from './selectors';


import {
  makeSelectTutorialPage
} from '../TutorialPage/selectors';

// import reducer from './reducer';
import reducer from '../TutorialPage/reducer';
// import saga from './saga';
import saga from '../TutorialPage/saga';

import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require("codemirror/theme/dracula.css");

import Tutorial from './Tutorial';
import Input from './Input';

import BashConsole from '../../components/BashConsole';

import TutorialSelect from '../../components/TutorialSelect';

import {
  loading,
  selectPage
} from '../WalletPage/actions';

import {
  jsCodeExecuteTutorial,
} from '../TutorialPage/actions';

export function TutorialJsDestroyAssetPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsDestroyAssetPage', reducer });
  // useInjectSaga({ key: 'tutorialJsDestroyAssetPage', saga });
  useInjectReducer({ key: 'tutorialPage', reducer });
  useInjectSaga({ key: 'tutorialPage', saga });

  useEffect(() => {
    onSelectPage("tutorial");
  });

  var optionsCode = {
		lineNumbers: true,
		readOnly: false,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "dracula",
		mode: 'javascript',
    lineWrapping: true
	};

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};
  
  var step1Code = `const algosdk = require('algosdk');

const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}
  
// paste in the asset id from the create asset tutorial
// let assetID = (your assetID);
let assetID = 327472;


var account1_mnemonic = "portion never forward pill lunch organ biology" +
    " weird catch curve isolate plug innocent skin grunt" +
    " bounce clown mercy hole eagle soul chunk type absorb trim";

var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
console.log(recoveredAccount1.addr);

addr = recoveredAccount1.addr;
note = undefined;`

  var step2Code = `let dtxn = algosdk.makeAssetDestroyTxn(addr, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);`

  var step3Code = `rawSignedTxn = dtxn.signTxn(recoveredAccount2.sk)`

var step4Code = `let dtx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Destroy Transaction id: " + dtx.txId);`

var step5Code = `console.log("Asset ID: " + assetID);
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for Account 3: " + JSON.stringify(act.assets));`

var step6Code = `Asset Destroy Transaction : 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ
Transaction 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ confirmed in round 6026503
Asset ID: 327472
Account Information for Account 3: {"creator":"","amount":0,"frozen":true}
Account Information for Account 1: undefined`

var step7Code = `const algosdk = require('algosdk');

// Retrieve the token, server and port values for your installation in the 
// algod.net and algod.token files within the data directory

// UPDATE THESE VALUES
// const token = "TOKEN";
// const server = "SERVER";
// const port = PORT;

// sandbox

const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Structure for changing blockchain params
var cp = {
    fee: 0,
    firstRound: 0,
    lastRound: 0,
    genID: "",
    genHash: ""
}
// Utility function to update params from blockchain
var getChangingParms = async function (algodclient) {
    let params = await algodclient.getTransactionParams();
    cp.firstRound = params.lastRound;
    cp.lastRound = cp.firstRound + parseInt(1000);
    let sfee = await algodclient.suggestedFee();
    cp.fee = sfee.fee;
    cp.genID = params.genesisID;
    cp.genHash = params.genesishashb64;
}

// Function used to wait for a tx confirmation
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

// Recover accounts
// paste in mnemonic phrases here for each account

// var account1_mnemonic = "PASTE your phrase for account 1";
// var account2_mnemonic = "PASTE your phrase for account 2";
// var account3_mnemonic = "PASTE your phrase for account 3"

var account1_mnemonic = "portion never forward pill lunch organ biology" +
    " weird catch curve isolate plug innocent skin grunt" +
    " bounce clown mercy hole eagle soul chunk type absorb trim";
var account2_mnemonic = "place blouse sad pigeon wing warrior wild script" +
    " problem team blouse camp soldier breeze twist mother" +
    " vanish public glass code arrow execute convince ability" +
    " there";
var account3_mnemonic = "image travel claw climb bottom spot path roast" +
    " century also task cherry address curious save item" +
    " clean theme amateur loyal apart hybrid steak about blanket"


var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
console.log(recoveredAccount1.addr);
console.log(recoveredAccount2.addr);
console.log(recoveredAccount3.addr);

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

// Debug Console should look similar to this

// THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM  
// AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU   
// 3ZQ3SHCYIKSGK7MTZ7PE7S6EDOFWLKDQ6RYYVMT7OHNQ4UJ774LE52AQCU   


(async () => {
    // Destroy and Asset:
    // paste in the asset id from the create asset tutorial
    let assetID = 327472;
    // All of the created assets should now be back in the creators
    // Account so we can delete the asset.
    // If this is not the case the asset deletion will fail
    // The address for the from field must be the manager account
    // Which is currently the creator addr1
    addr = recoveredAccount1.addr;
    note = undefined;

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
    await getChangingParms(algodclient);

    // if all assets are held by the asset creator,
    // the asset creator can sign and issue "txn" to remove the asset from the ledger. 
    let dtxn = algosdk.makeAssetDestroyTxn(addr, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);
    // The transaction must be signed by the manager which 
    // is currently set to account1
    rawSignedTxn = dtxn.signTxn(recoveredAccount1.sk)
    let dtx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Destroy Transaction : " + dtx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, dtx.txId);

    // The account3 and account1 should no longer contain the asset as it has been destroyed
    console.log("Asset ID: " + assetID);
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for Account 3: " + JSON.stringify(act.assets[assetID]));
    act = await algodclient.accountInformation(recoveredAccount1.addr);
    console.log("Account Information for Account 1: " + JSON.stringify(act.assets[assetID]));

    // Notice that although the asset was destroyed, the asset id and associated 
    // metadata still exists in account holdings for Account 3. 
    // When you destroy an asset, the global parameters associated with that asset
    // (manager addresses, name, etc.) are deleted from the creator's balance record (Account 1).
    // However, holdings are not deleted automatically -- users still need to close out of the deleted asset.
    // This is necessary for technical reasons because we currently can't have a single transaction touch potentially 
    // thousands of accounts (all the holdings that would need to be deleted).

    // Asset Destroy Transaction: 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ
    // Transaction 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ confirmed in round 6026503
    // Asset ID: 327472
    // Account Information for Account 3: { "creator": "", "amount": 0, "frozen": true }
    // Account Information for Account 1: undefined

})().catch(e => {
    console.log(e);
    console.trace();
});`

  return (
    <Tutorial>
      <div className="pageName">
        Tutorials
      </div>
      <div>
        <div className="pageLeft">
          <TutorialSelect />
        </div>

        <div className="pageRight">
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              Tutorial Source:
            </div>
            <div className="tutorialSectionLink">
              <a href="https://developer.algorand.org/tutorials/destroy-asset-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/destroy-asset-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Define the Destroy Asset Parameters
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The only parameter that needs to be defined when conducting an asset destroy operation is the sender address, which needs to be the manager address of the asset. See Change Asset Manager Tutorial.

              </p>
              <p>
              
                All of the created assets should now be back in the creators Account so we can delete the asset. If this is not the case the asset deletion will fail. The address for the from field must be the manager account, which is currently the creator of Account 1 (addr).
              </p>
            </div>
            <div>
              <CodeMirror
                value={step1Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["destroy-asset", 1, step1Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.destroyAsset["step1"]} />
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              2. Create Destroy Asset Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                With all assets back in the creator’s account, the manager (Account 1) destroys the asset.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step2Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              3. Sign Destroy Asset Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                The transaction must be signed by the manager which is currently set to Account 1.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step3Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              4. Send Destroy Asset Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Broadcast the transaction to the blockchain.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step4Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              5. Print Account Information
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Account 3 and Account 1 should no longer contain the asset as it has been destroyed.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step5Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              6. Check the Transaction on a Block Explorer
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Check the transaction in the block explorer.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step6Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
            <div>
              <p>
                Notice that although the asset was destroyed, the asset id and associated metadata still exists in the account balance record. When you destroy an asset, the global parameters associated with that asset (manager addresses, name, etc.) are deleted from the creator’s balance record. However, holdings are not deleted automatically – users still need to close out of the deleted asset. This is necessary for technical reasons because we can’t have a single transaction touch potentially thousands of accounts (all the holdings that would need to be deleted).
              </p>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              7. Complete Example

            </div>
            <div>
              <CodeMirror
                value={step7Code}
                options={optionsCode}
                autoFocus={false}
                onBeforeChange={(editor, data, value) => {
                  console.log('set value here', {value});
                }}
                onChange={(editor, value) => {
                  console.log('controlled', {value});
                }}
              />
            </div>
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["destroy-asset", 7, step7Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.destroyAsset["step7"]} />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}


TutorialJsDestroyAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsDestroyAssetPage: makeSelectTutorialJsDestroyAssetPage(),
  tutorialPage: makeSelectTutorialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCodeExecuteJs: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(jsCodeExecuteTutorial(evt));
    },
    onSelectPage: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectPage(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TutorialJsDestroyAssetPage);

/**
 *
 * TutorialJsOptInAssetPage
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
import makeSelectTutorialJsOptInAssetPage from './selectors';


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

export function TutorialJsOptInAssetPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsOptInAssetPage', reducer });
  // useInjectSaga({ key: 'tutorialJsOptInAssetPage', saga });
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
  
  var step1Code = `// paste in the asset id from the create asset tutorial
    let assetID = (your assetid);
    let note = undefined;
    let sender = recoveredAccount3.addr;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let amount = 0;`

  var step2Code = `let opttxn = algosdk.makeAssetTransferTxn(sender, recipient, closeRemainderTo, revocationTarget,
          cp.fee, amount, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);`

  var step3Code = `rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);`


var step4Code = `let opttx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Opt-In Transaction id : " + opttx.txId);`

var step5Code = `await waitForConfirmation(algodclient, opttx.txId);
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for Account 3: " + JSON.stringify(act.assets));`

var step6Code = `Asset Opt-In Transaction id : W6EAWAF33QV7J6EFDLHB4MHL4EWKDYMR4RAUOSZN5BUWJU4ZK4PQ
Transaction W6EAWAF33QV7J6EFDLHB4MHL4EWKDYMR4RAUOSZN5BUWJU4ZK4PQ confirmed in round 5177519
Account Information for Account 3: {"200694":{"creator":"LD6HDJIGSOBO3QJYDXXRZYAHOGQHSXO7VZJBYCUKR6X5AUDEML6FFGRH7E","amount":0,"frozen":false}}`

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
    // Opting in to an Asset:
    // Opting in to transact with the new asset
    // Allow accounts that want recieve the new asset
    // Have to opt in. To do this they send an asset transfer
    // of the new asset to themseleves 
    // In this example we are setting up the 3rd recovered account to 
    // receive the new asset

    // paste in the asset id from the create asset tutorial
    // let assetID = (your assetID);
    let assetID = 149774;
    
    let note = undefined;
    let sender = recoveredAccount3.addr;
    let recipient = sender;
    // We set revocationTarget to undefined as 
    // This is not a clawback operation
    let revocationTarget = undefined;
    // CloseReaminerTo is set to undefined as
    // we are not closing out an asset
    let closeRemainderTo = undefined;
    // We are sending 0 assets
    amount = 0;

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
    await getChangingParms(algodclient);

    // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
    let opttxn = algosdk.makeAssetTransferTxn(sender, recipient, closeRemainderTo, revocationTarget,
        cp.fee, amount, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);

    // Must be signed by the account wishing to opt in to the asset    
    rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
    let opttx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Transaction : " + opttx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, opttx.txId);

    //You should now see the new asset listed in the account information
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for: " + JSON.stringify(act.assets[assetID]));

    // your console/terminal out put should look as follows
    //   Transaction YT2U2WWBUWB4P54M24OUCMIIN3VDZ64LIDCBMED6AGQIQZKT6PTQ confirmed in round 4273745
    //   Account Information for: { "creator": "THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM", "amount": 0, "frozen": false }
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
              <a href="https://developer.algorand.org/tutorials/opt-in-asset-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/opt-in-asset-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Define Opt-In Transaction Parameters
            </div>
            <div className="tutorialSectionDescription">
              <p>
              An asset can be referenced by its assetName or its assetID which is generated when you create the asset. Given that the assetName is not unique, it is always recommended to reference an asset by its assetID, which is a unique value.

              </p>
              <p>
              Notice that in this next block of code, the sender and recipient are the same account.
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
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              2. Create Opt-In Transaction

            </div>
            <div className="tutorialSectionDescription">
              <p>
                Create the Opt-in transaction.
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
              3. Sign Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The transaction must be signed by the account wishing to opt-in to the asset, in this case- Account 3.
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
              4. Send the Transaction to the network
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
              5. Print the Account Information
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Print the account information for account 3.
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
              6. Check the transaction on a block explorer
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Once you’ve completed these steps you’re output should look something like this:
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
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              7. Complete Example
            </div>
            <div className="tutorialSectionDescription">
              <p>
                This example assumes that the asset has already been created. If the asset has not been created, it will throw an error. In this example, account 3 is opting in.
              </p>
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
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["opt-in-asset", 7, step7Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.optInAsset["step7"]} />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}


TutorialJsOptInAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsOptInAssetPage: makeSelectTutorialJsOptInAssetPage(),
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

export default compose(withConnect)(TutorialJsOptInAssetPage);

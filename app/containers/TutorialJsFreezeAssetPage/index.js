/**
 *
 * TutorialJsFreezeAssetPage
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
import makeSelectTutorialJsFreezeAssetPage from './selectors';


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

export function TutorialJsFreezeAssetPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsFreezeAssetPage', reducer });
  // useInjectSaga({ key: 'tutorialJsFreezeAssetPage', saga });
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
  
  var step1Code = `// Freeze Asset:
    // replace with your  assetid
    let assetID = (your asset id);

    // The asset was created and configured to allow freezing an account
    // If the freeze address is set "", it will no longer be possible to do this.
    // In this example we will now freeze account3 from transacting with the 
    // The newly created asset. 
    // The freeze transaction is sent from the freeze acount
    // Which in this example is account2 
    from = recoveredAccount2.addr;
    freezeTarget = recoveredAccount3.addr;
    freezeState = true;
    note = undefined;`

  var step2Code = `let ftxn = algosdk.makeAssetFreezeTxn(from, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID,
        assetID, freezeTarget, freezeState)`

  var step3Code = `rawSignedTxn = ftxn.signTxn(recoveredAccount2.sk)`


var step4Code = `let ftx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Freeze Transaction id: " + ftx.txId);`

var step5Code = `await waitForConfirmation(algodclient, ftx.txId);
    // You should now see the asset is frozen listed in the account information    
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for: " + JSON.stringify(act.assets[assetID]));`

var step6Code = `Asset Freeze Transaction id: HXAPP35LX4D6RY3KQBXFFDB5YVFNOYUFBF7YQWRWNSRU3E5NKVHQ
Transaction HXAPP35LX4D6RY3KQBXFFDB5YVFNOYUFBF7YQWRWNSRU3E5NKVHQ confirmed in round 6022825
Account Information for: {"creator":"THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM","amount":10,"frozen":true}`

var step7Code = `// Attempt to spend Frozen Asset
    sender = recoveredAccount3.addr;
    recipient = recoveredAccount2.addr;
    revocationTarget = undefined;
    closeRemainderTo = undefined;
// Amount of the asset attempting to transfer
    amount = 3;

    let ftxnattempt = algosdk.makeAssetTransferTxn(recoveredAccount3.addr, recoveredAccount2.addr,  closeRemainderTo, revocationTarget, cp.fee, amount, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);

    rawSignedTxn = ftxnattempt.signTxn(recoveredAccount3.sk);
    // this should fail as we are attempting to send from a frozen account 
    let ftxna = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Opt-In Transaction id : " + ftxna.txId);`
    
    var step7bCode = `status:400
    statusCode:400
    statusType:4
    text:"TransactionPool.Remember: transaction 3FRT6VGVSC3QEFLMEUWLQD4PGLXRJDL4QYCOTVXKAL3GIAZGZT7Q: asset 327472 frozen in 3ZQ3SHCYIKSGK7MTZ7PE7S6EDOFWLKDQ6RYYVMT7OHNQ4UJ774LE52AQCU"
    type:"text/plain"`
    
    
    var step8Code = `const algosdk = require('algosdk');
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
    // Freeze Asset:
    // replace with your  assetid
    let assetID = 327472;

    // The asset was created and configured to allow freezing an account
    // If the freeze address is set "", it will no longer be possible to do this.
    // In this example we will now freeze account3 from transacting with the 
    // The newly created asset. 
    // The freeze transaction is sent from the freeze acount
    // Which in this example is account2 
    from = recoveredAccount2.addr;
    freezeTarget = recoveredAccount3.addr;
    freezeState = true;
    note = undefined;

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
    await getChangingParms(algodclient);

    // The freeze transaction needs to be signed by the freeze account
    let ftxn = algosdk.makeAssetFreezeTxn(from, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID,
        assetID, freezeTarget, freezeState)

    // Must be signed by the freeze account   
    rawSignedTxn = ftxn.signTxn(recoveredAccount2.sk)
    let ftx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Freeze Transaction id: " + ftx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, ftx.txId);

    // You should now see the asset is frozen listed in the account information
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for: " + JSON.stringify(act.assets[assetID]));

    //you should see console/terminal output similar to this witht he frozen vales set to true
    //    Asset Freeze Transaction id: CZ7VYA7UFGRVJ4EHQOLKCPRESDJC4ULHUTWM3QCAPZR3K4KVT2IQ
    //    Transaction CZ7VYA7UFGRVJ4EHQOLKCPRESDJC4ULHUTWM3QCAPZR3K4KVT2IQ confirmed in round 4274065
    //    Account Information for: { "creator": "THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM", "amount": 10, "frozen": true }

    // Attempt to spend Frozen Asset (this should fail)
    sender = recoveredAccount3.addr;
    recipient = recoveredAccount2.addr;
    revocationTarget = undefined;
    closeRemainderTo = undefined;
    // Amount of the asset attempting to transfer
    amount = 3;
    let ftxnattempt = algosdk.makeAssetTransferTxn(recoveredAccount3.addr, recoveredAccount2.addr, closeRemainderTo, revocationTarget, cp.fee, amount, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);
    rawSignedTxn = ftxnattempt.signTxn(recoveredAccount3.sk);
    // this should fail as we are attempting to send from a frozen account  
    let ftxna = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Transaction id : " + ftxna.txId);
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
              <a href="https://developer.algorand.org/tutorials/freeze-asset-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/freeze-asset-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Define the Freeze Transaction Params
            </div>
            <div className="tutorialSectionDescription">
              <p>
                In this first step, we need to define a freezeTarget as well as a freezeState . This asset was made “freezable” when we first created the asset. Setting an address to the freeze parameter in the makeAssetCreateTxn() method makes the asset “freezable.” Setting the freeze address parameter to “”, would make the asset unfreezable and that characteristic cannot be changed retroactively. In this example we will freeze account3 from transacting with an asset. The freeze transaction is sent from the freeze account, Which in this example is account 2.
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
              2. Create Asset Freeze Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Call makeAssetFreezeTxn to freeze an account.
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
              3. Sign Freeze Transaction

            </div>
            <div className="tutorialSectionDescription">
              <p>
              The freeze transaction needs to be signed by the freeze account (Account 2).
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
              4. Send Freeze Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Broadcast the freeze transaction to the blockchain.
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
                You should now see the asset is frozen listed in the account information.
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
            7. Attempt to Spend the Asset
            </div>
            <div className="tutorialSectionDescription">
              <p>
                At this point, Account 3 should have all of its asset holdings frozen and should not be able to trigger a spend transaction of the asset that was frozen.
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
            <div className="tutorialSectionDescription">
              <p>
                The output should look something like this:
              </p>
            </div>
            <div>
              <CodeMirror
                value={step7bCode}
                options={optionsResponse}
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
            8. Complete Example
            </div>
            <div className="tutorialSectionDescription">
              <p>
                This example assumes that the freezeTarget account has an asset transferred to it. The code that follows the comment ATTEMPT TO SPEND FROZEN ASSET should throw an error.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step8Code}
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
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["freeze-asset", 8, step8Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.freezeAsset["step8"]} />
            
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}

TutorialJsFreezeAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsFreezeAssetPage: makeSelectTutorialJsFreezeAssetPage(),
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

export default compose(withConnect)(TutorialJsFreezeAssetPage);

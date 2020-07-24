/**
 *
 * TutorialPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTutorialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
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

import TutorialSelect from '../../components/TutorialSelect';

export function TutorialPage() {
  useInjectReducer({ key: 'tutorialPage', reducer });
  useInjectSaga({ key: 'tutorialPage', saga });

  var optionsCode = {
		lineNumbers: true,
		readOnly: false,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "dracula",
		mode: 'markdown',
    lineWrapping: true
	};

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};
  
  var step1Code = `const algosdk = require('algosdk');

const token = <"algod-token">;
const server = <"http://algod-address">;
const port = <algod-port>;

//instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);`

  var step2Code = `var account1_mnemonic = "indoor project long invite vehicle toy travel image leopard true alpha mix know exhaust curious giggle day biology parent coffee pigeon black lunch abandon inquiry";
var account2_mnemonic = "shoulder grunt system render critic possible fortune float season weapon luxury jar patient build wheat siege behind patrol churn liberty catalog tongue drift above bring";
var account3_mnemonic = "indoor project long invite vehicle toy travel image leopard true alpha mix know exhaust curious giggle day biology parent coffee pigeon black lunch abandon inquiry";

var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
console.log("Account One: " + recoveredAccount1.addr);
console.log("Account Two: " + recoveredAccount2.addr);
console.log("Account Three: " + recoveredAccount3.addr);`

  var step3Code = `var cp = {
    fee: 0, 
    firstRound: 0,  
    lastRound: 0, 
    genID: "",
    genHash: ""    
}
var getChangingParms = async function( algodclient ) {
    let params = await algodclient.getTransactionParams();
    cp.firstRound = params.lastRound;
    cp.lastRound = cp.firstRound + parseInt(1000);
    let sfee = await algodclient.suggestedFee();
    cp.fee = sfee.fee;
    cp.genID = params.genesisID;
    cp.genHash = params.genesishashb64;
}`

var step3bCode = `(async() => {

    await getChangingParms(algodclient);
    let note = undefined;
    let addr = recoveredAccount1.addr;
    let defaultFrozen = false;
    let totalIssuance = 100;
    let unitName = "t-c"; 
    let assetName = "Tutorial-Coin";
    let assetURL = "http://someurl";
    let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
    let manager = recoveredAccount2.addr;
    let reserve = recoveredAccount2.addr;
    let freeze = recoveredAccount2.addr;
    let clawback = recoveredAccount2.addr;

})().catch(e => {
    console.log(e);
    console.trace();
});`

var step4Code = `let txn = algosdk.makeAssetCreateTxn(addr, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, totalIssuance, defaultFrozen, manager, reserve, freeze, clawback, unitName, assetName, assetURL, assetMetadataHash);`

var step5Code = `let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)`

var step6Code = `let tx = (await algodclient.sendRawTransaction(rawSignedTxn));
        console.log("Asset Creation Txn : " + tx.txId);`

var step7Code = `Account One: WCQNTSIKNAYRWYQBJBRWUG7QEBLSNQRKEQI7FDYKAIHG555ZZ5FGNNIUJY
Account Two: CYY47X6CZNO2HY4VCW5QLLIZL4UN7IZP6NALUQFRZKO7MCZ2YSZPSS5HZQ
Account Three: WCQNTSIKNAYRWYQBJBRWUG7QEBLSNQRKEQI7FDYKAIHG555ZZ5FGNNIUJY
Asset Creation Txn : LISSHM5YU2EU6OERZJTJWYTVKJZ22MK4AG4SYMGCOTWZO4VHARFA`

const options = [
  { value: 'contract1', label: 'Create an Account on TestNet using JavaScript' },
  { value: 'contract2', label: 'Create an Asset using JavaScript' },
  { value: 'contract3', label: 'LimitOrder Contract with JavaScript' },
  { value: 'contract4', label: 'Transfer an Asset using JavaScript' },
]

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
            <div>
              <a href="https://developer.algorand.org/tutorials/create-asset-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/create-asset-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Instantiate Algod Wrapper
            </div>
            <div className="tutorialSectionDescription">
              <p>
                In this step, we are passing in the token, server, and port values from a local node or local sandbox instance. You can also connect to remote node using a third-party service.
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
              <div className="InputSection">
                <div className="InputSectionTitle">
                  Algo Token:
                </div>
                <div>
                  <Input
                    id="assetURL"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div className="InputSection">
                <div className="InputSectionTitle">
                  Algod Address:
                </div>
                <div>
                  <Input
                    id="assetURL"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div className="InputSection">
                <div className="InputSectionTitle">
                  Algod Port:
                </div>
                <div>
                  <Input
                    id="assetURL"
                    type="text"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div>
              <button>
                Run & Compile
              </button>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              2. Recover, Define and Print Accounts
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Hardcoding and recovering accounts in this way is not advised, for security purposes, but is sufficient for this tutorial.
                          </p>
                <p>
  Note: If you have not already done so, use this tutorial to Create Accounts
              </p>
    <p>
  This tutorial will use TestNet accounts that have been pre-created from the Create Accounts tutorial. Be sure to dispense Algos to these accounts before continuing, using the TestNet Dispenser.
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
              3. Define Asset Create Transaction Parameters
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Here we structure the changing blockchain parameters and include a utility function to update parameters from the blockchain. This will come in handy in the following tutorials where we will need to pass in these same parameters several times.
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
            <div className="tutorialSectionDescription">
              <p>
              Create an async function and write all the logic in there.
              </p>
            </div>
            <div>
              <CodeMirror
                value={step3bCode}
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
              4. Create ASA transaction object
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Use this code to create an asset transaction.
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
              5. Sign Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Sign the transaction.
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
              6. Send Create ASA Transaction to the Blockchain and print the Tx ID
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Broadcast the transaction to the Blockchain.
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
              7. Check the transaction on a block explorer
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Once you’ve completed these steps you’re output should look like this:
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
              You can check the asset creation transaction on a block explorer for reference.
              </p>
            </div>
          </div>
          <div className="tutorialSection">
            <button>
              Complete Example
            </button>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}

TutorialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialPage: makeSelectTutorialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TutorialPage);

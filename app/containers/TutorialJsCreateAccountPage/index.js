
/**
 *
 * TutorialJsCreateAccountPage
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
import makeSelectTutorialJsCreateAccountPage from './selectors';
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

export function TutorialJsCreateAccountPage() {
  useInjectReducer({ key: 'tutorialJsCreateAccountPage', reducer });
  useInjectSaga({ key: 'tutorialJsCreateAccountPage', saga });

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
  
  let account = algosdk.generateAccount();
console.log("Account Address: ", account.addr);`

  var step2Code = `let mn = algosdk.secretKeyToMnemonic(account.sk);
console.log("Account Mnemonic: ", mn);`

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

var step4Code = `// sandbox
const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const server = "http://localhost";
const port = 4001;

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

(async () => {
    let account_info = (await algodclient.accountInformation(account.addr));
    let acct_string = JSON.stringify(account_info);
    console.log("Account Info: " + acct_string);
})().catch(e => {
    console.log(e);
});`

var step4bCode = `$node accountInfo.js
Account Info: {"round":5037042,"address":"LKI7HF4EQV32BSNRAG2RGXITTFN6FUSBHHUKL26HU4X5HNYDVE5QONX6QE","amount":100000000,"pendingrewards":0,"amountwithoutpendingrewards":100000000,"rewards":0,"status":"Offline"}`

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
      <div className="pageLeft">
        <TutorialSelect />
      </div>

      <div className="pageRight">
        <div className="tutorialSection">
          <div className="tutorialSectionTitle">
            Tutorial Source:
          </div>
          <div>
            <a href="https://developer.algorand.org/tutorials/create-account-testnet-javascript/" target="_blank">
              https://developer.algorand.org/tutorials/create-account-testnet-javascript/
            </a>
          </div>
        </div>
        <div className="tutorialSection">
          <div className="tutorialSectionTitle">
            1. Generate an Algorand Key Pair
          </div>
          <div className="tutorialSectionDescription">
            <p>
              Import the algosdk
            </p>
            <p>
              Use the generateAccount() method to generate the keypair.
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
            2. Retrieve the Private Key Mnemonic
          </div>
          <div className="tutorialSectionDescription">
            <p>
            STANDLONE ACCOUNT DERIVATION
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
            3. Send Algos to the New Account
          </div>
          <div className="tutorialSectionDescription">
            <p>
            Let’s send Algos to the new account by visiting the TestNet faucet.

Enter the Algorand Public Address in the textbox, complete the recaptcha, and click “Dispense”. If you receive a 200 status code, your account should now be funded with 100 Algos.
            </p>
          </div>
        </div>
        <div className="tutorialSection">
          <div className="tutorialSectionTitle">
            4. Check your Balance
          </div>
          <div className="tutorialSectionDescription">
            <p>
            You can check your balance with any block explorer connected to TestNet.
                        </p>
                        
                          <p>
You can also connect to a node through the JavaScript algod client. Make sure to first retrieve an IP address and access token through one of the methods described in the Workspace Setup. Also make sure to replace the placeholder values with your own token, server and port values.
            </p>
            
              <p>
Once you have an address and token. Instantiate a client and call the account_info method to check the account’s balance. If the balance is 0, repeat step 3.
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
          <div className="tutorialSectionDescription">
            <p>
            Your output should look like this:
            </p>
          </div>
          <div>
            <CodeMirror
              value={step4bCode}
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
            5. Optional - Import Account into Mobile Wallet
          </div>
          <div className="tutorialSectionDescription">
            <p>
              The mnemonic you just generated is compatible with Algorand’s mobile wallet. Tap the “Recover from passphrase” button to import this account into your mobile wallet. Your balance should now update.
            </p>
            <p>
              Note: Any account on TestNet exists in MainNet, and vice versa.
            </p>
            <p>
              However, the same account on each will have different assets and funds, etc. Currently, transacting with TestNet accounts using Algorand Mobile Wallet is not available.
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

    </Tutorial>
  );
}

TutorialJsCreateAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsCreateAccountPage: makeSelectTutorialJsCreateAccountPage(),
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

export default compose(withConnect)(TutorialJsCreateAccountPage);

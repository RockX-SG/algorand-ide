
/**
 *
 * TutorialJsCreateAccountPage
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
import {
  makeSelectTutorialJsCreateAccountPage
} from './selectors';

import {
  makeSelectTutorialPage
} from '../TutorialPage/selectors';

// import reducer from './reducer';
import reducer from '../TutorialPage/reducer';
// import saga from './saga';
import saga from '../TutorialPage/saga';
import messages from './messages';

import ReactTooltip from "react-tooltip";

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
  changeFaucetDestinationAddress,
  faucetSend,
} from '../TutorialPage/actions';

export function TutorialJsCreateAccountPage({
  onCodeExecuteJs,
  tutorialPage,
  onChangeFaucetDestinationAddress,
  onFaucetSend,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsCreateAccountPage', reducer });
  // useInjectSaga({ key: 'tutorialJsCreateAccountPage', saga });
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
  
let account = algosdk.generateAccount();
console.log("Account Address: ", account.addr);`

  var step2Code = `const algosdk = require('algosdk');
  
let account = algosdk.generateAccount();
console.log("Account Address: ", account.addr);
  
let mn = algosdk.secretKeyToMnemonic(account.sk);
console.log("Account Mnemonic: ", mn);`


var step4Code = `const algosdk = require('algosdk');

// sandbox
const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

(async () => {
    let account_info = (await algodclient.accountInformation("${tutorialPage.inputAddress}"));
    let acct_string = JSON.stringify(account_info);
    console.log("Account Info: " + acct_string);
})().catch(e => {
    console.log(e);
});`

var step4bCode = `$node accountInfo.js
Account Info: {"round":5037042,"address":"LKI7HF4EQV32BSNRAG2RGXITTFN6FUSBHHUKL26HU4X5HNYDVE5QONX6QE","amount":100000000,"pendingrewards":0,"amountwithoutpendingrewards":100000000,"rewards":0,"status":"Offline"}`

var step6Code = `const algosdk = require('algosdk');
// In order to do tutorials, we will need to generate 3 accounts
// once created copy off the values which we will past into the tutorial code
// once created sucessfully, you will need to add funds to all three
var acct = null;
acct = algosdk.generateAccount();

account1 = acct.addr;
console.log("Account 1 = " + account1);
var account1_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 1 = "+ account1_mnemonic);
var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount1.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");


acct = algosdk.generateAccount();

account2 = acct.addr;
console.log("Account 2 = " + account2);
var account2_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 2 = " +account2_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount2.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");

acct = algosdk.generateAccount();

account3 = acct.addr;
console.log("Account 3 = " + account3);
var account3_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 3 = " +account3_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount3.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");
console.log("");
console.log("Add funds to all of these accounts using the TestNet Dispenser at https://bank.testnet.algorand.network/ ");
console.log("");
console.log("Copy off these 3 lines of code and they will be pasted in the subsequent Tutorial code");
console.log("");
console.log("var account1_mnemonic = " + account1_mnemonic);
console.log("var account2_mnemonic = " + account2_mnemonic);
console.log("var account3_mnemonic = " + account3_mnemonic);

// sandbox
const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

(async () => {
    let account_info = (await algodclient.accountInformation(recoveredAccount1.addr));
    let acct_string = JSON.stringify(account_info);
    console.log("Account 1 Info: " + acct_string);
    account_info = (await algodclient.accountInformation(recoveredAccount2.addr));
    acct_string = JSON.stringify(account_info);
    console.log("Account 2 Info: " + acct_string);
    account_info = (await algodclient.accountInformation(recoveredAccount3.addr));
    acct_string = JSON.stringify(account_info);
    console.log("Account 3 Info: " + acct_string);
})().catch(e => {
    console.log(e);
});`

var step6bCode = `Account 1 = RNFJFZRDOKY3ZTDXDZY7JXZF6PXRJX3Z6OKJREJCATXKAHE27PEN6S3WSI
Account Mnemonic 1 = actor float tired slice holiday craft prefer shell enough fog girl assume edge employ piece address antenna kidney square chuckle example congress tell able ketchup
Is this a valid address: true
Account created.Save off Mnemonic and address

Account 2 = NONFSLZNME4AKQMEPV5FTOKZEQPF4UB6GN5ERFZ5UGWIZB3IUBZ6MET5AI
Account Mnemonic 2 = crumble foil love below clog way cluster first castle energy rich coin thing tribe skull sentence awful destroy main buyer cable warm welcome abstract excit
Is this a valid address: true
Account created.Save off Mnemonic and address

Account 3 = SYYUGUEKECUK7ORTRH3MM2TPSG6ZCTB4ORQGUN7DKNJ7R26B36NIVMZLIY
Account Mnemonic 3 = green inside final anchor antenna radio vintage rubber coil leaf anger insane round room moment industry basket entire lazy quiz enlist dad dilemma about program
Is this a valid address: true
Account created.Save off Mnemonic and address

Add funds to all of these accounts using the TestNet Dispenser at https://bank.testnet.algorand.network/

Copy off these 3 lines of code and they will be pasted in the subsequent Tutorial code
var account1_mnemonic = "actor float tired slice holiday craft prefer shell enough fog girl assume edge employ piece address antenna kidney square chuckle example congress tell able ketchup"
var account2_mnemonic = "crumble foil love below clog way cluster first castle energy rich coin thing tribe skull sentence awful destroy main buyer cable warm welcome abstract excite"
var account3_mnemonic = "green inside final anchor antenna radio vintage rubber coil leaf anger insane round room moment industry basket entire lazy quiz enlist dad dilemma about program"

Account 1 Info: { "round": 5983626, "address": "RNFJFZRDOKY3ZTDXDZY7JXZF6PXRJX3Z6OKJREJCATXKAHE27PEN6S3WSI", "amount": 100000000, "pendingrewards": 0, "amountwithoutpendingrewards": 100000000, "rewards": 0, "status": "Offline" }
Account 2 Info: { "round": 5983626, "address": "NONFSLZNME4AKQMEPV5FTOKZEQPF4UB6GN5ERFZ5UGWIZB3IUBZ6MET5AI", "amount": 100000000, "pendingrewards": 0, "amountwithoutpendingrewards": 100000000, "rewards": 0, "status": "Offline" }
Account 3 Info: { "round": 5983626, "address": "SYYUGUEKECUK7ORTRH3MM2TPSG6ZCTB4ORQGUN7DKNJ7R26B36NIVMZLIY", "amount": 100000000, "pendingrewards": 0, "amountwithoutpendingrewards": 100000000, "rewards": 0, "status": "Offline" }`


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
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["create-account", 1, step1Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.createAccount["step1"]} />
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
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["create-account", 2, step2Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.createAccount["step2"]} />
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
            <div>
              <Input
                id="address"
                type="text"
                placeholder="Please input destination address"
                value={tutorialPage.inputAddress}
                onChange={onChangeFaucetDestinationAddress}
              />
            </div>
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onFaucetSend(["create-account", 3])}>
                  Send Algo from faucet
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.createAccount["step3"]} />
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
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["create-account", 4, step4Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.createAccount["step4"]} />
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
            <div className="tutorialSectionTitle">
              6. Completed Code
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Here is the completed code to generate 3 accounts. If debugging this code, you can set a breakpoint on the async statement and fund the accounts before continuing.
              </p>
              <p>
                Note: If you see an amount of 0 from the account_information call, repeat step 3 to fund each account.
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
            <div className="tutorialSectionDescription">
              <p>
              Your output should look like this:
              </p>
            </div>
            <div>
              <CodeMirror
                value={step6bCode}
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
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["create-account", 6, step6Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.createAccount["step6"]} />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}

TutorialJsCreateAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsCreateAccountPage: makeSelectTutorialJsCreateAccountPage(),
  tutorialPage: makeSelectTutorialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeFaucetDestinationAddress: evt => dispatch(changeFaucetDestinationAddress(evt.target.value)),
    onCodeExecuteJs: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(jsCodeExecuteTutorial(evt));
    },
    onFaucetSend: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(faucetSend(evt));
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

export default compose(withConnect)(TutorialJsCreateAccountPage);

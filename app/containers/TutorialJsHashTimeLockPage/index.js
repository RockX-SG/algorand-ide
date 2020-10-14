/**
 *
 * TutorialJsHashTimeLockPage
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
import makeSelectTutorialJsHashTimeLockPage from './selectors';


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

export function TutorialJsHashTimeLockPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsHashTimeLockPage', reducer });
  // useInjectSaga({ key: 'tutorialJsHashTimeLockPage', saga });
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
		mode: 'markdown',
    lineWrapping: true
	};

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};
  
  var step1Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-server>";
const port = <your-algod-port>;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let fee = await algodclient.suggestedFee();
    // // Inputs
    let owner = "726KBOYUJJNE5J5UHCSGQGWIBZWKCBN4WYD7YVSTEXEVNFPWUIJ7TAEOPM";
    let receiver = "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE";
    let hashFn = "sha256";
    let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
    let expiryRound = params.lastRound + 10000;
    let maxFee = 2000;
    // Instaniate the template
    let htlc = new htlcTemplate.HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
    // Outputs
    let program = htlc.getProgram();
    console.log("htlc addr: " + htlc.getAddress());
})().catch(e => {
    console.log(e);
});`

  var step2Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-server>";
const port = //<your-algod-port>;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let fee = await algodclient.suggestedFee();
    // // Inputs
    let owner = "726KBOYUJJNE5J5UHCSGQGWIBZWKCBN4WYD7YVSTEXEVNFPWUIJ7TAEOPM";
    let receiver = "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE";
    let hashFn = "sha256";
    let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
    let expiryRound = params.lastRound + 10000;
    let maxFee = 2000;
    // Instaniate the template
    let htlc = new htlcTemplate.HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
    // Outputs
    let program = htlc.getProgram();
    console.log("htlc addr: " + htlc.getAddress());

    // Get the program and parameters and use them to create an lsig
    // For the contract account to be used in a transaction
    // In this example 'hero wisdom green split loop element vote belt' hashed with sha256 will produce our image hash
    // that was configured in step 1
    // This is the passcode for the HTLC   
    // python -c "import hashlib;print(hashlib.sha256('hero wisdom green split loop element vote belt').digest().encode('base64'))"  
    let args = ["hero wisdom green split loop element vote belt"];
    let lsig = algosdk.makeLogicSig(program, args);
})().catch(e => {
    console.log(e);
});`

  var step3Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-server>";
const port = //<your-algod-port>;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let fee = await algodclient.suggestedFee();
    // // Inputs
    let owner = "726KBOYUJJNE5J5UHCSGQGWIBZWKCBN4WYD7YVSTEXEVNFPWUIJ7TAEOPM";
    let receiver = "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE";
    let hashFn = "sha256";
    let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
    let expiryRound = params.lastRound + 10000;
    let maxFee = 2000;
    // Instaniate the template
    let htlc = new htlcTemplate.HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
    // Outputs
    let program = htlc.getProgram();
    console.log("htlc addr: " + htlc.getAddress());

    // Get the program and parameters and use them to create an lsig
    // For the contract account to be used in a transaction
    // In this example 'hero wisdom green split loop element vote belt' hashed with sha256 will produce our image hash
    // that was configured in step 1
    // This is the passcode for the HTLC   
    // python -c "import hashlib;print(hashlib.sha256('hero wisdom green split loop element vote belt').digest().encode('base64'))"  
    let args = ["hero wisdom green split loop element vote belt"];
    let lsig = algosdk.makeLogicSig(program, args);

   //create a transaction
    let txn = {
        "from": htlc.getAddress(),
        "to": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
        "fee": 1,
        "type": "pay",
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "closeRemainderTo": "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE"
    };
    // create logic signed transaction.
    let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);
})().catch(e => {
    console.log(e);
});    `

var step4Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-server>";
const port = //<your-algod-port>;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let fee = await algodclient.suggestedFee();
    // // Inputs
    let owner = "726KBOYUJJNE5J5UHCSGQGWIBZWKCBN4WYD7YVSTEXEVNFPWUIJ7TAEOPM";
    let receiver = "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE";
    let hashFn = "sha256";
    let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
    let expiryRound = params.lastRound + 10000;
    let maxFee = 2000;
    // Instaniate the template
    let htlc = new htlcTemplate.HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
    // Outputs
    let program = htlc.getProgram();
    console.log("htlc addr: " + htlc.getAddress());

    // Get the program and parameters and use them to create an lsig
    // For the contract account to be used in a transaction
    // In this example 'hero wisdom green split loop element vote belt' hashed with sha256 will produce our image hash
    // that was configured in step 1
    // This is the passcode for the HTLC   
    // python -c "import hashlib;print(hashlib.sha256('hero wisdom green split loop element vote belt').digest().encode('base64'))"  
    let args = ["hero wisdom green split loop element vote belt"];
    let lsig = algosdk.makeLogicSig(program, args);

   //create a transaction
    let txn = {
        "from": htlc.getAddress(),
        "to": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
        "fee": 1,
        "type": "pay",
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "closeRemainderTo": "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE"
    };
    // create logic signed transaction.
    let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

    //Submit the lsig signed transaction
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
    console.log("Transaction : " + tx.txId);
})().catch(e => {
    console.log(e);
});  `

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
              <a href="https://developer.algorand.org/tutorials/hash-time-lock-contract-template-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/hash-time-lock-contract-template-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Create Template
            </div>
            <div className="tutorialSectionDescription">
              <p>
                The HTLC template can be instantiated with a set of predefined parameters that configure the HTLC contract. These parameters should not be confused with Transaction parameters that are passed into the contract when using the HTLC. These parameters configure how the HTLC will function:
              </p>
              <p>
                TMPL_RCV: the address to send funds to when the preimage is supplied
              </p>
              <p>
                TMPL_HASHFN: the specific hash function (sha256 or keccak256) to use
              </p>
              <p>
                TMPL_HASHIMG: the image of the hash function for which knowing the preimage under TMPL_HASHFN will release the funds
              </p>
              <p>
                TMPL_TIMEOUT: the round after which funds may be closed out to TMPL_OWN
              </p>
              <p>
                TMPL_OWN: the address to refund funds to on timeout
              </p>
              <p>
                TMPL_FEE: maximum fee of any transactions approved by this contract
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
              2. Create the Logic Signature
            </div>
            <div className="tutorialSectionDescription">
              <p>
              
  Before the account can be used, it must be funded. The HTLC address represents the account’s address which we will fund using the dispenser for the purpose of this tutorial.

  To use the HTLC contract in a transaction, a Logic Signature must be created. This will be used later to sign the transaction. The Logic Signature is a replacement for signing the transaction with a spending key. If you do not want to pass in parameters yet you can still create an lsig without the args. Later you can create a new lsig with the program and a set of args to be used to sign a transaction. In this example, we are passing the one transaction parameter (password) as we create the Logic Signature. Logic Signatures are further documented on the developer site.
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
              3. Create and Sign the Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
              A transaction can now be created that requests the funds from the HTLC Contract account. The amount should be set to 0 as the contract will close out all funds at once. The from address should be set to the contract’s address. After the transaction is created, it can be signed with the Logic Signature as shown in the highlighted code below. Note that the to field is set to the Zero address as the contract automatically closes out to the receiver that was configured in the template creation. If this field is not set to the zero address the transaction will fail.
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
              4. Send the Transaction to the Network
            </div>
            <div className="tutorialSectionDescription">
              <p>
                The final step is to send the transaction to the network. If the contract is funded, the transaction should succeed.
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
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}


TutorialJsHashTimeLockPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsHashTimeLockPage: makeSelectTutorialJsHashTimeLockPage(),
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

export default compose(withConnect)(TutorialJsHashTimeLockPage);

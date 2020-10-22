/**
 *
 * TutorialJsWriteTransactionNotePage
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
import makeSelectTutorialJsWriteTransactionNotePage from './selectors';


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

export function TutorialJsWriteTransactionNotePage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsWriteTransactionNotePage', reducer });
  // useInjectSaga({ key: 'tutorialJsWriteTransactionNotePage', saga });
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
  
  var step1Code = `const algosdk = require('algosdk');
  
  let account = algosdk.generateAccount();
console.log("Account Address: ", account.addr);`

  var step2Code = `const algosdk = require('algosdk');

//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const token = "<your-api-token>";
const server = "<http://your-sever>";
const port = 8080;

//Recover the account
var mnemonic = "<your-mnemonic-string>";
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(recoveredAccount.addr);
//check to see if account is valid
var isValid = algosdk.isValidAddress(recoveredAccount.addr);
console.log("Is this a valid address: " + isValid);


//instantiate the algod wrapper
let algodClient = new algosdk.Algod(token, server, port);
//submit the transaction
(async() => {
    //Get the relevant params from the algod
    let params = await algodClient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let feet = await algodClient.suggestedFee();

    //example of how to write an object into the notefield
    let json = '{"firstName":"John", "LastName":"Doe"}';
    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": params.fee,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(json)
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
})().catch(e => {
    console.log(e);
});    `

  var step3Code = `const algosdk = require('algosdk');

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
//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const token = "<your-api-token>";
const server = "<http://your-sever>";
const port = 8080;

//Recover the account
var mnemonic = "<your-mnemonic-string>";
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(recoveredAccount.addr);
//check to see if account is valid
var isValid = algosdk.isValidAddress(recoveredAccount.addr);
console.log("Is this a valid address: " + isValid);


//instantiate the algod wrapper
let algodClient = new algosdk.Algod(token, server, port);
//submit the transaction
(async() => {
    //Get the relevant params from the algod
    let params = await algodClient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let feet = await algodClient.suggestedFee();

    //example of how to write an object into the notefield
    let json = '{"firstName":"John", "LastName":"Doe"}';
    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": params.fee,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(json)
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodClient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

    await waitForConfirmation( algodClient, tx.txId );
})().catch(e => {
    console.log(e);
});`

var step4Code = `const algosdk = require('algosdk');

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
//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const token = "<your-api-token>";
const server = "<http://your-sever>";
const port = 8080;

//Recover the account
var mnemonic = "<your-mnemonic-string>"
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(recoveredAccount.addr);
//check to see if account is valid
var isValid = algosdk.isValidAddress(recoveredAccount.addr);
console.log("Is this a valid address: " + isValid);


//instantiate the algod wrapper
let algodClient = new algosdk.Algod(token, server, port);
//submit the transaction
(async() => {
    //Get the relevant params from the algod
    let params = await algodClient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let feet = await algodClient.suggestedFee();

    //example of how to write an object into the notefield
    let json = '{"firstName":"John", "LastName":"Doe"}';
    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": params.fee,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(json)
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodClient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

    await waitForConfirmation( algodClient, tx.txId );

    tx = (await algodClient.transactionInformation(recoveredAccount.addr, tx.txId));
    let decodeJson = algosdk.decodeObj(tx.note);
    console.log( decodeJson );
    const obj = JSON.parse(decodeJson);
    console.log(obj.firstName);
})().catch(e => {
    console.log(e);
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
              <a href="https://developer.algorand.org/tutorials/read-and-write-transaction-note-field-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/read-and-write-transaction-note-field-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Create an Account and Add Funds
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
              2. Create a Person Object and Copy into Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                In this tutorial, we are just using a json string to represent a person object. This can be done using a simple string. This can then be encoded into the transaction by using the encodeObj method. Before doing that we must connect to the server and recover the account we created and funded in the previous step. In the code below, specify your token, server and port. Additionally set the mnemonic to the string you recovered in step 1.
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
              3. Send Transaction with Person Object to Blockchain
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The signed transaction can now be sent to the network. Before doing that we need to add a utility function to the code that will verify the transaction has been written to the blockchain. At the end of the code, we can add a function to send the transaction and also wait for the transaction to be confirmed.
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
              4. Read Transaction from Blockchain and Recover Person Object
            </div>
            <div className="tutorialSectionDescription">
              <p>
              Now that the transaction is confirmed, we can modify the code to read the transaction back from the blockchain and recover the person string from the note field using the decodeObj method.
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

TutorialJsWriteTransactionNotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsWriteTransactionNotePage: makeSelectTutorialJsWriteTransactionNotePage(),
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

export default compose(withConnect)(TutorialJsWriteTransactionNotePage);
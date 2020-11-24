
/**
 *
 * TutorialJsLimitOrderPage
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
import makeSelectTutorialJsLimitOrderPage from './selectors';


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

export function TutorialJsLimitOrderPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsLimitOrderPage', reducer });
  // useInjectSaga({ key: 'tutorialJsLimitOrderPage', saga });
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
  
  var step1Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const limitTemplate = require("algosdk/src/logicTemplates/limitorder");

// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory

const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Recover accounts used in example
    // Account 1 is the asset owner 
    // Used later in the example
    var account1_mnemonic = "portion never forward pill lunch organ biology" +
        " weird catch curve isolate plug innocent skin grunt" +
        " bounce clown mercy hole eagle soul chunk type absorb trim";

    var assetOwner = algosdk.mnemonicToSecretKey(account1_mnemonic);
    console.log(assetOwner.addr);

    // Owner is the owner of the contract    
    let owner = "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU"; 
})().catch(e => {
    console.log(e);
});`

  var step2Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const limitTemplate = require("algosdk/src/logicTemplates/limitorder");

// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory

const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Recover accounts used in example
    // Account 1 is the asset owner 
    // Used later in the example
    var account1_mnemonic = "portion never forward pill lunch organ biology" +
        " weird catch curve isolate plug innocent skin grunt" +
        " bounce clown mercy hole eagle soul chunk type absorb trim";

    var assetOwner = algosdk.mnemonicToSecretKey(account1_mnemonic);
    console.log(assetOwner.addr);

    // Owner is the owner of the contract    
    let owner = "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU";    
    // Inputs
    // Limit contract should be two receivers in an
    // ratn/ratd ratio of assetid to microalgos
    // ratn is the number of assets
    // ratd is the number of microAlgos
    let ratn = parseInt(1);
    let ratd = parseInt(3000);
    // assetID is the asset id number
    // of the asset to be traded
    // This must be created by asset owner
    let assetID = 316084;
    // At what round the contract expires
    // The ower can retreive leftover funds after this round
    let expiryRound = 5000000;
    // The minimum number of microAlgos that may be spent
    // out of this contract as part of a trade
    let minTrade = 2999;
    // protect the account so its not drained
    // with an excessive fee
    let maxFee = 2000;
    // Instaniate the template
    let limit = new limitTemplate.LimitOrder(owner, assetID, ratn,ratd, expiryRound, minTrade, maxFee);

    // Outputs
    // At this point you can write the program to file to be used
    // by someone who wants to sumbit a transaction against it
    let program = limit.getProgram();
    console.log("limit order addr: " + limit.getAddress());

})().catch(e => {
    console.log(e);
});`

  var step3Code = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const limitTemplate = require("algosdk/src/logicTemplates/limitorder");

// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory

const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Recover accounts used in example
    // Account 1 is the asset owner 
    // Used later in the example
    var account1_mnemonic = "portion never forward pill lunch organ biology" +
        " weird catch curve isolate plug innocent skin grunt" +
        " bounce clown mercy hole eagle soul chunk type absorb trim";

    var assetOwner = algosdk.mnemonicToSecretKey(account1_mnemonic);
    console.log(assetOwner.addr);

    // Owner is the owner of the contract    
    let owner = "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU"; 
    // Inputs
    // Limit contract should be two receivers in an
    // ratn/ratd ratio of assetid to microalgos
    // ratn is the number of assets
    // ratd is the number of microAlgos
    let ratn = parseInt(1);
    let ratd = parseInt(3000);
    // assetID is the asset id number
    // of the asset to be traded
    // This must be created by asset owner
    let assetID = 316084;
    // At what round the contract expires
    // The ower can retreive leftover funds after this round
    let expiryRound = 5000000;
    // The minimum number of microAlgos that may be spent
    // out of this contract as part of a trade
    let minTrade = 2999;
    // protect the account so its not drained
    // with an excessive fee
    let maxFee = 2000;
    // Instaniate the template
    let limit = new limitTemplate.LimitOrder(owner, assetID, ratn,ratd, expiryRound, minTrade, maxFee);

    // Outputs
    // At this point you can write the program to file to be used
    // by someone who wants to sumbit a transaction against it
    let program = limit.getProgram();
    console.log("limit order addr: " + limit.getAddress());

    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    // create an atomic transfer based on the two recipients
    // which can be submitted in one operation 
    // The program can be read from a file if this is done 
    // in a separate application

    // The assetAmount and microAlgoAmounts are what is wanting to be 
    // be traded.
    let assetAmount = parseInt(1);
    let microAlgoAmount = parseInt(3000);
    // The secrete key is the spending key of the asset owner not the microAlgo owner
    let secretKey = assetOwner.sk;

    let txnBytes = limitTemplate.getSwapAssetsTransaction(program, assetAmount, 
        microAlgoAmount, secretKey, params.fee, params.lastRound, endRound, params.genesishashb64);
    // Submit the transaction
    let tx = (await algodclient.sendRawTransaction(txnBytes));
    console.log( "txId: " + tx.txId );

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
              <a href="https://developer.algorand.org/tutorials/limitorder-contract-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/limitorder-contract-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Get Asset Owner and the Contract Owner Accounts
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The Limit Order template can be instantiated with a set of predefined parameters that configure the Limit Order contract. These parameters should not be confused with Transaction parameters that are passed into the contract when using the Limit Order. These parameters configure how the Limit Order will function:
                          </p>
                          
                            <p>
                            <ul>
                            <li>
  <span className="highlight">TMPL_ASSET</span>: Integer ID of the asset
  </li>
  <li>
  <span className="highlight">TMPL_SWAPN</span>: Numerator of the exchange rate (TMPL_SWAPN assets per TMPL_SWAPD microAlgos, or better)
  </li>
  <li>
  <span className="highlight">TMPL_SWAPD</span>: Denominator of the exchange rate (TMPL_SWAPN assets per TMPL_SWAPD microAlgos, or better)
  </li>
  <li>
  <span className="highlight">TMPL_TIMEOUT</span>: The round after which all of the algos in this contract may be closed back to TMPL_OWN
  </li>
  <li>
  <span className="highlight">TMPL_OWN</span>: The recipient of the asset (if the order is filled), or of the contract’s algo balance (after TMPL_TIMEOUT)
  </li>
  <li>
  <span className="highlight">TMPL_FEE</span>: The maximum fee used in any transaction spending out of this contract
  </li>
  <li>
  <span className="highlight">TMPL_MINTRD</span>: The minimum number of microAlgos that may be spent out of this contract as part of a trade
  </li>
  </ul>
              </p>
              
                <p>
  So for example, If you want to specify that the contact will approve a transaction where it is willing to spend 3000 microAlgos for 1 Asset with id of <span className="highlight">TMPL_ASSET</span>, you would set the <span className="highlight">TMPL_SWAPN</span> parameter to 1 and the <span className="highlight">TMPL_SWAPD</span> to 3000. The <span className="highlight">TMPL_MINTRD</span> should be set to 2999 in this example as it must be less than the amount of microAlgos for the one asset.
              </p>
              
                <p>
  For this tutorial, we first need to define, the owner of the contract, and the owner of the asset with asset id = <span className="highlight">TMPL_ASSET</span>.
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
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["limit-order-contract", 1, step3Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.limitOrderContract["step1"]} />
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              2. Create Limit Order Template
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The template can now be created with the correct ratio for assets to microAlgos.
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
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["limit-order-contract", 2, step3Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.limitOrderContract["step2"]} />
            <div className="tutorialSectionDescription">
              <p>
                At this point, the Limit Order contract account must be funded before any transactions can be issued against it. Use the dispenser to do this now. Also, note that program bytes can be saved to use at a later time or in another application at this point.
              </p>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              3. Create and Submit Transaction against Contract
            </div>
            <div className="tutorialSectionDescription">
              <p>
                The Limit Order contract template offers a helper method to create the proper transactions against the contract called <span className="highlight">getSwapAssetsTransaction</span>. This function takes an <span className="highlight">assetAmount</span> and a <span className="highlight">microAlgoAmount</span> for the total transaction and creates two transactions, one for each receiver and then groups these two transactions into an atomic transfer. The first transaction is signed with the program logic and the second transaction is signed with the secret key of the asset owner. The bytes of the grouped transactions to submit are returned. These bytes can then be submitted to the blockchain.
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
            <div>
              <div>
                <button data-tip="Execute code" data-for="js" onClick={() => onCodeExecuteJs(["limit-order-contract", 3, step3Code])}>
                  Run Script
                </button>
              </div>
            </div>
            <BashConsole bashResponse={tutorialPage.limitOrderContract["step3"]} />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </Tutorial>
  );
}

TutorialJsLimitOrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsLimitOrderPage: makeSelectTutorialJsLimitOrderPage(),
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

export default compose(withConnect)(TutorialJsLimitOrderPage);

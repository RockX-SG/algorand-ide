/**
 *
 * TutorialPage
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
import {makeSelectTutorialPage} from './selectors';
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

import {
  selectPage
} from '../WalletPage/actions';

export function TutorialPage({
  onSelectPage,
}) {
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


  return (
    <Tutorial>
      <div className="pageName">
        Tutorials
      </div>
      <div>
        <div>
          <Link to="/tutorial/create-account">
            <div className="tutorialEntry">
                Create an Account on TestNet using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/create-asset">
            <div className="tutorialEntry">
                Create an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/limit-order-contract">
            <div className="tutorialEntry">
                LimitOrder Contract with JavaScript
            </div>
          </Link>
          <Link to="/tutorial/transfer-asset">
            <div className="tutorialEntry">
                Transfer an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/hash-time-lock">
            <div className="tutorialEntry">
                Hash Time Lock Contract Template With JavaScript
            </div>
          </Link>
          <Link to="/tutorial/destroy-asset">
            <div className="tutorialEntry">
                Destroy an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/revoke-asset">
            <div className="tutorialEntry">
                Revoke an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/opt-in-asset">
            <div className="tutorialEntry">
                Opt-In to an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/freeze-asset">
            <div className="tutorialEntry">
                Freeze an Asset using JavaScript
            </div>
          </Link>
          <Link to="/tutorial/write-transaction-note">
            <div className="tutorialEntry">
                Read and Write to the Transaction Note Field with JavaScript
            </div>
          </Link>
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

export default compose(withConnect)(TutorialPage);

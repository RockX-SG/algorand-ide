/**
 *
 * TutorialJsTransferAssetPage
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
import makeSelectTutorialJsTransferAssetPage from './selectors';
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

export function TutorialJsTransferAssetPage() {
  useInjectReducer({ key: 'tutorialJsTransferAssetPage', reducer });
  useInjectSaga({ key: 'tutorialJsTransferAssetPage', saga });

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
  
  var step1Code = `​// replace with your  assetid
   ​let assetID = (your AssetID);  
   ​sender = recoveredAccount1.addr;
   ​recipient = recoveredAccount3.addr;
   ​revocationTarget = undefined;
   ​closeRemainderTo = undefined;
   ​note = undefined;    
   ​//Amount of the asset to transfer
   ​amount = 10;`

  var step2Code = `​let xtxn = algosdk.makeAssetTransferTxn(sender, recipient, closeRemainderTo, revocationTarget,
       ​cp.fee, amount, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);`

  var step3Code = `​rawSignedTxn = xtxn.signTxn(recoveredAccount1.sk)`

var step4Code = `​let xtx = (await algodclient.sendRawTransaction(rawSignedTxn));
       ​console.log("Asset Transfer Transaction id : " + xtx.txId);`

var step5Code = `​await waitForConfirmation(algodclient, xtx.txId);
   ​act = await algodclient.accountInformation(recoveredAccount3.addr);
   ​console.log("Account Information for Account 3: " + JSON.stringify(act.assets));`

var step6Code = `Asset Transfer Transaction id : RG2GNMT7ZF3Y4OFWE6ZLARRDBHPAGW2AKUUCUTYLJCN24V4GYIZA
Transaction RG2GNMT7ZF3Y4OFWE6ZLARRDBHPAGW2AKUUCUTYLJCN24V4GYIZA confirmed in round 6007998
Account Information for: {"creator":"THQHGD4HEESOPSJJYYF34MWKOI57HXBX4XR63EPBKCWPOJG5KUPDJ7QJCM","amount":10,"frozen":false}`

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
            <a href="https://developer.algorand.org/tutorials/transfer-asset-javascript/" target="_blank">
              https://developer.algorand.org/tutorials/transfer-asset-javascript/
            </a>
          </div>
        </div>
        <div className="tutorialSection">
          <div className="tutorialSectionTitle">
            1. Define Transfer Parameters
          </div>
          <div className="tutorialSectionDescription">
            <p>
            This code has Account 1 sending 10 assets to Account 3. Set assetID, Asset Amount, sender and recipient. We set revocationTarget to undefined as this is not a revocation operation. closeReaminderTo is set to undefined as we are not closing out an asset.
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
            2. Create Asset Transfer Transaction
          </div>
          <div className="tutorialSectionDescription">
            <p>
            Using the same method that was used in the previous Asset Opt-In Tutorial makeAssetTransferTxn
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
            3. Sign Transfer Transaction
          </div>
          <div className="tutorialSectionDescription">
            <p>
            The transaction must be signed by the sender account.
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
            4. Send Transfer Transaction
          </div>
          <div className="tutorialSectionDescription">
            <p>
            Submit the transaction and list the account amount for acct3.
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
            You should see that Account 3 now has 10 of the new asset.
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
          <button>
            Complete Example
          </button>
        </div>
      </div>
      <div className="clear"></div>

    </Tutorial>
  );
}

TutorialJsTransferAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsTransferAssetPage: makeSelectTutorialJsTransferAssetPage(),
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

export default compose(withConnect)(TutorialJsTransferAssetPage);


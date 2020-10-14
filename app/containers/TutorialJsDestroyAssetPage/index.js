/**
 *
 * TutorialJsDestroyAssetPage
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
import makeSelectTutorialJsDestroyAssetPage from './selectors';


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

export function TutorialJsDestroyAssetPage({
  onCodeExecuteJs,
  tutorialPage,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'tutorialJsDestroyAssetPage', reducer });
  // useInjectSaga({ key: 'tutorialJsDestroyAssetPage', saga });
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
  
  var step1Code = `// paste in the asset id from the create asset tutorial
    let assetID = (your assetID);
    addr = recoveredAccount1.addr;
    note = undefined;`

  var step2Code = `let dtxn = algosdk.makeAssetDestroyTxn(addr, cp.fee, cp.firstRound, cp.lastRound, note, cp.genHash, cp.genID, assetID);`

  var step3Code = `rawSignedTxn = dtxn.signTxn(recoveredAccount2.sk)`

var step4Code = `let dtx = (await algodclient.sendRawTransaction(rawSignedTxn));
    console.log("Asset Destroy Transaction id: " + dtx.txId);`

var step5Code = `console.log("Asset ID: " + assetID);
    act = await algodclient.accountInformation(recoveredAccount3.addr);
    console.log("Account Information for Account 3: " + JSON.stringify(act.assets));`

var step6Code = `Asset Destroy Transaction : 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ
Transaction 2M72QUASX3MLKSSPLAXOE2KZC6BQWBDEOGP4FANLNUDCPT3U4EQQ confirmed in round 6026503
Asset ID: 327472
Account Information for Account 3: {"creator":"","amount":0,"frozen":true}
Account Information for Account 1: undefined`



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
              <a href="https://developer.algorand.org/tutorials/destroy-asset-javascript/" target="_blank">
                https://developer.algorand.org/tutorials/destroy-asset-javascript/
              </a>
            </div>
          </div>
          <div className="tutorialSection">
            <div className="tutorialSectionTitle">
              1. Define the Destroy Asset Parameters
            </div>
            <div className="tutorialSectionDescription">
              <p>
              The only parameter that needs to be defined when conducting an asset destroy operation is the sender address, which needs to be the manager address of the asset. See Change Asset Manager Tutorial.

              </p>
              <p>
              
                All of the created assets should now be back in the creators Account so we can delete the asset. If this is not the case the asset deletion will fail. The address for the from field must be the manager account, which is currently the creator of Account 1 (addr).
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
              2. Create Destroy Asset Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                With all assets back in the creator’s account, the manager (Account 1) destroys the asset.
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
              3. Sign Destroy Asset Transaction
            </div>
            <div className="tutorialSectionDescription">
              <p>
                The transaction must be signed by the manager which is currently set to Account 1.
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
              4. Send Destroy Asset Transaction
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
              5. Print Account Information
            </div>
            <div className="tutorialSectionDescription">
              <p>
                Account 3 and Account 1 should no longer contain the asset as it has been destroyed.
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
                Check the transaction in the block explorer.
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
            <div>
              <p>
                Notice that although the asset was destroyed, the asset id and associated metadata still exists in the account balance record. When you destroy an asset, the global parameters associated with that asset (manager addresses, name, etc.) are deleted from the creator’s balance record. However, holdings are not deleted automatically – users still need to close out of the deleted asset. This is necessary for technical reasons because we can’t have a single transaction touch potentially thousands of accounts (all the holdings that would need to be deleted).
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


TutorialJsDestroyAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tutorialJsDestroyAssetPage: makeSelectTutorialJsDestroyAssetPage(),
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

export default compose(withConnect)(TutorialJsDestroyAssetPage);

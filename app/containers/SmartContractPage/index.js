/**
 *
 * SmartContractPage
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

import {
  makeSelectSmartContractPage,
  makeSelectCodeValue,
  makeSelectCodeCompileResponse
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import reducerWallet from '../WalletPage/reducer';
import sagaWallet from '../WalletPage/saga';
import messages from './messages';

import Select from 'react-select'

import {
  updateCodeValue,
  changeContract,
  codeDeploy,
  codeCompile,
} from './actions';

import {
  faucetContractSend,
} from '../WalletPage/actions';

import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require("codemirror/theme/dracula.css");

import SmartContract from './SmartContract';

export function SmartContractPage({
  codeValue,
  codeCompileResponse,
  onUpdateCodeValue,
  onChangeContract,
  onCodeDeploy,
  onCodeCompile,
  onFundContract,
  smartContractPage
}) {
  useInjectReducer({ key: 'smartContractPage', reducer });
  useInjectSaga({ key: 'smartContractPage', saga });
  useInjectReducer({ key: 'walletPage', reducer: reducerWallet });
  useInjectSaga({ key: 'walletPage', saga: sagaWallet });

  const options = [
    { value: 'contract1', label: 'Contract 1' },
    { value: 'contract2', label: 'Contract 2' },
    { value: 'contract3', label: 'Contract 3' },
    { value: 'contract4', label: 'Contract 4' },
  ]

  var optionsCode = {
		lineNumbers: true,
		readOnly: false,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "dracula",
		mode: 'markdown'
	};

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};

  return (
    <SmartContract>
      <div className="pageLeft">
        <div>
          Smart Contract
        </div>
        <div>
          Select contract template
        </div>
        <div>
          <Select
            options={options}
            onChange={onChangeContract}
          />
        </div>
        <div onClick={() => {if(window.confirm('Selecting new contract removes any prior code changes. Do you want to create a new contract?')){onChangeContract("")}}}>
          <button>
            New contract
          </button>
        </div>

        <div>
          Contract account / Delegated signature
        </div>
        <div>
          goal clerk compile simple.teal
        </div>
        <div>
          goal clerk compile simple.teal -o mydelegatedsig.lsig -s -a C3MKH24QL3GHSD5CDQ47ZNQZMNZRX4MUTV6LVPAXMWAXMIISYSOWPGH674 -d ~/node/data
        </div>
      </div>
      <div className="pageRight">
        <div>
          Allow user to compile ASC to get account address & byte code. Then fund address with funds from faucet. followed by running it to send funds out based on smart contract logic.
          
          UI needs:
          - TEAL code
          - address
          - byte code
          - get funds from faucet
          - run Teal code
          - get tx hash
        </div>
        <form>
          <div>

            <CodeMirror
              value={codeValue}
              options={optionsCode}
              autoFocus={true}
              onBeforeChange={(editor, data, value) => {
                console.log('set value here', {value});
                onUpdateCodeValue(value)
              }}
              onChange={(editor, value) => {
                console.log('controlled', {value});
              }}
            />
          </div>
          <div>
            <button onClick={onCodeCompile}>
              compile
            </button>
            <button onClick={onFundContract}>
              Fund Smart Contract from faucet
            </button>
            <button onClick={onCodeDeploy}>
              deploy
            </button>
          </div>
        </form>
        
        <div>
          <a href={"https://testnet.algoexplorer.io/address/" + codeCompileResponse} target="_blank">
            {codeCompileResponse}
          </a>
        </div>
        <div>
          {smartContractPage.codeCompileStatus}
        </div>
        
        <div>
          Algorand smart contract are off-chain and unlike ethereum where it exist before u can interact
          <CodeMirror
            value="byte code"
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

          <CodeMirror
            value="Code response from deploy"
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
      <div className="clear"></div>
      <div>
        <div>
          - api that receives codeValue
        </div>
        <div>
          - formats codeValue into a file epoch_hash_filename.teal
        </div>
        <div>
          - compiles epoch_hash_filename.teal with goal clerk compile
        </div>
        <div>
          - send transaction to network
        </div>
        <div>
          - return response from api
        </div>
      </div>
    </SmartContract>
  );
}

SmartContractPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  codeValue: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  smartContractPage: makeSelectSmartContractPage(),
  codeValue: makeSelectCodeValue(),
  codeCompileResponse: makeSelectCodeCompileResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateCodeValue: evt => dispatch(updateCodeValue(evt)),
    onChangeContract: evt => dispatch(changeContract(evt.value)),
    onCodeDeploy: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(codeDeploy(evt));
    },
    onCodeCompile: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(codeCompile(evt));
    },
    onFundContract: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(faucetContractSend(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SmartContractPage);

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
  makeSelectCodeValue
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Select from 'react-select'

import {
  updateCodeValue,
  changeContract,
  codeDeploy
} from './actions';

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
  onUpdateCodeValue,
  onChangeContract,
  onCodeDeploy
}) {
  useInjectReducer({ key: 'smartContractPage', reducer });
  useInjectSaga({ key: 'smartContractPage', saga });

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
        <form onSubmit={onCodeDeploy}>
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
            <button>
              deploy
            </button>
          </div>
        </form>

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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SmartContractPage);

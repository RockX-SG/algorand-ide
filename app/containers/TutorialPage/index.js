/**
 *
 * TutorialPage
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
import makeSelectTutorialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Select from 'react-select'

import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require("codemirror/theme/dracula.css");

import Tutorial from './Tutorial';

export function TutorialPage() {
  useInjectReducer({ key: 'tutorialPage', reducer });
  useInjectSaga({ key: 'tutorialPage', saga });

  const options = [
    { value: 'contract1', label: 'Create an Account on TestNet using JavaScript' },
    { value: 'contract2', label: 'Create an Asset using JavaScript' },
    { value: 'contract3', label: 'LimitOrder Contract with JavaScript' },
    { value: 'contract4', label: 'Transfer an Asset using JavaScript' },
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
    <Tutorial>
      <FormattedMessage {...messages.header} />
      <div className="pageLeft">
        <Select
          defaultValue={options[1]}
          options={options}
        />
      </div>

      <div className="pageRight">
        <div>
          1. Define Transfer Parameters
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
          2. Create Asset Transfer Transaction
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
          3. Sign Transfer Transaction
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
          4. Send Transfer Transaction
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
          5. Print Account Information
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
          6. Check the transaction on a block explorer
        </div>
        <div>
          <CodeMirror
            value="sample tutorial code"
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TutorialPage);

/**
 *
 * ExplorerPage
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
import makeSelectExplorerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import ReactTooltip from "react-tooltip";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import {
  updateCodeValue,
  addNewFile,
  toggleFolder,
  changeContract
} from './actions';

import FileExplorer from '../../components/FileExplorer';

import Terminal from 'terminal-in-react';
import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require("codemirror/theme/dracula.css");

import ExplorerStyle from './ExplorerStyle';


export function ExplorerPage({
  onUpdateCodeValue,
  explorerPage,
  onAddNewFile,
  onToggleFolder,
  onChangeContract
}) {
  useInjectReducer({ key: 'explorerPage', reducer });
  useInjectSaga({ key: 'explorerPage', saga });
  
  var optionsCode = {
		lineNumbers: true,
		readOnly: false,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "dracula",
		mode: 'markdown',
    lineWrapping: true
	};
    
  return (
    <ExplorerStyle>
      <div className="pageName">
        Explorer & Smart Contract IDE
      </div>
      <ReactTooltip id="bash" place="bottom" type="light" effect="float"/>
      
      <Tabs>
        <TabList>
          <Tab>TEAL</Tab>
          <Tab>Javascript</Tab>
        </TabList>

        <TabPanel>
        <div className="ideContent">
          <div className="pageLeft">
            <FileExplorer filePreset={explorerPage.explorerFilePreset} onAddNewFile={onAddNewFile} onToggleFolder={onToggleFolder} explorerPage={explorerPage} onChangeContract={onChangeContract} />
          </div>
          <div className="pageRight">
            <div className="ide">
              <CodeMirror
                value={explorerPage.codeValue}
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
            <div className="actionPanel">
              <div className="actionPanelButton">
                <button data-tip="Compiling outputs a deterministic address" data-for="bash">
                  Compile
                </button>
              </div>
              <div className="actionPanelButton">
                <button data-tip="Funds address from faucet" data-for="bash">
                  Fund Contract Address
                </button>
              </div>
              <div className="actionPanelButton">
                <button data-tip="Execute contract on-chain. Transaction can be viewed on block explorer" data-for="bash">
                  Execute Transaction
                </button>
              </div>
              <div className="clear"></div>
            </div>
            <div className="bashConsole">
              <div className="bashConsoleLine">
                this is an example code response this is an example code response this is an example code response this is an example code response this is an example code response
              </div>
              <div className="bashConsoleLine">
                this is an example code response
              </div>
            </div>
            <div className="hide">
              <Terminal
                  color='green'
                  backgroundColor='black'
                  barColor='black'
                  style={{ fontWeight: "bold", fontSize: "1em" }}
                  commands={{
                    'open-google': () => window.open('https://www.google.com/', '_blank'),
                    showmsg: "hello world",
                    popup: () => alert('Terminal in React')
                  }}
                  descriptions={{
                    'open-google': 'opens google.com',
                    showmsg: 'shows a message',
                    alert: 'alert', popup: 'alert'
                  }}
                  msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
                />
            </div>
          </div>
          <div className="clear"></div>
        </div>
        </TabPanel>
        <TabPanel>
          Js
        </TabPanel>
      </Tabs>
    </ExplorerStyle>
  );
}

ExplorerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  explorerPage: makeSelectExplorerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateCodeValue: evt => dispatch(updateCodeValue(evt)),
    onAddNewFile: evt => dispatch(addNewFile()),
    onToggleFolder: evt => dispatch(toggleFolder(evt)),
    onChangeContract: evt => dispatch(changeContract(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExplorerPage);

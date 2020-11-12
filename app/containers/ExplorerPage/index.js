/**
 *
 * ExplorerPage
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

import {
  makeSelectExplorerPage
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import ReactTooltip from "react-tooltip";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import Popup from "reactjs-popup";

import {
  updateCodeValue,
  addNewFile,
  toggleFolder,
  changeFile,
  tealCodeDeploy,
  codeCompile,
  changeNewFileName,
  deleteFile,
  editFileContent,
  jsCodeExecute,
} from './actions';

import {
  loading,
  faucetContractSend,
  selectPage
} from '../WalletPage/actions';

import {
  makeSelectWalletPage,
} from '../WalletPage/selectors';

import FileExplorer from '../../components/FileExplorer';
import BashConsole from '../../components/BashConsole';

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
  walletPage,
  onAddNewFile,
  onToggleFolder,
  onChangeFile,
  onCodeCompile,
  onFundContract,
  onCodeDeploy,
  onChangeNewFileName,
  onDeleteFile,
  onEditFileContent,
  onCodeExecuteJs,
  onSelectPage,
}) {
  useInjectReducer({ key: 'explorerPage', reducer });
  useInjectSaga({ key: 'explorerPage', saga });

  useEffect(() => {
    onSelectPage("explorer");
  });
  
  var optionsCode = {
		lineNumbers: true,
		readOnly: false,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "dracula",
		mode: 'javascript',
		// mode: 'markdown',
    lineWrapping: true
	};
    
  return (
    <ExplorerStyle>
      <div className="pageName">
        Explorer & Smart Contract IDE
      </div>
      
      <Tabs>
        <TabList>
          <Tab>TEAL</Tab>
          <Tab>Javascript</Tab>
        </TabList>
        
        <TabPanel>
          <ReactTooltip id="teal" place="bottom" type="light" effect="float"/>
          <div className="ideContent">
            <div className="pageLeft">
              <FileExplorer filePreset={explorerPage.teal.explorerFilePreset} onAddNewFile={onAddNewFile} onToggleFolder={onToggleFolder} explorerPage={explorerPage.teal} onChangeFile={onChangeFile} onChangeNewFileName={onChangeNewFileName} onDeleteFile={onDeleteFile} newFileName={explorerPage.newFileName} mode="teal" />
            </div>
            <div className="pageRight">
              <div className={(explorerPage.teal.codeCompileStatus == "true") ? "contractAddress" : "contractAddress xxx"}>
                <div className="contractAddressTitle">
                  Contract Address:
                </div>
                <div className="contractAddressContent">
                  <a href={walletPage.explorer+"/address/" + explorerPage.teal.codeCompileAddress} target="_blank">
                    {explorerPage.teal.codeCompileAddress}
                  </a>
                </div>
                <div className="clear"></div>
              </div>
              <div className="ide">
                <CodeMirror
                  value={explorerPage.teal.codeValue}
                  options={optionsCode}
                  autoFocus={true}
                  onBeforeChange={(editor, data, value) => {
                    console.log('set value here', {value});
                    if(explorerPage.teal.selectedFolderId !== 999){
                      onUpdateCodeValue(["teal", -1, value])
                    }else{
                      onUpdateCodeValue(["teal", explorerPage.teal.selectedFileIndex, value])
                    }
                  }}
                  onChange={(editor, value) => {
                    console.log('controlled', {value});
                  }}
                />
              </div>
              <div className="actionPanel">
                <div className="actionPanelButton">
                  <div className={(explorerPage.teal.codeCompileAddress == "-") ? "" : "disabled"}>
                    <button data-tip="Compiling outputs a deterministic address" data-for="teal" onClick={onCodeCompile}>
                      Compile
                    </button>
                  </div>
                </div>
                <div className="actionPanelButton">
                  <div className={(explorerPage.teal.codeCompileAddress == "-" || explorerPage.teal.contractBalance > 999999991) ? "disabled" : ""}>
                    <button data-tip="Funds address from faucet" data-for="teal" onClick={onFundContract}>
                      Fund Contract Address
                    </button>
                  </div>
                </div>
                <div className="actionPanelButton hide">
                  <div className={(explorerPage.teal.codeCompileAddress == "-" || explorerPage.teal.contractBalance <= 1) ? "disabled" : ""}>
                    <button data-tip="Execute contract on-chain. Transaction can be viewed on block explorer" data-for="teal" onClick={onCodeDeploy}>
                      Execute Transaction
                    </button>
                  </div>
                </div>
                <div className="actionPanelBalance">
                  <button className={(explorerPage.teal.codeCompileAddress == "-") ? "disabled" : ""}>
                    {explorerPage.teal.contractBalance} ALGO
                  </button>
                </div>
                <div className="clear"></div>
              </div>
              
              
              <BashConsole bashResponse={explorerPage.teal.bashResponse} />
              
            
            </div>
            <div className="clear"></div>
          </div>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="js" place="bottom" type="light" effect="float"/>
          <div className="ideContent">
            <div className="pageLeft">
              <FileExplorer filePreset={explorerPage.javascript.explorerFilePreset} onAddNewFile={onAddNewFile} onToggleFolder={onToggleFolder} explorerPage={explorerPage.javascript} onChangeFile={onChangeFile} onChangeNewFileName={onChangeNewFileName} onDeleteFile={onDeleteFile} newFileName={explorerPage.newFileName} mode="js" />
            </div>
            <div className="pageRight">
              <div className="ide ideJs">
                <CodeMirror
                  value={explorerPage.javascript.codeValue}
                  options={optionsCode}
                  autoFocus={true}
                  onBeforeChange={(editor, data, value) => {
                    console.log('set value here', {value});
                    if(explorerPage.teal.selectedFolderId !== 999){
                      onUpdateCodeValue(["js", -1, value])
                    }else{
                      onUpdateCodeValue(["js", explorerPage.javascript.selectedFileIndex, value])
                    }
                  }}
                  onChange={(editor, value) => {
                    console.log('controlled', {value});
                  }}
                />
              </div>
              <div className="actionPanel">
                <div className="actionPanelButton">
                  <div>
                    <button data-tip="Execute code" data-for="js" onClick={onCodeExecuteJs}>
                      Run Script
                    </button>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              
              
              <BashConsole bashResponse={explorerPage.javascript.bashResponse} />
              
            
            </div>
            <div className="clear"></div>
          </div>
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
  walletPage: makeSelectWalletPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUpdateCodeValue: evt => dispatch(updateCodeValue(evt)),
    onAddNewFile: evt => dispatch(addNewFile(evt)),
    onToggleFolder: evt => dispatch(toggleFolder(evt)),
    onChangeFile: evt => dispatch(changeFile(evt)),
    onCodeDeploy: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(tealCodeDeploy(evt));
    },
    onCodeCompile: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(codeCompile(evt));
    },
    onCodeExecuteJs: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(jsCodeExecute(evt));
    },
    onFundContract: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(faucetContractSend(evt));
    },
    onChangeNewFileName: evt => dispatch(changeNewFileName(evt.target.value)),
    onDeleteFile: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deleteFile(evt));
    },
    onEditFileContent: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(editFileContent(evt));
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

export default compose(withConnect)(ExplorerPage);

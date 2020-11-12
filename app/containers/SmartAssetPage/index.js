/**
 *
 * SmartAssetPage
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
  makeSelectSmartAssetPage,
} from './selectors';

import {
  makeSelectWalletPage,
  makeSelectWalletAddressList,
} from '../WalletPage/selectors';


import reducer from './reducer';
import saga from './saga';
// import reducerWallet from '../WalletPage/reducer';
// import sagaWallet from '../WalletPage/saga';
import messages from './messages';

import Collapsible from 'react-collapsible';

import {
  createAsset,
  changeNote,
  changeAddress,
  changeDefaultFrozen,
  changeTotalIssuance,
  changeUnitName,
  changeAssetName,
  changeAssetURL,
  changeAssetMetadataHash,
  changeManager,
  changeReserve,
  changeFreeze,
  changeClawback
} from '../SmartAssetPage/actions';

import {
  loading,
  recaptchaChange,
  selectPage
} from '../WalletPage/actions';

import Input from './Input';
import SmartAsset from './SmartAsset';


import Captcha from '../../components/Captcha';

const recaptchaRef = React.createRef();

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require("codemirror/theme/dracula.css");

import ReactTooltip from "react-tooltip";

let iconInfo = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIid2UTQ6CMBSEv2jgehJQuZKIxyCu9R66lqi49AK4Fhe0hpCWPn5WTDJJ8zKdafvawtzhAzFwBHLgo5ir2lZpBiECCqBy8AmEfYyXwEFg3GYKLCQBQ8w1E5d5NMJcM7CZ+9Tn2TVZo0vzwtL4WLA6SUAFbLSw2RTr1gzGLqxMxbtgZVLmpoBSMLG9ExtLLRTd2wH4mgLeEwb8vZoB1wkDLqaA04QBZ1PRAx6Mb3JBxw8bOiZLaHwDTaQjzHcuc6j7sh9gntDz2ge4e1IpjfNYbPCoP64MuFG/0FKNM2CtNDPGD2oP1wWSIKFFAAAAAElFTkSuQmCC"/>


export function SmartAssetPage({
  onCreateAsset,
  onChangeNote,
  onChangeAddress,
  onChangeDefaultFrozen,
  onChangeTotalIssuance,
  onChangeUnitName,
  onChangeAssetName,
  onChangeAssetURL,
  onChangeAssetMetadataHash,
  onChangeManager,
  onChangeReserve,
  onChangeFreeze,
  onChangeClawback,
  smartAssetPage,
  onRecaptchaChange,
  // onGenerateAccountPrimary,
  // onRestoreAccountPrimary,
  // onGenerateAccountSecondary,
  // onRestoreAccountSecondary,
  walletPage,
  addressList,
  onSelectPage,
}) {
  useInjectReducer({ key: 'smartAssetPage', reducer: reducer });
  useInjectSaga({ key: 'smartAssetPage', saga: saga });
  // useInjectReducer({ key: 'walletPage', reducer: reducerWallet });
  // useInjectSaga({ key: 'walletPage', saga: sagaWallet });

  useEffect(() => {
    onSelectPage("asset");
  });

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};
  
  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '10px',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2px',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 'bold',
    minWidth: 1,
    padding: '3px 8px',
    textAlign: 'center',
  };
  
  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  let options = addressList.map(function(addr, index) {
    return { value: addr, label: addr };
  })

  let optionsContract = [{ value: ((walletPage.contractAddress) ? walletPage.contractAddress : "-"), label: ((walletPage.contractAddress) ? walletPage.contractAddress : "-") }];
  
  const groupedOptions = [
    {
      label: 'User Account',
      options: options,
    },
    {
      label: 'Contract Address',
      options: optionsContract,
    },
  ];
  console.log("options", options);
  console.log("optionsContract", optionsContract);
  
  
  console.log("groupedOptions", groupedOptions);
  console.log("groupedOptions", groupedOptions);
  console.log("groupedOptions", groupedOptions);
  console.log("groupedOptions", groupedOptions);
  console.log("groupedOptions", groupedOptions);

  return (
    <SmartAsset>
      <ReactTooltip id="asset" place="right" type="dark" effect="float"/>
      <div>
        <div className="pageName">
          Smart Asset Creator
        </div>
        <form className={(smartAssetPage.formSubmitted == true) ? "disabled" : ""} onSubmit={onCreateAsset}>
          <div className="pageLeft">
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  Note: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Transaction message to be included during asset creation" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="note"
                  type="text"
                  value={smartAssetPage.inputNote}
                  onChange={onChangeNote}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  Address: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Address that will be the creator of the asset" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div className="selectComponent">
                <Select
                  defaultValue={options[1]}
                  options={groupedOptions}
                  onChange={onChangeAddress}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  defaultFrozen: 
                </div>
                <div className="info sectionTitleInfo" data-tip="User accounts will need to be unfrozen before transacting" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="defaultFrozen"
                  type="text"
                  value={smartAssetPage.inputDefaultFrozen}
                  onChange={onChangeDefaultFrozen}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  totalIssuance: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Total number of this asset available for circulation   " data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="totalIssuance"
                  type="text"
                  value={smartAssetPage.inputTotalIssuance}
                  onChange={onChangeTotalIssuance}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  unitName: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Symbol of the asset" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="unitName"
                  type="text"
                  value={smartAssetPage.inputUnitName}
                  onChange={onChangeUnitName}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  assetName: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Name of the asset" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="assetName"
                  type="text"
                  value={smartAssetPage.inputAssetName}
                  onChange={onChangeAssetName}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  assetURL: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Website URL relating to the asset" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="assetURL"
                  type="text"
                  value={smartAssetPage.inputAssetURL}
                  onChange={onChangeAssetURL}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  assetMetaHash: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Optional hash commitment of some sort relating to the asset" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <Input
                  id="assetMetahash"
                  type="text"
                  value={smartAssetPage.inputAssetMetadataHash}
                  onChange={onChangeAssetMetadataHash}
                />
              </div>
            </div>
          </div>
          <div className="pageRight">
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  manager: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Specified address can change reserve, freeze, clawback, and manager" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeManager}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
              <div className="disclaimer">
                * If manager is empty during asset creation, manager can not be added after asset is created.
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  reserve: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Specified address is considered the asset reserve" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeReserve}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  freeze: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Specified address can freeze or unfreeze user asset holdings" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeFreeze}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleText">
                  clawback: 
                </div>
                <div className="info sectionTitleInfo" data-tip="Specified address can revoke user asset holdings and send them to other addresses" data-for="asset">
                  {iconInfo}
                </div>
                <div className="clear"></div>
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeClawback}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
            </div>
          </div>
          <div className="clear"></div>
          
          <div className="section hide">
            <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
          </div>
          <div className="section">
            <button className={(smartAssetPage.formSubmitted == true) ? "pending" : ""}>
              {(smartAssetPage.formSubmitted == true) ? "Creating Asset..." : "Create Asset"}
            </button>
          </div>
        </form>
      </div>
      <div className="assetResponse">
        <div className={(smartAssetPage.txID == "-" || smartAssetPage.assetID == "-") ? "disabled" : ""}>
          <div className="assetResponseSection">
            <div className="assetResponseTitle">
              Transaction ID:
            </div>
            <div className="assetResponseOutput">
              <a href={walletPage.explorer+"/tx/"+smartAssetPage.txID} target="_blank">
                {smartAssetPage.txID}
              </a>
            </div>
          </div>
          <div className="assetResponseSection">
            <div className="assetResponseTitle">
              Asset ID:
            </div>
            <div className="assetResponseOutput">
              <a href={walletPage.explorer+"/asset/"+smartAssetPage.assetID} target="_blank">
                {smartAssetPage.assetID}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SmartAsset>
  );
}

SmartAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addressList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  smartAssetPage: makeSelectSmartAssetPage(),
  walletPage: makeSelectWalletPage(),
  addressList: makeSelectWalletAddressList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCreateAsset: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(createAsset(evt));
    },
    onChangeNote: evt => dispatch(changeNote(evt.target.value)),
    onChangeAddress: evt => dispatch(changeAddress(evt.value)),
    onChangeDefaultFrozen: evt => dispatch(changeDefaultFrozen(evt.target.value)),
    onChangeTotalIssuance: evt => dispatch(changeTotalIssuance(evt.target.value)),
    onChangeUnitName: evt => dispatch(changeUnitName(evt.target.value)),
    onChangeAssetName: evt => dispatch(changeAssetName(evt.target.value)),
    onChangeAssetURL: evt => dispatch(changeAssetURL(evt.target.value)),
    onChangeAssetMetadataHash: evt => dispatch(changeAssetMetadataHash(evt.target.value)),
    onChangeManager: evt => dispatch(changeManager(evt)),
    onChangeReserve: evt => dispatch(changeReserve(evt)),
    onChangeFreeze: evt => dispatch(changeFreeze(evt)),
    onChangeClawback: evt => dispatch(changeClawback(evt)),
    onRecaptchaChange: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(recaptchaChange(evt));
    },
    onSelectPage: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectPage(evt));
    },
    // onGenerateAccountPrimary: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(generateAccountPrimary(evt));
    // },
    // onGenerateAccountSecondary: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(generateAccountSecondary(evt));
    // },
    // onRestoreAccountPrimary: evt => dispatch(restoreAccountPrimary(evt)),
    // onRestoreAccountSecondary: evt => dispatch(restoreAccountSecondary(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SmartAssetPage);

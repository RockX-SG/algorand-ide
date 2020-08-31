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
}) {
  useInjectReducer({ key: 'smartAssetPage', reducer: reducer });
  useInjectSaga({ key: 'smartAssetPage', saga: saga });
  // useInjectReducer({ key: 'walletPage', reducer: reducerWallet });
  // useInjectSaga({ key: 'walletPage', saga: sagaWallet });

  // useEffect(() => {
  //   let localMnemonicPrimary = localStorage.getItem('mnemonicPrimary');
  //   let localAddressPrimary = localStorage.getItem('addressPrimary');
  //   let localMnemonicSecondary = localStorage.getItem('mnemonicSecondary');
  //   let localAddressSecondary = localStorage.getItem('addressSecondary');
  //
  //   if(localMnemonicPrimary == "" || localMnemonicPrimary == null){
  //     onGenerateAccountPrimary();
  //   }else{
  //     onRestoreAccountPrimary([localMnemonicPrimary, localAddressPrimary]);
  //   }
  //
  //   if(localMnemonicSecondary == "" || localMnemonicSecondary == null){
  //     onGenerateAccountSecondary();
  //   }else{
  //     onRestoreAccountSecondary([localMnemonicSecondary, localAddressSecondary]);
  //   }
  //
  // });

  var optionsResponse = {
		lineNumbers: false,
		readOnly: true,
    theme: "dracula",
		mode: 'markdown'
	};

  // const options = [
  //   { value: 'xxx', label: 'xxx' },
  //   { value: 'yyy', label: 'yyy' },
  // ]

  let options = addressList.map(function(addr) {
    return { value: addr, label: addr };
  })

  return (
    <SmartAsset>
      <div>
        <div className="pageName">
          Smart Asset Creator
        </div>
        <form className={(smartAssetPage.formSubmitted == true) ? "disabled" : ""} onSubmit={onCreateAsset}>
          <div className="pageLeft">
            <div className="section">
              <div className="sectionTitle">
                Note:
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
                address:
              </div>
              <div className="selectComponent">
                <Select
                  defaultValue={options[1]}
                  options={options}
                  onChange={onChangeAddress}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                defaultFrozen:
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
                totalIssuance:
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
                unitName:
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
                assetName:
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
                assetURL:
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
                assetMetaHash:
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
                manager:
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeManager}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                reserve:
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeReserve}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                freeze:
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeFreeze}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
            </div>
            <div className="section">
              <div className="sectionTitle">
                clawback:
              </div>
              <div className="selectComponent">
                <CreatableSelect
                  isClearable
                  onChange={onChangeClawback}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="clear"></div>
          
          <div className="section">
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
              <a href={"https://testnet.algoexplorer.io/tx/"+smartAssetPage.txID} target="_blank">
                {smartAssetPage.txID}
              </a>
            </div>
          </div>
          <div className="assetResponseSection">
            <div className="assetResponseTitle">
              Asset ID:
            </div>
            <div className="assetResponseOutput">
              <a href={"https://testnet.algoexplorer.io/asset/"+smartAssetPage.assetID} target="_blank">
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
    onChangeManager: evt => dispatch(changeManager(evt.value)),
    onChangeReserve: evt => dispatch(changeReserve(evt.value)),
    onChangeFreeze: evt => dispatch(changeFreeze(evt.value)),
    onChangeClawback: evt => dispatch(changeClawback(evt.value)),
    onRecaptchaChange: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(recaptchaChange(evt));
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

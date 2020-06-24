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
} from '../WalletPage/selectors';


import reducer from './reducer';
import saga from './saga';
// import reducerWallet from '../WalletPage/reducer';
// import sagaWallet from '../WalletPage/saga';
import messages from './messages';

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

// import {
//   generateAccountPrimary,
//   restoreAccountPrimary,
//   generateAccountSecondary,
//   restoreAccountSecondary,
// } from '../WalletPage/actions';

import Input from './Input';

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
  onCreatAsset,
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

  // onGenerateAccountPrimary,
  // onRestoreAccountPrimary,
  // onGenerateAccountSecondary,
  // onRestoreAccountSecondary,
  walletPage
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

  let options = walletPage.addressList.map(function(addr) {
    return { value: addr, label: addr };
  })

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div>
        <form onSubmit={onCreatAsset}>
          <div>
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
          <div>
            address:
          </div>
          <div>
            <Select
              defaultValue={options[1]}
              options={options}
              onChange={onChangeAddress}
            />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
            manager:
          </div>
          <div>
            <CreatableSelect
              isClearable
              onChange={onChangeManager}
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div>
            reserve:
          </div>
          <div>
            <CreatableSelect
              isClearable
              onChange={onChangeReserve}
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div>
            freeze:
          </div>
          <div>
            <CreatableSelect
              isClearable
              onChange={onChangeFreeze}
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div>
            clawback:
          </div>
          <div>
            <CreatableSelect
              isClearable
              onChange={onChangeClawback}
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div>
            <button>
              Create Asset
            </button>
          </div>
        </form>
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
  );
}

SmartAssetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartAssetPage: makeSelectSmartAssetPage(),
  walletPage: makeSelectWalletPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCreatAsset: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
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

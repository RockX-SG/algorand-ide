/**
 *
 * WalletPage
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
  makeSelectWalletPage,
  makeSelectMnemonicPrimary,
  makeSelectAddressPrimary,
  makeSelectMnemonicSecondary,
  makeSelectAddressSecondary,
  makeSelectMnemonicTertiary,
  makeSelectAddressTertiary,
  makeSelectMnemonicQuarternary,
  makeSelectAddressQuarternary,
  makeSelectMnemonicQuinary,
  makeSelectAddressQuinary,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


import {
  loading,
  generateAccountPrimary,
  restoreAccountPrimary,
  generateAccountSecondary,
  restoreAccountSecondary,
  generateAccountTertiary,
  restoreAccountTertiary,
  generateAccountQuarternary,
  restoreAccountQuarternary,
  generateAccountQuinary,
  restoreAccountQuinary,
  sendTransaction,
  faucetSend,
  changeAddress,
  changeAmount,
  getFaucetBalance,
  toggleSelectedAccount,
  selectAccount,
  addAccount,
  recaptchaChange,
  mnemonicRegenerate,
  getAddressAsa,
  selectPage
} from '../WalletPage/actions';

import Input from './Input';
import FaucetForm from "./FaucetForm";
import Wallet from './Wallet';

import WalletDisplay from '../../components/WalletDisplay';

export function WalletPage({
  onGenerateAccountPrimary,
  onRestoreAccountPrimary,
  onGenerateAccountSecondary,
  onRestoreAccountSecondary,
  onGenerateAccountTertiary,
  onRestoreAccountTertiary,
  onGenerateAccountQuarternary,
  onRestoreAccountQuarternary,
  onGenerateAccountQuinary,
  onRestoreAccountQuinary,
  onSendTransaction,
  onChangeAddress,
  onChangeAmount,
  onGetFaucetBalance,
  onFaucetSend,
  onToggleSelectedAccount,
  onSelectAccount,
  onAddAccount,
  inputAddress,
  inputAmount,
  addressPrimary,
  mnemonicPrimary,
  addressSecondary,
  mnemonicSecondary,
  addressTertiary,
  mnemonicTertiary,
  addressQuarternary,
  mnemonicQuarternary,
  addressQuinary,
  mnemonicQuinary,
  walletPage,
  onChangeMnemonicRestore,
  onRecaptchaChange,
  onMnemonicRegenerate,
  onSelectPage,
  onGetAddressAsa,
}) {
  useInjectReducer({ key: 'walletPage', reducer });
  useInjectSaga({ key: 'walletPage', saga });

  useEffect(() => {
    let localMnemonicPrimary = localStorage.getItem('mnemonicPrimary');
    let localAddressPrimary = localStorage.getItem('addressPrimary');
    let localMnemonicSecondary = localStorage.getItem('mnemonicSecondary');
    let localAddressSecondary = localStorage.getItem('addressSecondary');
    let localMnemonicTertiary = localStorage.getItem('mnemonicTertiary');
    let localAddressTertiary = localStorage.getItem('addressTertiary');
    let localMnemonicQuarternary = localStorage.getItem('mnemonicQuarternary');
    let localAddressQuarternary = localStorage.getItem('addressQuarternary');
    let localMnemonicQuinary = localStorage.getItem('mnemonicQuinary');
    let localAddressQuinary = localStorage.getItem('addressQuinary');
    // 
    // if(localMnemonicPrimary == "" || localMnemonicPrimary == null){
    //   onGenerateAccountPrimary();
    // }else{
    //   onRestoreAccountPrimary([localMnemonicPrimary, localAddressPrimary]);
    // }
    // 
    // if(localMnemonicSecondary == "" || localMnemonicSecondary == null){
    //   onGenerateAccountSecondary();
    // }else{
    //   onRestoreAccountSecondary([localMnemonicSecondary, localAddressSecondary]);
    // }
    // 
    // if(localMnemonicTertiary == "" || localMnemonicTertiary == null){
    //   onGenerateAccountTertiary();
    // }else{
    //   onRestoreAccountTertiary([localMnemonicTertiary, localAddressTertiary]);
    // }
    // 
    // if(localMnemonicQuarternary == "" || localMnemonicQuarternary == null){
    //   onGenerateAccountQuarternary();
    // }else{
    //   onRestoreAccountQuarternary([localMnemonicQuarternary, localAddressQuarternary]);
    // }
    // 
    // if(localMnemonicQuinary == "" || localMnemonicQuinary == null){
    //   onGenerateAccountQuinary();
    // }else{
    //   onRestoreAccountQuinary([localMnemonicQuinary, localAddressQuinary]);
    // }

    onGetFaucetBalance();
    onSelectPage("wallet");
    
  });
  

  return (
    <div>
      <Wallet>
        <div className="pageName">
          Wallets
        </div>
        <WalletDisplay address={walletPage.addressArray} addressShorten={walletPage.addressShortenArray} mnemonic={walletPage.mnemonicArray} balance={walletPage.balanceArray} selectedAccount={walletPage.address} onSelectAccount={onSelectAccount}
        onChangeMnemonicRestore={onChangeMnemonicRestore} mnemonicRestore={walletPage.mnemonicRestore} onMnemonicRegenerate={onMnemonicRegenerate} onGetAddressAsa={onGetAddressAsa} assetAsaArray={walletPage.assetAsaArray} />
        
        <button className={(walletPage.addressArray.length < 5) ? "" : "hide"} onClick={() => onAddAccount()}>
          Add more wallet
        </button>
        
        <div className={(walletPage.network == "mainnet") ? "hide" : "faucet"}>
          
          <FaucetForm onSubmit={onFaucetSend} faucetSendError={walletPage.faucetSendError} faucetBalance={walletPage.faucetBalance} addressArray={walletPage.addressArray} captchaData={walletPage.captchaData}  onChangeAddress={onChangeAddress} onRecaptchaChange={onRecaptchaChange} walletPage={walletPage} />
          
          
          <div className="assetResponse">
            <div className={(walletPage.faucetSendTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={walletPage.explorer+"/tx/"+walletPage.faucetSendTxHash} target="_blank">
                    {walletPage.faucetSendTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wallet>
    </div>
  );
}

WalletPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeName: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  walletPage: makeSelectWalletPage(),
  mnemonicPrimary: makeSelectMnemonicPrimary(),
  addressPrimary: makeSelectAddressPrimary(),
  mnemonicSecondary: makeSelectMnemonicSecondary(),
  addressSecondary: makeSelectAddressSecondary(),
  mnemonicTertiary: makeSelectMnemonicTertiary(),
  addressTertiary: makeSelectAddressTertiary(),
  mnemonicQuarternary: makeSelectMnemonicQuarternary(),
  addressQuarternary: makeSelectAddressQuarternary(),
  mnemonicQuinary: makeSelectMnemonicQuinary(),
  addressQuinary: makeSelectAddressQuinary(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGenerateAccountPrimary: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAccountPrimary(evt));
    },
    onGenerateAccountSecondary: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAccountSecondary(evt));
    },
    onGenerateAccountTertiary: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAccountTertiary(evt));
    },
    onGenerateAccountQuarternary: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAccountQuarternary(evt));
    },
    onGenerateAccountQuinary: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAccountQuinary(evt));
    },
    onRestoreAccountPrimary: evt => dispatch(restoreAccountPrimary(evt)),
    onRestoreAccountSecondary: evt => dispatch(restoreAccountSecondary(evt)),
    onRestoreAccountTertiary: evt => dispatch(restoreAccountTertiary(evt)),
    onRestoreAccountQuarternary: evt => dispatch(restoreAccountQuarternary(evt)),
    onRestoreAccountQuinary: evt => dispatch(restoreAccountQuinary(evt)),
    onGetFaucetBalance: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getFaucetBalance());
    },
    onChangeAddress: evt => dispatch(changeAddress(evt)),
    onChangeAmount: evt => dispatch(changeAmount(evt.target.value)),
    onSendTransaction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction(evt));
    },
    onFaucetSend: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(faucetSend(evt));
    },
    onToggleSelectedAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(toggleSelectedAccount(evt));
    },
    onSelectAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectAccount(evt));
    },
    onAddAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(addAccount(evt));
    },
    onChangeMnemonicRestore: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addAccount(evt));
    },
    onRecaptchaChange: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(recaptchaChange(evt));
    },
    onMnemonicRegenerate: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(mnemonicRegenerate(evt));
    },
    onGetAddressAsa: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getAddressAsa(evt));
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

export default compose(withConnect)(WalletPage);

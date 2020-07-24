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
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


import {
  generateAccountPrimary,
  restoreAccountPrimary,
  generateAccountSecondary,
  restoreAccountSecondary,
  sendTransaction,
  faucetSend,
  changeAddress,
  changeAmount,
  getFaucetBalance,
  toggleSelectedAccount,
  selectAccount,
  addAccount,
  recaptchaChange
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
  walletPage,
  onChangeMnemonicRestore,
  onRecaptchaChange
}) {
  useInjectReducer({ key: 'walletPage', reducer });
  useInjectSaga({ key: 'walletPage', saga });

  useEffect(() => {
    let localMnemonicPrimary = localStorage.getItem('mnemonicPrimary');
    let localAddressPrimary = localStorage.getItem('addressPrimary');
    let localMnemonicSecondary = localStorage.getItem('mnemonicSecondary');
    let localAddressSecondary = localStorage.getItem('addressSecondary');

    if(localMnemonicPrimary == "" || localMnemonicPrimary == null){
      onGenerateAccountPrimary();
    }else{
      onRestoreAccountPrimary([localMnemonicPrimary, localAddressPrimary]);
    }

    if(localMnemonicSecondary == "" || localMnemonicSecondary == null){
      onGenerateAccountSecondary();
    }else{
      onRestoreAccountSecondary([localMnemonicSecondary, localAddressSecondary]);
    }

    onGetFaucetBalance();
  });
  

  return (
    <div>
      <Wallet>
        <div className="pageName">
          Wallets
        </div>
        <WalletDisplay address={walletPage.addressArray} addressShorten={walletPage.addressShortenArray} mnemonic={walletPage.mnemonicArray} balance={walletPage.balanceArray} selectedAccount={walletPage.address} onSelectAccount={onSelectAccount}
        onChangeMnemonicRestore={onChangeMnemonicRestore} mnemonicRestore={walletPage.mnemonicRestore} />
        
        <button className={(walletPage.addressArray.length < 5) ? "" : "hide"} onClick={() => onAddAccount()}>
          Add more wallet
        </button>
        
        <div className="faucet">
          
          <FaucetForm onSubmit={onFaucetSend} faucetBalance={walletPage.faucetBalance} addressArray={walletPage.addressArray} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} />
          
          
          <div className="assetResponse">
            <div className={(walletPage.faucetSendTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+walletPage.faucetSendTxHash} target="_blank">
                    {walletPage.faucetSendTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form className="hide" onSubmit={onSendTransaction}>
            <h3>
              Send ALGO
            </h3>
            <div>
              Sending Address:
            </div>
            <div>
              {(walletPage.selectedAccount == 1) ? walletPage.addressPrimary : walletPage.addressSecondary}
            </div>
            <div>
              Destination Address:
            </div>
            <div>
              <Input
                id="address"
                type="text"
                placeholder="Please input receiving address"
                value={walletPage.inputAddress}
                onChange={onChangeAddress}
              />
            </div>
            <div>
              Amount:
            </div>
            <div>
              <Input
                id="amount"
                type="text"
                placeholder="Please input sending amount"
                value={walletPage.inputAmount}
                onChange={onChangeAmount}
              />
            </div>
            <div>
              <button>
                Send Tx
              </button>
            </div>

            <div>
              <a href={"https://testnet.algoexplorer.io/tx/" + walletPage.userSendTxHash} target="_blank">
                {walletPage.userSendTxHash}
              </a>
            </div>
          </form>
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
    onRestoreAccountPrimary: evt => dispatch(restoreAccountPrimary(evt)),
    onRestoreAccountSecondary: evt => dispatch(restoreAccountSecondary(evt)),
    onGetFaucetBalance: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getFaucetBalance());
    },
    onChangeAddress: evt => dispatch(changeAddress(evt.target.value)),
    onChangeAmount: evt => dispatch(changeAmount(evt.target.value)),
    onSendTransaction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction(evt));
    },
    onFaucetSend: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(faucetSend(evt));
    },
    onToggleSelectedAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(toggleSelectedAccount(evt));
    },
    onSelectAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(selectAccount(evt));
    },
    onAddAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WalletPage);

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
  toggleSelectedAccount
} from '../WalletPage/actions';

import Input from './Input';

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
  inputAddress,
  inputAmount,
  addressPrimary,
  mnemonicPrimary,
  addressSecondary,
  mnemonicSecondary,
  walletPage
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
      <FormattedMessage {...messages.header} />
      <div>
        <form onSubmit={onFaucetSend}>
          <h2>
            Selected Account:
          </h2>
          <div>
            {(walletPage.selectedAccount == 1) ? walletPage.addressPrimary : walletPage.addressSecondary}
          </div>
          <div onClick={() => onToggleSelectedAccount()}>
            Change selected account
          </div>
          <h2>
            Faucet
          </h2>
          <div>
            Faucet Address:
          </div>
          <div>
            core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign
          </div>
          <div>
            CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM
          </div>
          <div>
            Available balance: {walletPage.faucetBalance} ALGO
          </div>
          <div>
            <button>
              Redeem from Faucet
            </button>
          </div>

          <div>
            <a href={"https://testnet.algoexplorer.io/tx/" + walletPage.faucetSendTxHash} target="_blank">
              {walletPage.faucetSendTxHash}
            </a>
          </div>
        </form>
        <form onSubmit={onSendTransaction}>
          <h2>
            Send ALGO
          </h2>
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
        <h2>
          Send ASA
        </h2>
        <h2>
          Mnemonic seed (Primary)
        </h2>
        <div onClick={() => onGenerateAccountPrimary()}>
          Regenerate seed
        </div>
        <div>
          {mnemonicPrimary}
        </div>
        <h2>
          Address
        </h2>
        <div>
          {addressPrimary}
        </div>
        <h2>
          Mnemonic seed (Secondary)
        </h2>
        <div onClick={() => onGenerateAccountSecondary()}>
          Regenerate seed
        </div>
        <div>
          {mnemonicSecondary}
        </div>
        <h2>
          Address
        </h2>
        <div>
          {addressSecondary}
        </div>
      </div>
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WalletPage);

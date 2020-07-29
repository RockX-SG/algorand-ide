/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
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

// import reducer from './reducer';
// import saga from './saga';
import reducerWallet from '../WalletPage/reducer';
import sagaWallet from '../WalletPage/saga';

import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SmartContractPage from 'containers/SmartContractPage/Loadable';
import SmartAssetPage from 'containers/SmartAssetPage/Loadable';
import TutorialPage from 'containers/TutorialPage/Loadable';
import WalletPage from 'containers/WalletPage/Loadable';
import ExplorerPage from 'containers/ExplorerPage/Loadable';
import TransactionPage from 'containers/TransactionPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


import TutorialJsCreateAccountPage from 'containers/TutorialJsCreateAccountPage/Loadable';
import TutorialJsCreateAssetPage from 'containers/TutorialJsCreateAssetPage/Loadable';
import TutorialJsLimitOrderPage from 'containers/TutorialJsLimitOrderPage/Loadable';
import TutorialJsTransferAssetPage from 'containers/TutorialJsTransferAssetPage/Loadable';

import Navigation from '../../components/Navigation';
import NavigationSide from '../../components/NavigationSide';
import Footer from '../../components/Footer';

import MainnetDisclaimer from '../../components/MainnetDisclaimer';
import CustomNetworkDisclaimer from '../../components/CustomNetworkDisclaimer';

import GlobalStyle from '../../global-styles';

import {
  generateAccountPrimary,
  restoreAccountPrimary,
  generateAccountSecondary,
  restoreAccountSecondary,
  toggleSelectedAccount,
  changeNetwork,
  toggleDropdown,
  selectAccount,
  selectPage
} from '../WalletPage/actions';

import {
  makeSelectWalletPage
} from '../WalletPage/selectors';

export function App({
  onGenerateAccountPrimary,
  onRestoreAccountPrimary,
  onGenerateAccountSecondary,
  onRestoreAccountSecondary,
  onToggleSelectedAccount,
  onChangeNetwork,
  walletPage,
  onShowDropdown,
  onHideDropdown,
  onSelectAccount,
  onSelectPage,
}) {
  // useInjectReducer({ key: 'app', reducer });
  // useInjectSaga({ key: 'app', saga });
  useInjectReducer({ key: 'walletPage', reducer: reducerWallet });
  useInjectSaga({ key: 'walletPage', saga: sagaWallet });

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

  });
  

  return (
    <div>
      <Navigation address={walletPage.address} addressShorten={walletPage.addressShorten} balance={walletPage.balance} onToggleSelectedAccount={onToggleSelectedAccount} onChangeNetwork={onChangeNetwork} dropdownStatus={walletPage.dropdownStatus}  onShowDropdown={onShowDropdown} onHideDropdown={onHideDropdown} addressArray={walletPage.addressArray} addressShortenArray={walletPage.addressShortenArray} mnemonicArray={walletPage.mnemonicArray} balanceArray={walletPage.balanceArray} onSelectAccount={onSelectAccount} />
      <MainnetDisclaimer network={walletPage.network} />
      <CustomNetworkDisclaimer network={walletPage.network} />
      <NavigationSide currentPage={walletPage.currentPage} onSelectPage={onSelectPage} />
      
      <div className={(walletPage.network == "mainnet" || walletPage.network == "custom") ? "page pagePadTop" : "page"}>
        <Switch>
          <Route exact path="/" component={ExplorerPage} />
          <Route exact path="/smart-contract" component={SmartContractPage} />
          <Route exact path="/smart-asset" component={SmartAssetPage} />
          <Route exact path="/asset" component={SmartAssetPage} />
          <Route exact path="/tutorials" component={TutorialPage} />
          <Route exact path="/tutorial/create-account" component={TutorialJsCreateAccountPage} />
          <Route exact path="/tutorial/create-asset" component={TutorialJsCreateAssetPage} />
          <Route exact path="/tutorial/limit-order-contract" component={TutorialJsLimitOrderPage} />
          <Route exact path="/tutorial/transfer-asset" component={TutorialJsTransferAssetPage} />
          <Route exact path="/wallet" component={WalletPage} />
          <Route exact path="/explorer" component={ExplorerPage} />
          <Route exact path="/transaction" component={TransactionPage} />
          <Route exact path="/settings" component={SettingsPage} />
          
          
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
      <GlobalStyle />
    </div>
  );
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  walletPage: makeSelectWalletPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onToggleSelectedAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(toggleSelectedAccount(evt));
    },
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
    onChangeNetwork: evt => dispatch(changeNetwork(evt.value)),
    onShowDropdown: evt => dispatch(toggleDropdown(true)),
    onHideDropdown: evt => dispatch(toggleDropdown(false)),
    onSelectAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectAccount(evt));
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

export default compose(withConnect)(App);

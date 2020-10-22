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
import SmartAssetPage from 'containers/SmartAssetPage/Loadable';
import WalletPage from 'containers/WalletPage/Loadable';
import ExplorerPage from 'containers/ExplorerPage/Loadable';
import TransactionPage from 'containers/TransactionPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


import TutorialPage from 'containers/TutorialPage/Loadable';
import TutorialJsCreateAccountPage from 'containers/TutorialJsCreateAccountPage/Loadable';
import TutorialJsCreateAssetPage from 'containers/TutorialJsCreateAssetPage/Loadable';
import TutorialJsLimitOrderPage from 'containers/TutorialJsLimitOrderPage/Loadable';
import TutorialJsTransferAssetPage from 'containers/TutorialJsTransferAssetPage/Loadable';

import TutorialJsHashTimeLockPage from 'containers/TutorialJsHashTimeLockPage/Loadable';
import TutorialJsDestroyAssetPage from 'containers/TutorialJsDestroyAssetPage/Loadable';
import TutorialJsRevokeAssetPage from 'containers/TutorialJsRevokeAssetPage/Loadable';
import TutorialJsOptInAssetPage from 'containers/TutorialJsOptInAssetPage/Loadable';
import TutorialJsFreezeAssetPage from 'containers/TutorialJsFreezeAssetPage/Loadable';
import TutorialJsWriteTransactionNotePage from 'containers/TutorialJsWriteTransactionNotePage/Loadable';

import Navigation from '../../components/Navigation';
import NavigationSide from '../../components/NavigationSide';
import Footer from '../../components/Footer';
import LoadingScreen from '../../components/LoadingScreen';

import MainnetDisclaimer from '../../components/MainnetDisclaimer';
import CustomNetworkDisclaimer from '../../components/CustomNetworkDisclaimer';

import GlobalStyle from '../../global-styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
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
  toggleSelectedAccount,
  changeNetwork,
  toggleDropdown,
  selectAccount,
  selectPage,
  changeServerAddress,
  changeServerPort,
  changeAlgodToken,
} from '../WalletPage/actions';

import {
  makeSelectWalletPage
} from '../WalletPage/selectors';

export function App({
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
  onToggleSelectedAccount,
  onChangeNetwork,
  walletPage,
  onShowDropdown,
  onHideDropdown,
  onSelectAccount,
  onSelectPage,
  onRestoreServerAddress,
  onRestoreServerPort,
  onRestoreAlgodToken,
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
    let localMnemonicTertiary = localStorage.getItem('mnemonicTertiary');
    let localAddressTertiary = localStorage.getItem('addressTertiary');
    let localMnemonicQuarternary = localStorage.getItem('mnemonicQuarternary');
    let localAddressQuarternary = localStorage.getItem('addressQuarternary');
    let localMnemonicQuinary = localStorage.getItem('mnemonicQuinary');
    let localAddressQuinary = localStorage.getItem('addressQuinary');

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

    if(localMnemonicTertiary == "" || localMnemonicTertiary == null){
      // onGenerateAccountTertiary();
    }else{
      // onRestoreAccountTertiary([localMnemonicTertiary, localAddressTertiary]);
    }

    if(localMnemonicQuarternary == "" || localMnemonicQuarternary == null){
      // onGenerateAccountQuarternary();
    }else{
      // onRestoreAccountQuarternary([localMnemonicQuarternary, localAddressQuarternary]);
    }

    if(localMnemonicQuinary == "" || localMnemonicQuinary == null){
      // onGenerateAccountQuinary();
    }else{
      // onRestoreAccountQuinary([localMnemonicQuinary, localAddressQuinary]);
    }
    
    let serverAddress = localStorage.getItem('serverAddress');
    let serverPort = localStorage.getItem('serverPort');
    let algodToken = localStorage.getItem('algodToken');
    
    console.log("serverAddress", serverAddress)
    console.log("serverPort", serverPort)
    console.log("algodToken", algodToken)

    if(serverAddress == "" || serverAddress == null){
      
    }else{
      onRestoreServerAddress(serverAddress);
    }

    if(serverPort == "" || serverPort == null){
      
    }else{
      onRestoreServerPort(serverPort);
    }

    if(algodToken == "" || algodToken == null){
      
    }else{
      onRestoreAlgodToken(algodToken);
    }

  });
  

  return (
    <div>
      <LoadingScreen loading={walletPage.loading} />
      <Navigation address={walletPage.address} addressShorten={walletPage.addressShorten} balance={walletPage.balance} onToggleSelectedAccount={onToggleSelectedAccount} onChangeNetwork={onChangeNetwork} dropdownStatus={walletPage.dropdownStatus}  onShowDropdown={onShowDropdown} onHideDropdown={onHideDropdown} addressArray={walletPage.addressArray} addressShortenArray={walletPage.addressShortenArray} mnemonicArray={walletPage.mnemonicArray} balanceArray={walletPage.balanceArray} onSelectAccount={onSelectAccount} />
      <MainnetDisclaimer network={walletPage.network} />
      <CustomNetworkDisclaimer network={walletPage.network} />
      <NavigationSide currentPage={walletPage.currentPage} onSelectPage={onSelectPage} />
      
      <div className={(walletPage.network == "mainnet" || walletPage.network == "custom") ? "page pagePadTop" : "page"}>
        <Switch>
          <Route exact path="/" component={ExplorerPage} />
          <Route exact path="/smart-asset" component={SmartAssetPage} />
          <Route exact path="/asset" component={SmartAssetPage} />
          
          <Route exact path="/tutorials" component={TutorialPage} />
          <Route exact path="/tutorial/create-account" component={TutorialJsCreateAccountPage} />
          <Route exact path="/tutorial/create-asset" component={TutorialJsCreateAssetPage} />
          <Route exact path="/tutorial/limit-order-contract" component={TutorialJsLimitOrderPage} />
          <Route exact path="/tutorial/transfer-asset" component={TutorialJsTransferAssetPage} />
          
          <Route exact path="/tutorial/hash-time-lock" component={TutorialJsHashTimeLockPage} />
          <Route exact path="/tutorial/destroy-asset" component={TutorialJsDestroyAssetPage} />
          <Route exact path="/tutorial/revoke-asset" component={TutorialJsRevokeAssetPage} />
          <Route exact path="/tutorial/opt-in-asset" component={TutorialJsOptInAssetPage} />
          <Route exact path="/tutorial/freeze-asset" component={TutorialJsFreezeAssetPage} />
          <Route exact path="/tutorial/write-transaction-note" component={TutorialJsWriteTransactionNotePage} />
          
          <Route exact path="/wallet" component={WalletPage} />
          <Route exact path="/explorer" component={ExplorerPage} />
          <Route exact path="/transaction" component={TransactionPage} />
          <Route exact path="/settings" component={SettingsPage} />
          
          
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
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
    onRestoreServerAddress: evt => dispatch(changeServerAddress(evt)),
    onRestoreServerPort: evt => dispatch(changeServerPort(evt)),
    onRestoreAlgodToken: evt => dispatch(changeAlgodToken(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);

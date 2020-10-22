/**
 *
 * SettingsPage
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
import { makeSelectSettingsPage, makeSelectPureStake } from './selectors';
import { makeSelectWalletPage } from '../WalletPage/selectors';

import {
  changeServerAddress,
  changeServerPort,
  changeAlgodToken,
  selectPage,
  changeSettings
} from '../WalletPage/actions';


import reducer from '../WalletPage/reducer';
import saga from '../WalletPage/saga';
import messages from './messages';

import SettingsStyle from './SettingsStyle';

import Input from './Input';
// react-toggle
import './style.css';
import Toggle from 'react-toggle';

export function SettingsPage({
  onChangeServerAddress,
  onChangeServerPort,
  onChangeAlgodToken,
  settingsPage,
  walletPage,
  enablePureStake,
  onSelectPage,
  onChangeSettings,
}) {
  useInjectReducer({ key: 'walletPage', reducer });
  useInjectSaga({ key: 'walletPage', saga });

  useEffect(() => {
    onSelectPage("setting");
  });

  return (
    <SettingsStyle>
      <div className="pageName">Settings</div>
      <div className={(walletPage.enablePureStake == true) ? "" : "disabled"}>
        <div className="section">
          <div className="sectionTitle">Server Address:</div>
          <div>
            <Input
              id="serverAddress"
              type="text"
              placeholder="Please input server address"
              value={walletPage.serverAddress}
              onChange={onChangeServerAddress}
            />
          </div>
        </div>
        <div className="section">
          <div className="sectionTitle">Server Port:</div>
          <div>
            <Input
              id="serverPort"
              type="text"
              placeholder="Please input server port"
              value={walletPage.serverPort}
              onChange={onChangeServerPort}
            />
          </div>
        </div>
        <div className="section">
          <div className="sectionTitle">Algod Token:</div>
          <div>
            <Input
              id="algodToken"
              type="text"
              placeholder="Please input algod token"
              value={walletPage.algodToken}
              onChange={onChangeAlgodToken}
            />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="toggle">
          <Toggle
            checked={walletPage.enablePureStake}
            onChange={onChangeSettings}
          />
        </div>
        <div className="toggleText">Use custom settings</div>
        <div className="clear"></div>
      </div>
    </SettingsStyle>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
  walletPage: makeSelectWalletPage(),
  enablePureStake: makeSelectPureStake(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeServerAddress: evt =>
      dispatch(changeServerAddress(evt.target.value)),
    onChangeServerPort: evt => dispatch(changeServerPort(evt.target.value)),
    onChangeAlgodToken: evt => dispatch(changeAlgodToken(evt.target.value)),
    onSelectPage: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectPage(evt));
    },
    onChangeSettings: evt => dispatch(changeSettings(evt.target.value)),
    // onRestoreServerAddress: evt => dispatch(restoreServerAddress(evt)),
    // onRestoreServerPort: evt => dispatch(restoreServerPort(evt)),
    // onRestoreAlgodToken: evt => dispatch(restoreAlgodToken(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);

/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSettingsPage, makeSelectPureStake } from './selectors';

import {
  changeServerAddress,
  changeServerPort,
  changeAlgodToken,
} from './actions';

import reducer from './reducer';
import saga from './saga';
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
  enablePureStake,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

  return (
    <SettingsStyle>
      <div className="pageName">Settings</div>
      <div>
        <div className="sectionTitle">Custom Network Parameters</div>
        <div className="section">
          <div className="sectionTitle">Server Address:</div>
          <div>
            <Input
              id="serverAddress"
              type="text"
              placeholder="Please input server address"
              value={settingsPage.serverAddress}
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
              value={settingsPage.serverPort}
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
              value={settingsPage.algodToken}
              onChange={onChangeAlgodToken}
            />
          </div>
        </div>
        <div className="section">
          <div>
            <Toggle
              defaultChecked={enablePureStake}
              onChange={(editor, value) => {
                console.log('controlled', { value });
              }}
            />
            <span>Use PureStake API</span>
          </div>
        </div>
      </div>
    </SettingsStyle>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
  enablePureStake: makeSelectPureStake(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeServerAddress: evt =>
      dispatch(changeServerAddress(evt.target.value)),
    onChangeServerPort: evt => dispatch(changeServerPort(evt.target.value)),
    onChangeAlgodToken: evt => dispatch(changeAlgodToken(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);

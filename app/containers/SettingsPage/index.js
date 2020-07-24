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
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import SettingsStyle from './SettingsStyle';

export function SettingsPage() {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

  return (
    <SettingsStyle>
      <div className="pageName">
        Settings
      </div>
      <div>
        <div>
          Custom Network Parameters
        </div>
        <div className="section">
          <div>
            Server Address:
          </div>
          <div>
            input
          </div>
        </div>
        <div className="section">
          <div>
            Server Port:
          </div>
          <div>
            input
          </div>
        </div>
        <div className="section">
          <div>
            Algod Token:
          </div>
          <div>
            input
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);

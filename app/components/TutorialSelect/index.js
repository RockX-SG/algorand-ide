/**
 *
 * TutorialSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import './index.css';
// import animate from 'css-animation';

import SelectStyle from './SelectStyle';

function TutorialSelect() {
  function handleClick(info) {
    console.log(`clicked ${info.key}`);
    console.log(info);
  }
  
  return (
    <SelectStyle>
      <Menu onClick={handleClick}>
        <SubMenu title="Select Tutorial">
          <MenuItem>
            <Link to="/tutorial/create-account">
              Create an Account on TestNet using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/create-asset">
              Create an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/limit-order-contract">
              LimitOrder Contract with JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/transfer-asset">
              Transfer an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/hash-time-lock">
              Hash Time Lock Contract Template With JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/destroy-asset">
              Destroy an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/revoke-asset">
              Revoke an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/opt-in-asset">
              Opt-In to an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/freeze-asset">
              Freeze an Asset using JavaScript
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/tutorial/write-transaction-note">
              Read and Write to the Transaction Note Field with JavaScript
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </SelectStyle>
  );
}

TutorialSelect.propTypes = {};

export default TutorialSelect;

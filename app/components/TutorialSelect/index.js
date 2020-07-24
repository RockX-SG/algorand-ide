/**
 *
 * TutorialSelect
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import './index.css';
// import animate from 'css-animation';

function TutorialSelect() {
  function handleClick(info) {
    console.log(`clicked ${info.key}`);
    console.log(info);
  }
  
  return (
    <div>
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
        </SubMenu>
      </Menu>
    </div>
  );
}

TutorialSelect.propTypes = {};

export default TutorialSelect;

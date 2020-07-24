/**
 *
 * RoutePath
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Input from './Input';

let iconRouteArrow = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAaUlEQVRYhe3VMQqDQBAF0EcsPUXA+3gDr+phtk+XMmihZYpokEH4D6bYZv8szO4SEVGsu3j/CW+8Ls75asQHDUNFAz1mLGniNk0sex1dn6mGJzz+OdadlM5BwsuuX/lTzPYZlYVHRPxkBSG+M94FtWAlAAAAAElFTkSuQmCC"/>

let iconTick = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAhklEQVRYhe2UUQqAIBBE3yksuqIdN7JOUx8JiUSo6BqxD/bXmV1nFxRFkWUEbE9xBxzALC0+AIsX34BJxVVcxT8rbrkORi7hkXGFbzAXPlBFHMBwj3AnbYTV/zzHRLPApZhonvY3E2Kr9mRCfM/jhFdJey7hJLpcOLi6XX2JdR5jfCnKvzgB4/dKWeb1iEcAAAAASUVORK5CYII="/>

function RoutePath(props) {
  const {
    onChangeAddress,
    onChangeAmount,
    addressOption,
    walletPage,
    routeSenders
  } = props;
  
  // console.log();
  
  const path = routeSenders.map((address, index) =>
    <div key={index}>
      <div className="routePath">
        <div className="routeSender">
          <div className="routeTitle">
            Sender:
          </div>
          <div className="routeEntry">
            <div className="selectComponent">
              <Select
                onChange={onChangeAddress}
                options={addressOption}
              />
            </div>
          </div>
        </div>
        <div className="routeArrow">
          {iconRouteArrow}
        </div>
        <div className="routeReceiver">
          <div className="routeTitle">
            Receiver:
          </div>
          <div className="routeEntry">
            <div className="selectComponent">
              <CreatableSelect
                isClearable
                onChange={onChangeAddress}
                options={addressOption}
              />
            </div>
          </div>
        </div>
        <div className="routeArrow">
          {iconRouteArrow}
        </div>
        <div className="routeAmount">
          <div className="routeTitle">
            Amount ALGO:
          </div>
          <div className="routeEntry">
            <Input
              id="amount"
              type="text"
              value={walletPage.inputAmount}
              onChange={onChangeAmount}
            />
          </div>
        </div>
        <div className="routeStatus">
          {iconTick}
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
  
  return (
    <div>
      {path}
    </div>
  );
}

RoutePath.propTypes = {};

export default RoutePath;

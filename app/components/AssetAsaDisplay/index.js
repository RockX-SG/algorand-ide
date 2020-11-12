/**
 *
 * AssetAsaDisplay
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Style from './Style';

function AssetAsaDisplay(props) {
  const {
    assetAsaArray
  } = props;
  
  console.log(props)
  
  const assetContent = assetAsaArray.map((asset, index) =>
    <div key={asset.toString()}>
      <div className="asset">
        <div className="assetId">
          {asset["id"]}
        </div>
        <div className="assetName">
          {asset["unitname"]}
        </div>
        <div className="assetTotal">
          {asset["total"]}
        </div>
        <div className="assetUrl">
          {asset["url"]}
        </div>
      </div>
    </div>
  );
  return (
    <Style>
      <div>
        <div className="assetCount">
          Total ASA: {assetAsaArray.length}
        </div>
        <div className="assetWrapper">
          {assetContent}
          <div className="clear"></div>
        </div>
      </div>
    </Style>
  );
}

AssetAsaDisplay.propTypes = {};

export default AssetAsaDisplay;

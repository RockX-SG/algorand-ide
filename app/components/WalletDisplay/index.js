/**
 *
 * WalletDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Popup from "reactjs-popup";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTooltip from "react-tooltip";

import WalletArea from './WalletArea';
import Wallet from './Wallet';
import Input from './Input';

function WalletDisplay(props) {
  const {
    wallet,
    address,
    addressShorten,
    mnemonic,
    balance,
    selectedAccount,
    onSelectAccount,
    onChangeMnemonicRestore,
    mnemonicRestore
  } = props;
  
  console.log(props)

  let iconView = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB8ElEQVRYhe3VzW+MURQG8F+bKglaIzFRW91VWBALBBsf0Y1/hg0bBLXxEf9Aw6LY21hIhOiW1pYE0xFJlUXTNEFfi3vGXO9MPwa7zpPcvLnnfc5zzz3nvOeliy66WO/o6YDbhyMYxSEMY1u8+4q3eInHeIEf/yvIIdzAHIo1rrnw2fkvBw/gDhYz4Ve4hJMR2KZYQziBq3iX8RdxK7Q6wlnMZEKfcWCNvj04jNnMvxaaq2Ij7maOS/G8UuL1SymuR6BjYctxraRRSBkt835jO54H8aeU6unY7y9xx7TWfazEORj2aVwOzQLPUCkfXsWbIMxKNYZvYSs75OVprJk2FypCA07hSxZUtUGsYCoTGclEFsK++S8C2BL2hcw2kvm+RqVXK/LZ0BDdXeLcb+N3r7Qfjmcts7U7DykdjXrP4VjYx8N2ocTvl2o+Y/kmvBi+47E/rjlLprCjHERFapAC33EOp2P/CVuXi74NBqRPtwiN86FZ4KnmBG3BBtzWrOtkJvTACinM0IuHmvNjMtO7KY30VTGKD1obbQKDK/gN4lEbv/c4s5aDcwxIw2a+JFaXemJv3KYP+8JWL3HncV1n5WtBVWqymtabLbc+xsHVNnp/oJPfcS+OSkNqT6xd8a4uDbJpPJEm6lIH2l100cU6xi99k7U9cljKBgAAAABJRU5ErkJggg=="/>

  let iconGenerate = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABgElEQVRYhe2WsU6DUBSGP1tqHFyh1UEHdVEfw6hL7dLH6FDjCzjpizSG1ecwxsGqhNUYd+1iTYrDPQQkhcKFW5b+yc1NOJzz/XC55wIr6csGXMCpy4ALBMBzXSZsgQeAB2zXYcIBxss00QL6wAh4AyYCD8crBpejB/gJYHIYMdAAbmOQMTAEjoA9gYbwTtVwYvAfYAA05Xp8/V+Atgl4D5gJ/CQRM74NW0RrPpgTL9KI1nQM9InWvLng3ixdA12dxJEYGJaAn0uNO51kT5IPSxg4INohhfUtyZslDGxIja+0GxoZyUEJcKj1RbWyDHzIvFvCwI7MnzoGnhJFdHQm84NOche1hXRloQ6sALWlCytP83BQzcieE7sUuI9qapXLIfohcROxU2CKauMXJuBt1AEUdsqwHVuoJ59K7MYEvMP/I3gfOAauYtdnAs/6yLXkxCBpw6fAa7cqMDUB3oFH4F7GbwV1UxX/+DxgyyQsrwkjv2JFTCS34VJNpDWilXLpD09ScbPfHTgIAAAAAElFTkSuQmCC"/>

  let iconRestore = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABs0lEQVRYhe3WPWtUQRTG8V8Ugy9kExQhGhFLQUQLe7+BRBHS+AFE7S0EXb+CpWAnFprOQuwUTEgRbGxialFRLNyQLrgWM5e94tzZm3tvEGEfmOqcOc9/zpnZvUw00X+oS3iED/iJbWziCS7vpfFxPMVwzHqN012bnxFOOcRX9HERPRzGedzD55jzBRfamp7CCwywEwsv42hmzyyex9xPmG9j/sOfrV3G/hp790XwIZ41BSgKvMSCMP9Du9jfwzf8wtkmAIMIsNBkc9T9WOM7XuGG0J2sDuKxUdvnWgCc8/cLeSd0M6kpowu0iSt1iDOawhHMYBEbsfYaDqQ2LJXMj7UwrtJcCeJmKuFNDF5vaNCPK6dr0WM1FSyeXZPT943mnIPoxZxBKljc/JlMgcKkynwcxGwOYC0GF3cBkDLPQWRHcCcGN1Q/v1QH6sTEmh9jzq1UwjTelyCuCjNrC9ATTl6Yr6t4hnCyBFFeTQBSY1nHiSrzQtO4LcxpqwOALawIba88eV21uQNJtfmp7UR1AO6qbu+DvYAaB1Fl3mgETSE6O3mdT6xCK8Jf7Fs87Apgon+u37OkpnYpVrPzAAAAAElFTkSuQmCC"/>

  let iconSelected = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACGklEQVRYhe3XO08WQRQG4EcNJEa8BBNEooWFAo1XgjGxtDMB/B1QWJgYS7wVtiQa4q221BLxEv0LRkAbL5RgognGWIDFnnU/CDu73wcJDW8yxc6857xn5szOnGEbW4wdTfL7MYxLOBIN5qNN4QVmNyvAHIN4jZWa7SXObYZwOyaxHI4X8BBD6MWeaL0YwWP8CO4y7mFXq+IH8S6cLWEce2vYHcBd/AnbZ62ItzeIf8XpFnxcwGdcjO9ujNY1nmwQP9yCeI6dDeIz4XOsyui8LH9LWpv5WjSKz8R3Em+DPL4V4v2K3V5nw7Uinjx7boTBww2KH8KH8DWLnui/jKspw+kwGtqAeNnMT+Kv7JAqxVwYnigZH5XOYyrnx6L/WyqAX0FaL/9jJY7riMNuxaFWGUDHOmNdirzOKfJKec4bsS/Gf6YCyFNwvGR8vSDqiEOfYnVKkW/C4QRn7VLX/c+vBG8qFcD1ID1KkaxeiaqZ53ga3GspUr5MC7KcpdCNj9GqTrj9WJT+w/7jTRBvVhFlK9FVg3c7fE7X4BpUXEZn6hhU4Cx+h8/aVdIDxaFRldsUesLHCiaaMWxT1IDzGGhB/BS+hI/3siKnKXQqruYl3FK9MQXnjmzZV2R7qrNZ8RxtuK8oShdlheeI7I/piNYXfU+sLkonwseGMYBX6pfl02puuGYfJr2Kh8lRqx8m32VX7XN8atLvNrYO/wAFrbazEqrJtAAAAABJRU5ErkJggg=="/>
  
  const walletContent = address.map((address, index) =>
    <div key={address.toString()}>
      <WalletArea>
        <Wallet onClick={() => onSelectAccount(address)}>
          <div className="selected">
            <div className={(selectedAccount == address) ? "" : "hide"} data-tip="Selected Wallet" data-for="wallet">
              {iconSelected}
            </div>
          </div>
          <div className="title">
            <div className="titleIdent">
              Wallet {index + 1}
            </div>
            <div className="titleAddress">
              {address}
            </div>
            <div className="titleAddressShorten">
              {addressShorten[index]}
            </div>
          </div>
          <div className="action">
            <Popup
              trigger={
                <div className="actionEntry actionView" data-tip="View Mnemonic Seed" data-for="wallet">
                  {iconView}
                </div>
              }
              modal
              closeOnDocumentClick
            >
              <div className="popupContent">
                <div className="popupTitle">
                  Please ensure that seed is kept secure. 
                </div>
                <div className="popupDescription">
                  Insecure storage of key may result in loss of funds.
                </div>
                <div>
                  <CopyToClipboard text={mnemonic[index]}>
                    <div className="mnemonic">
                      {mnemonic[index]}
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </Popup>
            <Popup
              trigger={
                <div className="actionEntry actionGenerate" data-tip="Regenerate Seed" data-for="wallet">
                  {iconGenerate}
                </div>
              }
              modal
              closeOnDocumentClick
            >
              <div className="popupContent">
                <div className="popupTitle">
                  We'll help you regenerate your mnemonic seed & address
                </div>
                <div className="popupDescription">
                  This action is irreversible. Are you sure you wish to continue?
                </div>
                <div>
                  <div className="popupContentLeft">
                    <button className="error">
                      Cancel
                    </button>
                  </div>
                  <div className="popupContentRight">
                    <button>
                      Regenerate Account
                    </button>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </Popup>
            <Popup
              trigger={
                <div className="actionEntry actionRestore" data-tip="Restore Seed" data-for="wallet">
                  {iconRestore}
                </div>
              }
              modal
              closeOnDocumentClick
            >
              <div className="popupContent">
                <div className="popupTitle">
                  Please enter your mnemonic seed to restore address 
                </div>
                <div className="popupDescription">
                  * This action is irreversible & will overwrite the current address.
                </div>
                <div>
                  <Input
                    id="mnemonic"
                    type="text"
                    placeholder="Please enter your mnemonic seed"
                    value={mnemonicRestore}
                    onChange={onChangeMnemonicRestore}
                  />
                </div>
                <div>
                  <div className="popupContentLeft">
                    <button className="error">
                      Cancel
                    </button>
                  </div>
                  <div className="popupContentRight">
                    <button>
                      Restore Account
                    </button>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </Popup>
            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </Wallet>
      </WalletArea>
    </div>
  );
  
  return (
    <div>
      <ReactTooltip id="wallet" place="bottom" type="dark" effect="float"/>
      {walletContent}
    </div>
  );
}

WalletDisplay.propTypes = {
  address: PropTypes.array
};

export default WalletDisplay;

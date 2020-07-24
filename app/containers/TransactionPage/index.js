/**
 *
 * TransactionPage
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
import makeSelectTransactionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  addRoute
} from './actions';

import {
  sendTransaction,
  changeAddress,
  changeAmount,
  recaptchaChange
} from '../WalletPage/actions';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ReactTooltip from "react-tooltip";

import {
  makeSelectWalletPage,
} from '../WalletPage/selectors';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import Input from './Input';
import Transaction from './Transaction';

import RoutePath from '../../components/RoutePath';
import RouteSign from '../../components/RouteSign';

import SendAlgoForm from './SendAlgoForm';

let iconInfo = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIid2UTQ6CMBSEv2jgehJQuZKIxyCu9R66lqi49AK4Fhe0hpCWPn5WTDJJ8zKdafvawtzhAzFwBHLgo5ir2lZpBiECCqBy8AmEfYyXwEFg3GYKLCQBQ8w1E5d5NMJcM7CZ+9Tn2TVZo0vzwtL4WLA6SUAFbLSw2RTr1gzGLqxMxbtgZVLmpoBSMLG9ExtLLRTd2wH4mgLeEwb8vZoB1wkDLqaA04QBZ1PRAx6Mb3JBxw8bOiZLaHwDTaQjzHcuc6j7sh9gntDz2ge4e1IpjfNYbPCoP64MuFG/0FKNM2CtNDPGD2oP1wWSIKFFAAAAAElFTkSuQmCC"/>

let iconAdd = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB8ElEQVRYhe2XzS5DURDHf6RsNMq2lJWUWPhoPYF0WzyTj60QS+IRSKwoEg/BQixoG1YkiHZVtZg5uTfNdTv3anXTf3IyN+f85yNzJjPnQh89xkBEfhZYBwrABJDR/QpQBUrAKXDfqQAd8sAV0DSuSyDXCcdDwAHwrYZfgUOgiGRjRFcWWAOOlNNUnX0gEdf5OHCtxr6ATWDUoDcKbAE1vGyMRXU+hJfyKnIFUbEAPKqNG2A4ivKBKpaBdAznDmmkQJvAnlUpj9zfF7D0B+cOy8h1NPS7LVzqNw1cV/XtsK28UjtiFq/aLQVnDSAFvCl3xn8w2ELcUHkCfBgMW/GONCiQRvZrAKsqzzro3MHZLIQFMK3ytgsB3KmcCiN9IveUDDiztuHf6iKp+5/+zdYMWAoqLpyv77AAXlQGNZ+BgGU5c3A2n8MCKKucCzDwVzibZf9mawCuURS7EMCayosw0r83oiBcKnGrgwHsKO/cwCWHVGoN4/BogzxQR4bRolVpH4m4grz94mICbxzvRlFM4F1FFViJ4XwReMKbgpGfZmO+IGrISE0Z9FLInddV94IYTzKHBPKSaaixN+AYmWizSHtN6veGnrlqbyBpj/0o9WMemWbWOVDCWMBRf0xm8H5MMsCk7ld0uR+Th4h2++gdfgA+Fpm3vsNCRAAAAABJRU5ErkJggg=="/>

export function TransactionPage({
  onSendTransaction,
  onChangeAddress,
  onChangeAmount,
  walletPage,
  transactionPage,
  onConfirmAtomic,
  onAddRoute,
  onRecaptchaChange
}) {
  useInjectReducer({ key: 'transactionPage', reducer });
  useInjectSaga({ key: 'transactionPage', saga });
  
  
  
  let addressOption = [];
  
  addressOption = walletPage.addressArray.map(populateOptions);
  
  function populateOptions(addr) {
    // if(walletPage.address !== addr){
      return {value: addr, label: addr};
    // }else{
    //   return {};
    // }
  }
  
  console.log("addressOption", addressOption)

  return (
    <Transaction>
      <div className="pageName">
        Transaction Creator
      </div>
      <Tabs>
        <TabList>
          <Tab>Send ALGO</Tab>
          <Tab>Transfer ASA</Tab>
          <Tab>Atomic Transfer</Tab>
        </TabList>

        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
            
          <SendAlgoForm onSubmit={onSendTransaction} walletPage={walletPage} address={walletPage.address} balance={walletPage.balance} addressOption={addressOption} onChangeAddress={onChangeAddress} onChangeAmount={onChangeAmount} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} />
          
          <div className="assetResponse">
            <div className={(walletPage.userSendTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+walletPage.userSendTxHash} target="_blank">
                    {walletPage.userSendTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
          <form>
            <div className="sectionGroup">
              <div className="section">
                <div className="sectionTitle">
                  Asset Id:
                </div>
                <div>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="Please input sending amount"
                    value={walletPage.inputAmount}
                    onChange={onChangeAmount}
                  />
                </div>
              </div>
            </div>
            <div className="sectionGroup">
              <div className="section">
                <div className="sectionTitle">
                  <span>
                    Sending Address: 
                  </span>
                  <span className="info" data-tip="Toggle address at the top right menu to change selected address" data-for="transaction" >
                    {iconInfo}
                  </span>
                </div>
                <div>
                  {walletPage.address}
                </div>
              </div>
              <div className="section">
                <div className="sectionTitle">
                  Available Asset: 
                </div>
                <div>
                
                </div>
              </div>
            </div>
            <div className="sectionGroup">
              <div className="section">
                <div className="sectionTitle">
                  Destination Address:
                </div>
                <div className="selectComponent">
                  <CreatableSelect
                    isClearable
                    onChange={onChangeAddress}
                    defaultValue={addressOption[0]}
                    options={addressOption}
                  />
                </div>
              </div>
            </div>
            <div className="sectionGroup">
              <div className="section">
                <div className="sectionTitle">
                  Amount of Asset to send:
                </div>
                <div>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="Please input sending amount"
                    value={walletPage.inputAmount}
                    onChange={onChangeAmount}
                  />
                </div>
              </div>
            </div>
            <div className="section">
              <button>
                Send
              </button>
            </div>

            <div>
              <a href={"https://testnet.algoexplorer.io/tx/" + walletPage.userSendTxHash} target="_blank">
                {walletPage.userSendTxHash}
              </a>
            </div>
          </form>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
          <form>
            <div className="sectionGroup">
              <div className="section">
                <div className="sectionTitle">
                  <div className="sectionTitleSend">
                    Create Transaction Routes:
                  </div>
                  <div className="info sectionTitleSendInfo" data-tip="Sending Address is limited to available wallets during to transaction signing limitation" data-for="transaction">
                    {iconInfo}
                  </div>
                  <div className={(transactionPage.routeSenders.length == 10) ? "hide" : ""}>
                    <div className="addRoute" data-tip="Add more route" data-for="transaction" onClick={() => onAddRoute()}>
                      {iconAdd}
                    </div>
                  </div>
                  <div className="clear"></div>
                </div>
                <div className="route">
                  <RoutePath routeSenders={transactionPage.routeSenders} onChangeAddress={onChangeAddress} onChangeAmount={onChangeAmount} addressOption={addressOption} walletPage={walletPage} />
                </div>
                <div>
                  <button onClick={() => onConfirmAtomic()}>
                    Confirm Atomic Transfer
                  </button>
                </div>
              </div>
            </div>
            <div className={(transactionPage.atomicStep == 2) ? "sectionGroup" : "sectionGroup"}>
              <div className="section">
                <div className="sectionTitle">
                  Transaction Routes Group Id:
                </div>
                <div className="routeId">
                  -
                </div>
              </div>
              <div className="section">
                <div className="sectionTitle">
                  Sign Transactions:
                </div>
                <RouteSign walletPage={walletPage} />
              </div>
              <div>
                <button>
                  Send 
                </button>
              </div>
            </div>

            <div>
              <a href={"https://testnet.algoexplorer.io/tx/" + walletPage.userSendTxHash} target="_blank">
                {walletPage.userSendTxHash}
              </a>
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </Transaction>
  );
}

TransactionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionPage: makeSelectTransactionPage(),
  walletPage: makeSelectWalletPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAddress: evt => dispatch(changeAddress(evt.value)),
    onChangeAmount: evt => dispatch(changeAmount(evt.target.value)),
    onSendTransaction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction(evt));
    },
    onConfirmAtomic: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction(evt));
    },
    onAddRoute: evt => dispatch(addRoute()),
    onRecaptchaChange: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(recaptchaChange(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionPage);

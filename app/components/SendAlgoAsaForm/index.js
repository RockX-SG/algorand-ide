/**
 *
 * SendAlgoAsaForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Field, reduxForm } from 'redux-form';

import CreatableSelect from 'react-select/creatable';

import Captcha from '../../components/Captcha';

const recaptchaRef = React.createRef();

import Input from './Input';

let iconInfo = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIid2UTQ6CMBSEv2jgehJQuZKIxyCu9R66lqi49AK4Fhe0hpCWPn5WTDJJ8zKdafvawtzhAzFwBHLgo5ir2lZpBiECCqBy8AmEfYyXwEFg3GYKLCQBQ8w1E5d5NMJcM7CZ+9Tn2TVZo0vzwtL4WLA6SUAFbLSw2RTr1gzGLqxMxbtgZVLmpoBSMLG9ExtLLRTd2wH4mgLeEwb8vZoB1wkDLqaA04QBZ1PRAx6Mb3JBxw8bOiZLaHwDTaQjzHcuc6j7sh9gntDz2ge4e1IpjfNYbPCoP64MuFG/0FKNM2CtNDPGD2oP1wWSIKFFAAAAAElFTkSuQmCC"/>

function SendAlgoAsaForm(props) {
  const { 
    handleSubmit, 
    pristine, 
    reset, 
    submitting, 
    walletPage,
    transactionPage,
    address,
    addressOption,
    onRecaptchaChange,
    captchaData,
    onChangeAddress,
    onChangeSendAsaAmount,
    onChangeAssetId,
    onConfirmAssetId,
    onSendAsaTransaction,
    groupedOptions,
    formatGroupLabel,
  } = props;
  
  
  return (
    <div>
      <div className="sectionStep">
        Step 1
      </div>
      <div className={(transactionPage.sendAsaStep == 1) ? "sectionStepContent" : "sectionStepContent disabled"}>
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
                value={transactionPage.inputAssetId}
                onChange={onChangeAssetId}
              />
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => onConfirmAssetId()}>
            Select Asset
          </button>
        </div>
      </div>
      <div className="sectionStep">
        Step 2
      </div>
      <div>
        <div className={(transactionPage.sendAsaStep == 2) ? "sectionStepContent" : "sectionStepContent disabled"}>
          <div className="sectionGroup">
            <div className="section">
              <div className="sectionTitle">
                <div className="sectionTitleSend">
                  Sending Address: 
                </div>
                <div className="info sectionTitleSendInfo" data-tip="Toggle address at the top right menu to change selected address" data-for="transaction">
                  {iconInfo}
                </div>
                <div className="clear"></div>
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
                {transactionPage.assetBalance}
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
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                />
              </div>
              <div className="sectionDisclaimer">
                * Destination Address is required to opt-in to receiving desired asset. Otherwise sending of ASA would fail
              </div>
            </div>
          </div>
          <div className="sectionGroup">
            <div className="section">
              <div className="sectionTitle">
                Amount of asset to send:
              </div>
              <div>
                <Input
                  id="amount"
                  type="text"
                  placeholder="Please input sending amount"
                  value={transactionPage.inputSendAsaAmount}
                  onChange={onChangeSendAsaAmount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          {transactionPage.assetError}
        </div>
        <div className="section">
          <div className="hide">
            <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
          </div>
          <button onClick={() => onSendAsaTransaction()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
// <div>
//   <Field name='captcharesponse' recaptchaRef={recaptchaRef} component={Captcha}/>
// </div>

// export default reduxForm({
//   form: 'sendAlgoAsa', // a unique identifier for this form
// })(SendAlgoAsaForm);

SendAlgoAsaForm.propTypes = {
};

export default SendAlgoAsaForm;


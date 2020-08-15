/**
 *
 * OptInAsaForm
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

function OptInAsaForm(props) {
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
    onConfirmAssetId
  } = props;
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="sectionStepContent">
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
        </div>
        <div className="section">
          <div>
            <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
          </div>
          <button>
            Opt In
          </button>
        </div>
      </form>
    </div>
  );
};
// <div>
//   <Field name='captcharesponse' recaptchaRef={recaptchaRef} component={Captcha}/>
// </div>

// export default reduxForm({
//   form: 'optInAsa', // a unique identifier for this form
// })(OptInAsaForm);

OptInAsaForm.propTypes = {
};

export default OptInAsaForm;


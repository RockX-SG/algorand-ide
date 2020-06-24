/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import Section from './Section';

export default function HomePage() {
  return (
    <h1>


      <div>
        <Section>
          <Link to="/smart-contract">
            <FormattedMessage {...messages.smartContract} />
          </Link>
        </Section>
        <Section>
          <Link to="/smart-asset">
            <FormattedMessage {...messages.smartAsset} />
          </Link>
        </Section>
        <Section>
          <Link to="/tutorials">
            <FormattedMessage {...messages.tutorial} />
          </Link>
        </Section>
        <Section>
          <Link to="/wallet">
            <FormattedMessage {...messages.wallet} />
          </Link>
        </Section>
        <div className="clear"></div>
      </div>
    </h1>
  );
}

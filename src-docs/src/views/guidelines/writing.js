import React from 'react';
import classNames from 'classnames';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  WuiText,
  WuiTitle,
  WuiButton,
  WuiSpacer,
  WuiFlexGrid,
  WuiFlexGroup,
  WuiFlexItem,
  WuiPanel,
  WuiFieldSearch,
  WuiFieldText,
  WuiButtonEmpty,
  WuiFieldPassword,
  WuiCheckbox,
  WuiFormRow,
  WuiIcon,
  WuiFieldNumber,
  WuiLink,
  WuiTabs,
  WuiTab,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const GuideRuleWriting = ({ children, className, ...rest }) => {
  const classes = classNames(className);

  return (
    <WuiText className={classes} {...rest}>
      <p>{children}</p>
    </WuiText>
  );
};

export default () => (
  <GuidePage title="Writing guidelines">
    <WuiText grow={false} className="guideSection__text">
      <p>
        You can have the most beautiful UI, but without{' '}
        <b>consistent, easy-to-understand text</b>, you haven’t built the best
        user experience.
      </p>
    </WuiText>

    <GuideRuleTitle>Principles</GuideRuleTitle>

    <WuiSpacer size="xxl" />

    <WuiFlexGrid columns={3}>
      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Clear and concise</h3>
            <p>
              Get straight to the point&mdash;in a way that your users
              understand. Make every word contribute to meaning.
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Consistent</h3>
            <p>
              Use the same terminology to mean the same thing. Make sure
              spelling, capitalization, punctuation, labels, and use of
              abbreviations are all consistent.
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Conversational</h3>
            <p>
              Write as a professional in the field would talk&mdash;not as a
              professor lecturing students. Use words that the user would use.
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    </WuiFlexGrid>

    <GuideRuleTitle>Capitalization</GuideRuleTitle>
    <GuideRule
      heading="Sentence case for almost all text"
      description="This includes buttons, menus, and titles. In sentence case, only the
    first word and proper names are capped.">
      <GuideRuleExample
        type="do"
        text="Do. Sentence case makes titles easier to read.">
        <WuiTitle>
          <span>Create index patterns</span>
        </WuiTitle>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Title case can feel more cluttered.">
        <WuiTitle>
          <span>Create Index Patterns</span>
        </WuiTitle>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text="Do. Sentence case is friendlier in button labels.">
        <WuiButton>Set up index pattern</WuiButton>
      </GuideRuleExample>
      <GuideRuleExample type="dont" text="Don't. Title case looks too formal.">
        <WuiButton>Set Up Index Pattern</WuiButton>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Title case for feature titles"
      description="Titles and tabs for specific features should capitalize all words in the name of the feature.">
      <GuideRuleExample
        type="do"
        text="Do. Title case in tabs and titles for names of features.">
        <WuiTabs>
          <WuiTab>Inventory</WuiTab>
          <WuiTab isSelected>Metrics Explorer</WuiTab>
        </WuiTabs>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Features are proper names, not sentences.">
        <WuiTabs>
          <WuiTab>Inventory</WuiTab>
          <WuiTab isSelected>Metrics explorer</WuiTab>
        </WuiTabs>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Writing style</GuideRuleTitle>

    <GuideRule
      heading="Write in active voice"
      description="Active voice puts the focus on who or what is performing the
      action and makes the sentence easier to understand.">
      <GuideRuleExample
        type="do"
        text="Do. Writing in active voice puts the subject first.">
        <GuideRuleWriting>The Wazuh Query DSL builds filters.</GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. With passive voice, it's harder to tell who's doing what.">
        <GuideRuleWriting>
          Filters are built using the Wazuh Query DSL.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Keep it short and snappy"
      description="Identify the most important information and say it concisely.
      Don't repeat what's already been said or state the obvious.
      Omit common introductory phrases.">
      <GuideRuleExample type="do" text="Do. Keep it short.">
        <WuiText>
          <h4>Edit saved objects</h4>
        </WuiText>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Repeat what's already been said or state the obvious.">
        <WuiText>
          <h4>Edit saved objects</h4>
          <p>
            From here, you can edit saved objects. To get started, follow these
            steps.
          </p>
        </WuiText>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample type="do" text="Do. Get straight to the point.">
        <GuideRuleWriting>
          Configure at least one index pattern.
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Use unnecessary introductory phrases.">
        <GuideRuleWriting>
          In order to use Wazuh, you must configure at least one index pattern.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text="Do. Ensure all words contribute to meaning.">
        <GuideRuleWriting>
          No active shard records for this cluster.
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text='Don&apos;t. Start a sentence with "There are" or "There is."'>
        <GuideRuleWriting>
          There are currently no active shard records for this cluster.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Addressing the user</GuideRuleTitle>

    <GuideRule
      heading='In most cases, address users as "you"'
      description="It's friendly and engages the user directly.">
      <GuideRuleExample
        type="do"
        text='Do. Converse directly with the user using "you" and "your."'>
        <GuideRuleWriting>
          You must configure TLS to apply a Platinum license.
        </GuideRuleWriting>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text='Don&apos;t. Avoid the user. It creates awkward phrasing such as "will be required."'>
        <GuideRuleWriting>
          Configuring TLS will be required to apply a Platinum license.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading='In some cases, "we" and "our" are appropriate'
      description="The use of &quot;we&quot; is appropriate for situations
      where you're taking an action for the user or making a suggestion.
      It's best reserved for onboarding and empty states.">
      <GuideRuleExample
        type="do"
        text='Do. Use "we" when taking an action on behalf of the user.'>
        <GuideRuleWriting>
          We noticed that you don&apos;t have any data in your cluster. Try our
          sample data and dashboards or jump in with your own data.
        </GuideRuleWriting>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text='Don&apos;t. Overuse "us." It can become annoying.'>
        <GuideRuleWriting>Let&apos;s create a database</GuideRuleWriting>
        <GuideRuleWriting>Let&apos;s create a visualization</GuideRuleWriting>
        <GuideRuleWriting>...</GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading='Less common are "I" and "my"'
      description="Use first person when you want to give the user ownership of an action.">
      <GuideRuleExample
        type="do"
        text='Do. Use "my" in buttons and links to give users ownership.'>
        <GuideRuleWriting>Explore on my own</GuideRuleWriting>
      </GuideRuleExample>

      <GuideRuleExample type="do" text='Do. Use "I" in agreement statements.'>
        <GuideRuleWriting>
          I agree to follow the terms of service
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Punctuation</GuideRuleTitle>

    <GuideRule
      heading="Don't use unneccessary punctuation"
      description="Although punctuation can help clarify meaning, it can also
      clutter the UI. Don't add a colon after a label, an ellipsis (...)
      at the end of an action, an (s) at the end of a noun, or add parentheses
      (()).">
      <GuideRuleExample type="do" text='Do. Use an "s" or "es" to show plural.'>
        <WuiFormRow
          label="Airports"
          helpText="Separate multiple names with a comma">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Use (s), a colon after labels, or parenthetical statements.">
        <WuiFormRow
          label="Airport(s):"
          helpText="Separate multiple names with a comma (other characters are unsupported).">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text="Do. Remove the ellipsis from Search fields.">
        <WuiFieldSearch defaultValue="Search" aria-label="Search example" />
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="Do. Use an ellipsis for truncated text or situations that require waiting.">
        <WuiFieldSearch
          defaultValue="Loading..."
          aria-label="Search loading example"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Know when to use the ending period"
      description="Use periods at the end of help text and complete sentences 
      in body text. These are typically supplemental explanations and
      instructions. Avoid periods in titles and headings.">
      <GuideRuleExample
        type="do"
        text="Do. Use periods at the end of help text.">
        <WuiFormRow
          label="Number"
          helpText={
            <span>
              Accepts 1–5. <WuiLink>Learn more.</WuiLink>
            </span>
          }>
          <WuiFieldNumber min={1} max={5} step={1} />
        </WuiFormRow>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Use a lead-in sentence without an ending period. It looks wrong.">
        <WuiTitle>
          <span>Index management</span>
        </WuiTitle>
        <WuiText>Update your Wazuh indices individually or in bulk</WuiText>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Use contractions"
      description='Use contractions if they make your text flow more naturally,
      such as "didn&apos;t" instead of  "did not" and
      "can&apos;t" instead of "cannot."'>
      <GuideRuleExample
        type="do"
        text="Do. Use contractions if they make the text easier to read.">
        <GuideRuleWriting>
          Didn&apos;t find what you were looking for?
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Without the contraction, this text sounds stilted.">
        <GuideRuleWriting>
          Did not find what you were looking for?
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Limit the use of exclamation points"
      description="Showing excitement is best reserved for greetings and
      encouraging messages. Don't use more than one exclamation point per page.">
      <GuideRuleExample
        type="do"
        text="Do. Use exclamations for encouragement, but use sparingly.">
        <GuideRuleWriting>
          This dashboard is empty. Fill it up!
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Use exclamation points in error messages.">
        <GuideRuleWriting>Couldn&apos;t find any Wazuh data!</GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Messages</GuideRuleTitle>

    <GuideRule
      heading="Summarize the message in the title"
      description="Don't start with the words error, warning, and confirm, or
      jargon such as oops and uh-oh. A title-only message is ok.">
      <GuideRuleExample
        type="do"
        text="Do. Provide a title that is meaningful to the user.">
        <WuiTitle size="xs">
          <span>This dashboard is empty</span>
        </WuiTitle>
        <WuiSpacer />
        <WuiText>
          <p>
            To add a visualization, click Add in the menu bar. No visualizations
            yet? Go to Visualize to create one.
          </p>
        </WuiText>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Use uh-oh, oops, or other meaningless text in the title.">
        <WuiTitle size="xs">
          <span>Uh-oh!</span>
        </WuiTitle>
        <WuiSpacer />
        <WuiText>
          <p>
            This dashboard is empty. To add a visualization, click Add in the
            menu bar. No visualizations yet? Go to the Visualize app to create
            one.
          </p>
        </WuiText>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Include critical information first"
      description="Tell the user the most important information first, and less critical information second.">
      <GuideRuleExample
        type="do"
        text="Do. Prioritize the contents of the message.">
        <GuideRuleWriting>
          You need to increase your subscription limit. Please contact support.
        </GuideRuleWriting>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Hide important information at the end.">
        <GuideRuleWriting>
          Contact support because you need to increase your subscription limit.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text="Do. State what went wrong, followed by a clear course of action.">
        <GuideRuleWriting>
          No data sources. Go to Management to define an index pattern.
        </GuideRuleWriting>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Leave the user guessing about next steps.">
        <GuideRuleWriting>Oops, no data sources.</GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading='Avoid using "Are you sure"'
      description="Your text is more direct without it.">
      <GuideRuleExample
        type="do"
        text="Do. Keep titles as concise as possible."
        panel={false}>
        <WuiPanel>
          <WuiTitle size="m">
            <span>Delete this report?</span>
          </WuiTitle>
          <WuiSpacer />
          <WuiFlexGroup justifyContent="flexEnd" gutterSize="none">
            <WuiButtonEmpty color="text" size="s">
              Cancel
            </WuiButtonEmpty>
            <WuiButton color="danger" size="s">
              Delete
            </WuiButton>
          </WuiFlexGroup>
        </WuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Pad the title with empty words&mdash;it increases reading time."
        panel={false}>
        <WuiPanel>
          <WuiTitle size="m">
            <span>Are you sure you want to delete this report?</span>
          </WuiTitle>
          <WuiSpacer />
          <WuiFlexGroup justifyContent="flexEnd" gutterSize="none">
            <WuiButtonEmpty color="text" size="s">
              Cancel
            </WuiButtonEmpty>
            <WuiButton color="danger" size="s">
              Delete report
            </WuiButton>
          </WuiFlexGroup>
        </WuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading='Avoid using "please"'
      description='In most cases, "please" is unnecessary.
      Exceptions are situations where the user must wait or do something inconvenient.
      Or, if the text sounds too abrupt without it.'>
      <GuideRuleExample
        type="do"
        text='Do. Omit "please" in longer instructions.'>
        <GuideRuleWriting>
          Save your work before generating a report.
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text='Don&apos;t. Use "please" when a pleasantry is not needed.'>
        <GuideRuleWriting>
          Please save your work before generating a report.
        </GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text='Do. Use "please" only when it feels natural and makes short text less abrupt.'>
        <GuideRuleWriting>
          Your session has expired. Please log in again.
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="do"
        text='Do. Use "please" when asking the user to wait. '>
        <GuideRuleWriting>Please wait.</GuideRuleWriting>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Use 1 to 2 simple, short sentences"
      description="Don&rsquo;t force the user to read long blocks of text. Write for scanning. Link to documentation.">
      <GuideRuleExample type="do" text="Do. Write for scanning.">
        <WuiFormRow
          label="Password"
          helpText="Must be least 8 characters and include upper and lower case letters, numbers, and symbols such as !@#$%.">
          <WuiFieldPassword />
        </WuiFormRow>
      </GuideRuleExample>

      <GuideRuleExample type="dont" text="Don't. Write long blocks of text.">
        <WuiFormRow
          label="Password"
          helpText="Passwords must be at least 8 characters long. Good passwords
          contain either a combination of upper and lowercase letters or a
          combination of letters with one digit. Strong passwords contain either
          a combination of letters and more than one digit or special characters.">
          <WuiFieldPassword />
        </WuiFormRow>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Avoid the urge to explain everything"
      description="Not every task requires an explanation nor does every field require placeholder text.">
      <GuideRuleExample
        type="do"
        text="Do.  Explain new or difficult concepts.">
        <WuiFormRow
          label="Index template"
          helpText="A template defines the settings, mappings, and aliases to apply when you create an index.">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. Provide explanations for common actions.">
        <WuiFormRow label="Email" helpText="Please enter your email address.">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Labels</GuideRuleTitle>

    <GuideRule
      heading="Convey the purpose of the component"
      description="Avoid long labels, but don't sacrifice clarity. If needed,
      put additional information in help text and tooltips.">
      <GuideRuleExample
        type="do"
        text="Do. Use labels that say what the component does.">
        <WuiFormRow>
          <WuiCheckbox
            onChange={() => {}}
            id={htmlIdGenerator()()}
            label="Combine values in other bucket"
          />
        </WuiFormRow>
        <WuiFormRow label="Bucket label">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>
      <GuideRuleExample type="dont" text="Don't. Use generic labels.">
        <WuiFormRow>
          <WuiCheckbox
            onChange={() => {}}
            id={htmlIdGenerator()()}
            label="Combine other"
          />
        </WuiFormRow>
        <WuiFormRow label="Bucket label">
          <WuiFieldText />
        </WuiFormRow>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Label buttons with their action"
      description="Don't use Yes or OK when you can use a verb phrase instead.">
      <GuideRuleExample
        type="do"
        text="Do. Use a verb + noun for a button label."
        panel={false}>
        <WuiPanel>
          <WuiTitle size="m">
            <span>Remove this index pattern?</span>
          </WuiTitle>
          <WuiSpacer />
          <WuiFlexGroup justifyContent="flexEnd" gutterSize="none">
            <WuiButtonEmpty color="text" size="s">
              Cancel
            </WuiButtonEmpty>
            <WuiButton color="danger" size="s">
              Remove pattern
            </WuiButton>
          </WuiFlexGroup>
        </WuiPanel>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Use vague labels, such as Yes and OK."
        panel={false}>
        <WuiPanel>
          <WuiTitle size="m">
            <span>Remove this index pattern?</span>
          </WuiTitle>
          <WuiSpacer />
          <WuiFlexGroup justifyContent="flexEnd" gutterSize="none">
            <WuiButtonEmpty color="text" size="s">
              Cancel
            </WuiButtonEmpty>
            <WuiButton color="danger" size="s">
              Ok
            </WuiButton>
          </WuiFlexGroup>
        </WuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Be careful with humor</GuideRuleTitle>
    <WuiText grow={false} className="guideSection__text">
      <p>
        Your text can be fun as long as it fits the experience&mdash;and
        doesn&apos;t get in the user&apos;s way. Clever text can become annoying
        when used for frequently performed tasks. Situations where the user
        might lose data or otherwise be frustrated are also not appropriate for
        humor.
      </p>
    </WuiText>
    <GuideRule heading="" description="">
      <GuideRuleExample
        type="do"
        text="Do. Make it fun only if it fits the experience.">
        <GuideRuleWriting>
          Odd, exciting, and scary trends and anomalies in your Wazuh data
        </GuideRuleWriting>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Be clever with a serious message.">
        <WuiTitle size="xs">
          <span>
            <WuiIcon type="faceSad" /> No results found
          </span>
        </WuiTitle>
        <WuiSpacer />
        <WuiText>
          <p>
            Unfortunately, I could not find any results matching your search. I
            tried really hard. I looked all over the place and frankly, I just
            couldn&apos;t find anything good. Help me, help you.
          </p>
        </WuiText>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Verifying your text</GuideRuleTitle>

    <WuiSpacer size="xxl" />

    <WuiFlexGrid columns={3}>
      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Work with a writer</h3>
            <p>
              A writer can help determine where you need text and what it should
              say.
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Read your text out loud</h3>
            <p>
              Word flow has a natural feel to it. Read your text out loud, make
              changes, and then repeat until the flow of your text feels
              natural.
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiPanel paddingSize="l">
          <WuiText className="guideSection__text">
            <h3>Use spell check</h3>
            <p>Run your text through a spelling and grammar checker.</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    </WuiFlexGrid>
  </GuidePage>
);

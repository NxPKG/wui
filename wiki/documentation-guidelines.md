# Documentation guidelines

Always remember to update [documentation site][docs] via the `src-docs` folder and the `CHANGELOG.md` in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no differently than how you would treat tests.

The complexity of the component should determine how many examples you need to create, and how complex they should be. In general, your examples should demonstrate:

* The most common use-cases for the component.
* How the component handles edge cases, e.g. overflowing content, text-based vs. element-based content.
* The various states of the component, e.g. disabled, selected, empty of content, error state.

## Writing docs

Here are our formatting guidelines for writing documentation:

- Use sentence case, always, for page and section titles. Example: `This component does something`
- When referencing the component name, wrap it in `<strong>` tags. Example: `<strong>WuiComponent</strong>`
- When referencing the component name, always include the `Wui` prefix unless you are referencing the generic term. Example: `WuiFlyout` vs `flyout`
- Wrap references to prop names and elements in `<WuiCode>` blocks. Example: `<WuiCode>propName</WuiCode>`
- If the code reference is more than a single prop name or value, add the language type. Example: `<WuiCode language="js">propName=true</WuiCode>`
- When referencing another WUI component, wrap the reference in a link to the component. Example: `<Link to="/component/url><strong>WuiComponent</strong><Link>`

## Linking between WUI doc pages/components

In instances where you would like to provide a link to another WUI component
referenced in a given component description or example, take advantage of `react-router`,
which is used for routing in WUI docs. Aside from the benefit of shorter path names, `react-router` will take the environment into account and provide the correct URL for both development and production locations.

### Basic example:

```js
import {
  Link,
} from 'react-router-dom';

// ...

Consult the larger <Link to="/guidelines/colors">color guidelines</Link> page
for a better explanation about passing color contrast.
```

### Linking to external resources

When referring to external sites or resources, use WUI components that take an `href` prop, such as `WuiLink`.

#### Basic example:

```js
import {
  WuiLink,
} from '/src/components';

// ...

<WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/mixins/_shadow.scss">View the Sass code for shadow mixins</WuiLink>.
```

## Adding snippets

There are a couple themes to keep in mind when adding snippets:

### Ask yourself
- Does this snippet provide the consumer with everything it needs for the component to work?
- Does this snippet provide the details of a specific object the component needs to work?
- If it doesn't provide either and the whole demo JS is needed for the component to work, then it's probably best to not add a snippet.

### Stay consistent
- Don't use `this.`, but write the snippet like a **Function Component**.
- Use descriptive JS variables in place of **consumer generated** strings, functions, states and node prop types.
- All other props, like enums, should be written with proper value types.

``` js
<WuiPopover
  id={popoverId}
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft"
>
  <!-- Popover content -->
</WuiPopover>
```

- If the demo code provides lots of examples, this is probably mostly for us maintainers to manage all the different states. However, **the consumer really just needs a single basic snippet**. In some cases, you can add a second one with the **most commonly used props**. The basic example should always come first.

```js
<WuiLink href="#"><!-- Link text --></WuiLink>
```

```js
<WuiLink href="#" color="secondary">
  <!-- Colored link text -->
</WuiLink>
```


- Use HTML comments to suggest what the `children` might be.

``` js
<WuiText color="danger"><!-- Raw HTML content --></WuiText>
```

- The snippet should illustrate when a component requires its children to be wrapped with a specific tag.

``` js
<WuiCallOut>
  <p><!-- Content --></p>
</WuiCallOut>
```

- When a component contains a single element child the snippet should illustrate it. Enforce best practices by providing a description.

``` js
<WuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
</WuiTitle>
```

- When a prop receives an array of objects, display only one object and show all the required keys.

``` js
<WuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>
```

## Changelog

Any updates to the `src/` folder require an entry in the [CHANGELOG.md](../CHANGELOG.md) file. Documentation-only changes do not. Here are our guidelines for updating the file:

* Append your changes to the `master` sub-heading of `CHANGELOG.md`.
* Add a list item for each significant change in the PR: bugs that were fixed, new features, new components, or changes to the public API
* In the list item, always link to any relevant pull requests
* Add a summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't affect the public interface
* Write your entry in the **past tense**, starting with a verb (e.g. Added... , Fixed...)

[docs]: https://wazuh.github.io/wui/

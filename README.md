# react-dropdown-select

Customisable dropdown select for react

[![](https://img.shields.io/npm/v/react-dropdown-select.svg)](https://www.npmjs.com/package/react-dropdown-select)
[![Coverage Status](https://coveralls.io/repos/github/sanusart/react-dropdown-select/badge.svg?branch=master)](https://coveralls.io/github/sanusart/react-dropdown-select?branch=master)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b24446a1398a4308ad5d2b825e61bf76)](https://app.codacy.com/gh/sanusart/react-dropdown-select/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

### Features

- configurable via `prop`s
- total custom components overrides for all internals via render prop callbacks (with access to internal props, state and methods)
- stylable via css (or custom components)
- portal support for rendering dropdown outside local DOM tree. e.g. in `document.body`
- auto position
- small bundle size

### Installation

> `npm install --save react-dropdown-select`

### Docs and Storybook

[Docs](https://sanusart.github.io/react-dropdown-select/) | [Storybook](https://sanusart.github.io/react-dropdown-select/storybook/)

### Motivation

react-select is very nice, but sometimes project requirements are beyond it's abilities

### Usage

import:

`import Select from "react-dropdown-select";`

and use as:

```jsx
const options = [
  {
    value: 1,
    label: 'Leanne Graham',
  },
  {
    value: 2,
    label: 'Ervin Howell',
  },
];

<Select options={options} onChange={(values) => this.setValues(values)} />;
```

If your options don't have **value** and **label** fields, include **labelField** and **valueField** in the props:

```jsx
const options = [
  {
    id: 1,
    name: 'Leanne Graham',
  },
  {
    id: 2,
    name: 'Ervin Howell',
  },
];

<Select
  options={options}
  labelField="name"
  valueField="id"
  onChange={(values) => this.setValues(values)}
/>;
```

> **options** and **onChange** are the minimum required props

### Help and Contributions

#### Development

The repository is a [pnpm](https://pnpm.io/) workspace. The component lives in `packages/react-dropdown-select` and the docs site in `packages/docs-site`.

```bash
pnpm install

# run storybook (component development)
pnpm -w run storybook

# run the docs site
pnpm --filter docs-site run dev

# validate
pnpm run lint
pnpm run typecheck
pnpm run prettier
pnpm test
```

#### How to help/contribute

- fix issues, pull request are very welcome
- write, improve docs
- write tests (we use jest)
- suggest features and improvements

### Demo

[![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://sanusart.github.io/react-dropdown-select)

# API

### Component props

| Prop                                                                                        | Type        | Default        | Description                                                                                                                            |
| ------------------------------------------------------------------------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| values                                                                                      | array       | []             | Selected values                                                                                                                        |
| options                                                                                     | array       | []             | Available options, (option with key `disabled: true` will be disabled)                                                                 |
| keepOpen                                                                                    | bool        | false          | If true, dropdown will always stay open (good for debugging)                                                                           |
| defaultMenuIsOpen                                                                           | bool        | false          | If true, dropdown will be open by default                                                                                              |
| autoFocus                                                                                   | bool        | false          | If true, and `searchable`, dropdown will auto focus                                                                                    |
| clearOnBlur                                                                                 | bool        | true           | If true, and `searchable`, search value will be cleared on blur                                                                        |
| clearOnSelect                                                                               | bool        | true           | If true, and `searchable`, search value will be cleared upon value select/de-select                                                    |
| name                                                                                        | string      | null           | If set, input type hidden would be added in the component with the value of the `name` prop as name and select's `values` as value     |
| required                                                                                    | bool        | false          | If set, input type hidden would be added in the component with `required` prop as true/false                                           |
| pattern                                                                                     | string      | null           | If set, input type hidden would be added in the component with `pattern` prop as regex                                                 |
| dropdownGap                                                                                 | number      | 5              | Gap between select element and dropdown                                                                                                |
| multi                                                                                       | bool        | false          | If true - will act as multi-select, if false - only one option will be selected at the time                                            |
| placeholder                                                                                 | string      | "Select..."    | Placeholder shown where there are no selected values                                                                                   |
| addPlaceholder                                                                              | string      | ""             | Secondary placeholder on search field if any value selected                                                                            |
| disabled                                                                                    | bool        | false          | Disable select and all interactions                                                                                                    |
| style                                                                                       | object      | {}             | Style object to pass to select                                                                                                         |
| styleNonce                                                                                  | string      |                | Nonce value for the `<style>` tag injected by the component, useful to satisfy a strict Content Security Policy                         |
| className                                                                                   | string      |                | CSS class attribute to pass to select                                                                                                  |
| loading                                                                                     | bool        | false          | Loading indicator                                                                                                                      |
| clearable                                                                                   | bool        | false          | Clear all indicator                                                                                                                    |
| searchable                                                                                  | bool        | true           | If true, select will have search input text                                                                                            |
| separator                                                                                   | bool        | false          | Separator line between close all and dropdown handle                                                                                   |
| dropdownHandle                                                                              | bool        | true           | Dropdown handle to open/close dropdown                                                                                                 |
| dropdownHeight                                                                              | string      | "300px"        | Minimum height of a dropdown                                                                                                           |
| direction                                                                                   | string      | "ltr"          | direction of a dropdown "ltr", "rtl" or "auto"                                                                                         |
| searchBy                                                                                    | string      | label          | Search by object property in values                                                                                                    |
| sortBy                                                                                      | string      | null           | Sort by object property in values                                                                                                      |
| labelField                                                                                  | string      | "label"        | Field in data to use for label                                                                                                         |
| valueField                                                                                  | string      | "value"        | Field in data to use for value                                                                                                         |
| color                                                                                       | string      | "#0074D9"      | Base color to use in component, also can be overwritten via CSS                                                                        |
| closeOnScroll                                                                               | bool        | false          | If true, scrolling the page will close the dropdown                                                                                    |
| closeOnSelect                                                                               | bool        | false          | If true, selecting option will close the dropdown                                                                                      |
| closeOnClickInput                                                                           | bool        | false          | If true, clicking input will close the dropdown if you are not searching.                                                              |
| [dropdownPosition](https://sanusart.github.io/react-dropdown-select/prop/dropdown-position) | string      | "bottom"       | Available options are "auto", "top" and "bottom" defaults to "bottom". Auto will adjust itself according Select's position on the page |
| keepSelectedInList                                                                          | bool        | true           | If false, selected item will not appear in a list                                                                                      |
| portal                                                                                      | DOM element | false          | If valid dom element specified - dropdown will break out to render inside the specified element                                        |
| create                                                                                      | bool        | false          | If true, select will create value from search string and fire `onCreateNew` callback prop                                              |
| backspaceDelete                                                                             | bool        | true           | If true, backspace key will delete last value                                                                                          |
| createNewLabel                                                                              | string      | "add {search}" | If create set to true, this will be the label of the "add new" component. `{search}` will be replaced by search value                  |
| disabledLabel                                                                               | string      | "disabled"     | Label shown on disabled field (after) the text                                                                                         |
| selectAll                                                                                   | bool        | false          | Allow to select all                                                                                                                    |
| selectAllLabel                                                                              | string      | "Select all"   | Label for "Select all"                                                                                                                 |
| clearAllLabel                                                                               | string      | "Clear all"    | Label for "Clear all"                                                                                                                  |
| additionalProps                                                                             | object      | null           | Additional props to pass to Select                                                                                                     |

### Callback props

> by using renderer props to override components some of the functionality will have to be handled manually with a help of internal props, states and methods exposed

| Prop                                                                                                     | Type | Default   | Description                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ---- | --------- | ---------------------------------------------------------------------------------------------- |
| onChange                                                                                                 | func |           | On values change **(user and internally triggered)** callback, returns array of values objects |
| onSelect                                                                                                 | func |           | On values change (user triggered) callback, returns array of values objects                    |
| onDeselect                                                                                               | func |           | On values change (user triggered) callback, returns array of values objects                    |
| onDropdownClose                                                                                          | func |           | Fires upon dropdown close                                                                      |
| onDropdownOpen                                                                                           | func |           | Fires upon dropdown open                                                                       |
| onCreateNew                                                                                              | func |           | Fires upon creation of new item if `create` prop set to `true`                                 |
| onClearAll                                                                                               | func |           | Fires upon clearing all values (via custom renderers)                                          |
| onSelectAll                                                                                              | func |           | Fires upon selecting all values (via custom renderers)                                         |
| onDropdownCloseRequest                                                                                   | func | undefined | Fires upon dropdown closing state, stops the closing and provides own method `close()`         |
| [contentRenderer](https://sanusart.github.io/react-dropdown-select/prop/content-renderer)                | func |           | Overrides internal content component (the contents of the select component)                    |
| [itemRenderer](https://sanusart.github.io/react-dropdown-select/prop/item-renderer)                      | func |           | Overrides internal item in a dropdown                                                          |
| [noDataRenderer](https://sanusart.github.io/react-dropdown-select/prop/no-data-renderer)                 | func |           | Overrides internal "no data" (shown where search has no results)                               |
| [optionRenderer](https://sanusart.github.io/react-dropdown-select/prop/option-renderer)                  | func |           | Overrides internal option (the pillow with an "x") on the select content                       |
| [inputRenderer](https://sanusart.github.io/react-dropdown-select/prop/input-renderer)                    | func |           | Overrides internal input text                                                                  |
| [loadingRenderer](https://sanusart.github.io/react-dropdown-select/prop/loading-renderer)                | func |           | Overrides internal loading                                                                     |
| [clearRenderer](https://sanusart.github.io/react-dropdown-select/prop/clear-renderer)                    | func |           | Overrides internal clear button                                                                |
| [separatorRenderer](https://sanusart.github.io/react-dropdown-select/prop/separator-renderer)            | func |           | Overrides internal separator                                                                   |
| [dropdownRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-renderer)              | func |           | Overrides internal dropdown component                                                          |
| [dropdownHandleRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-handle-renderer) | func |           | Overrides internal dropdown handle                                                             |
| searchFn                                                                                                 | func | undefined | Overrides internal search function                                                             |
| handleKeyDownFn                                                                                          | func | undefined | Overrides internal keyDown function                                                            |

### Content Security Policy

The component serves its base styles and per-component CSS variables through a `<style>` tag added to
`document.head`. Under a strict CSP (e.g. `style-src 'self' 'nonce-…'`) that tag is blocked unless it
carries a nonce. Pass the nonce via the `styleNonce` prop:

```jsx
<Select styleNonce={window.NONCE_ID} ... />
```

The remaining runtime values (such as dropdown positioning) are applied through the DOM style API
(`element.style.setProperty`), which Content Security Policy does not block.

#### Testing against a strict CSP in the docs site

The docs dev server ships a self-contained CSP test page. It is served with a strict
`style-src 'self' 'nonce-…'` header and renders a `<Select styleNonce={…}>`, then verifies that the
injected stylesheet carried the matching nonce and that its rules actually applied:

```sh
pnpm --filter docs-site dev
# open http://localhost:5173/react-dropdown-select/csp-test.html
```

The page reports PASS/FAIL per check; a clean run shows no CSP violations in the DevTools console.
This is a dev-only entry and is not part of the static docs build.

### License

[MIT](https://github.com/sanusart/react-dropdown-select/blob/master/LICENSE)

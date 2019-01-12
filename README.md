# react-dropdown-select

Customisable dropdown select for react

![](https://badgen.net/bundlephobia/minzip/react-dropdown-select)
![](https://img.shields.io/npm/v/react-dropdown-select.svg)
[![Coverage Status](https://coveralls.io/repos/github/sanusart/react-dropdown-select/badge.svg?branch=master)](https://coveralls.io/github/sanusart/react-dropdown-select?branch=master)
[![Build Status](https://travis-ci.org/Gisto/Gisto.svg?branch=master)](https://travis-ci.org/Gisto/Gisto)

### Features

- configurable via `prop`s
- total custom components overrides for all internals via render prop callbacks (with access to internal props, state and methods)
- stylable via css (or custom components)
- portal support for rendering dropdown outside local DOM tree. e.g. in `document.body`
- small bundle size

### Installation

> `npm install --save react-dropdown-select`

### Web site

[Web site, docs and demo](https://sanusart.github.io/react-dropdown-select/demo)

### Motivation

react-select is very nice, but sometimes project requeremwnts are beyond it's abilities

### Usage

import:

`import Select from "react-dropdown-select";`

and use as:

```jsx
<Select options={options}
	onChange={(values) => this.setValues(values)} />
```

> **options** and **onChange** are the minimum required props

### Help and Contributions

#### How to help/contribute

- fix issues, pull request are very welcome
- write, improve docs
- write tests (we use jest)
- suggest features and improvements

### Demo

[![Edit react-dropdown-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p54p8y1987?autoresize=1)

| Props                                                                                                    | Type        | Default     | Description                                                                                     |
| -------------------------------------------------------------------------------------------------------- | ----------- | ----------- | ----------------------------------------------------------------------------------------------- |
| **Component props**                                                                                      |             |             |                                                                                                 |
| values                                                                                                   | array       | []          | Selected values                                                                                 |
| options                                                                                                  | array       | []          | Available options, (option with key `disabled: true` will be disabled)                          |
| keepOpen                                                                                                 | bool        | false       | If true, dropdown will always stay open (good for debugging)                                    |
| dropdownGap                                                                                              | number      | 5           | Gap between select element and dropdown                                                         |
| multi                                                                                                    | bool        | false       | If true - will act as multi-select, if false - only one option will be selected at the time     |
| placeholder                                                                                              | string      | "Select..." | Placeholder shown where there are no selected values                                            |
| addPlaceholder                                                                                           | string      | "+"         | Secondary placeholder on search field if any value selected                                     |
| disabled                                                                                                 | bool        | false       | Disable select and all interactions                                                             |
| style                                                                                                    | object      | {}          | style object to pass to sselect                                                                 |
| className                                                                                                | string      |             | CSS class attribute to pass to sselect                                                          |
| loading                                                                                                  | bool        | false       | loading indicator                                                                               |
| clearable                                                                                                | bool        | true        | Clear all indicator                                                                             |
| separator                                                                                                | bool        | true        | Separator line between close all and dropdown handle                                            |
| dropdownHandle                                                                                           | bool        | true        | dropdown handle to open/close dropdown                                                          |
| dropdownHeight                                                                                           | string      | "300px"     | min-height of a dropdown                                                                        |
| searchBy                                                                                                 | string      | label       | search by object property in values                                                             |
| labelField                                                                                               | string      | "label"     | field in data to use for label                                                                  |
| valueField                                                                                               | string      | "value"     | field in data to use for value                                                                  |
| color                                                                                                    | string      | "#0074D9"   | base color to use in component, also can be overwritten via CSS                                 |
| closeOnScroll                                                                                            | bool        | false       | If true, scrolling the page will close the dropdown                                             |
| closeOnSelect                                                                                            | bool        | false       | If true, selecting option will close the dropdown                                               |
| [openOnTop](https://sanusart.github.io/react-dropdown-select/prop/open-on-top)                           | bool        | false       | If true, dropdown will open on top of the select                                                |
| keepSelectedInList                                                                                       | bool        | true        | If false, selected item will not appear in a list                                               |
| portal                                                                                               | DOM element | false       | If valid dom element specified - dropdown will break out to render inside the specified element |
| **Callback props**                                                                                       |             |             |                                                                                                 |
| onChange                                                                                                 | func        |             | On values change callback, returns array of values objects                                      |
| onDropdownClose                                                                                          | func        |             | fires upon dropdown close                                                                       |
| onDropdownOpen                                                                                           | func        |             | fires upon dropdown open                                                                        |
| onClearAll                                                                                               | func        |             | fires upon clearing all values (via custom renderers)                                           |
| onSelectAll                                                                                              | func        |             | fires upon selecting all values (via custom renderers)                                          |
| [contentRenderer](https://sanusart.github.io/react-dropdown-select/prop/content-renderer)                | func        |             | Overrides internal content component (the contents of the select component)                     |
| [itemRenderer](https://sanusart.github.io/react-dropdown-select/prop/item-renderer)                      | func        |             | Overrides internal item in a dropdown                                                           |
| [noDataRenderer](https://sanusart.github.io/react-dropdown-select/prop/no-data-renderer)                 | func        |             | Overrides internal "no data" (shown where search has no results)                                |
| [optionRenderer](https://sanusart.github.io/react-dropdown-select/prop/option-renderer)                  | func        |             | Overrides internal option (the pillow with an "x") on the select content                        |
| [inputRenderer](https://sanusart.github.io/react-dropdown-select/prop/input-renderer)                    | func        |             | Overrides internal input text                                                                   |
| [loadingRenderer](https://sanusart.github.io/react-dropdown-select/prop/loading-renderer)                | func        |             | Overrides internal loading                                                                      |
| [clearRenderer](https://sanusart.github.io/react-dropdown-select/prop/clear-renderer)                    | func        |             | Overrides internal clear button                                                                 |
| [separatorRenderer](https://sanusart.github.io/react-dropdown-select/prop/separator-renderer)            | func        |             | Overrides internal separator                                                                    |
| [dropdownRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-renderer)              | func        |             | Overrides internal dropdown component                                                           |
| [dropdownHandleRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-handle-renderer) | func        |             | Overrides internal dropdown handle                                                              |

### License 
[MIT](https://github.com/sanusart/react-dropdown-select/blob/master/LICENSE)

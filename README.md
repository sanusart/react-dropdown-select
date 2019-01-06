# react-dropdown-select
Customisable dropdown select for react

![](https://badgen.net/bundlephobia/minzip/react-dropdown-select)
![](https://img.shields.io/npm/v/react-dropdown-select.svg)

### Installation

> `npm install --save react-dropdown-select`

### Usage

import:

```import Select from "react-dropdown-select";```

and use as:
 
```jsx
<Select
  options={options}
  onChange={(values) => this.setValues(values)}
/>
```

> **options** and **onChange** are the minimum requered props

### Demo

[![Edit react-dropdown-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p54p8y1987?autoresize=1)

### Preview
> https://sanusart.github.io/react-dropdown-select

| Props                  | Type   | Default     | Description                                                                                 |
|------------------------|--------|-------------|---------------------------------------------------------------------------------------------|
| **Component props** ||||
| values                 | array  | []          | Selected values                                                                             |
| options                | array  | []          | Available options, (option with key `disabled: true` will be disabled)                                                                           |
| keepOpen               | bool   | false       | If true, dropdown will always stay open (good for debugging)                                |
| dropdownGap            | number | 5           | Gap between select element and dropdown                                                     |
| multi                  | bool   | false        | If true - will act as multi-select, if false - only one option will be selected at the time |
| placeholder            | string | "Select..." | Placeholder shown where there are no selected values                                        |
| addPlaceholder         | string | "+"         | Secondary placeholder on search field if any value selected                                 |
| disabled               | bool   | false       | Disable select and all interactions                                                         |
| style                  | object | {}          | style object to pass to sselect                                                             |
| className              | string |             | CSS class attribute to pass to sselect                                                      |
| loading                | bool   | false       | loading indicator                                                                           |
| clearable              | bool   | true        | Clear all indicator                                                                         |
| separator              | bool   | true        | Separator line between close all and dropdown handle                                        |
| dropdownHandle         | bool   | true        | dropdown handle to open/close dropdown                                                      |
| searchBy               | string | label       | search by object property in values                                                         |
| labelField               | string | "label"       | field in data to use for label                                                         |
| valueField               | string | "value"       | field in data to use for value                                                         |
| color               | string | "#0074D9"       | base color to use in component, also can be overwritten via CSS                                                         |
| closeOnScroll          | bool   | false       | If true, scrolling the page will close the dropdown                                         |
| closeOnSelect          | bool   | false       | If true, selecting option will close the dropdown                                         |
| openOnTop          | bool   | false       | If true, dropdown will open on top of the select                                         |
| keepSelectedInList          | bool   | true       | If false, selected item will not appear in a list                                         |
| **Callback props** ||||
| onChange               | func   |             | On values change callback, returns array of values objects |
| onDropdownClose        | func   |             | fires upon dropdown close                                                                   |
| onDropdownOpen         | func   |             | fires upon dropdown open                                                                    |
| onClearAll             | func   |             | fires upon clearing all values (via custom renderers)                                       |
| onSelectAll            | func   |             | fires upon selecting all values (via custom renderers)                                      |
| [contentRenderer](https://sanusart.github.io/react-dropdown-select/prop/content-renderer)        | func   |             | Overrides internal content component (the contents of the select component)                |
| [itemRenderer](https://sanusart.github.io/react-dropdown-select/prop/item-renderer)           | func   |             | Overrides internal item in a dropdown                                                       |
| [noDataRenderer](https://sanusart.github.io/react-dropdown-select/prop/no-data-renderer)         | func   |             | Overrides internal "no data" (shown where search has no results)                            |
| [optionRenderer](https://sanusart.github.io/react-dropdown-select/prop/option-renderer)         | func   |             | Overrides internal option (the pillow with an "x") on the select content                    |
| [inputRenderer](https://sanusart.github.io/react-dropdown-select/prop/input-renderer)          | func   |             | Overrides internal input text                                                               |
| [loadingRenderer](https://sanusart.github.io/react-dropdown-select/prop/loading-renderer)        | func   |             | Overrides internal loading                                                                  |
| [clearRenderer](https://sanusart.github.io/react-dropdown-select/prop/clear-renderer)          | func   |             | Overrides internal clear button                                                             |
| [separatorRenderer](https://sanusart.github.io/react-dropdown-select/prop/separator-renderer)      | func   |             | Overrides internal separator                                                                |
| [dropdownRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-renderer)       | func   |             | Overrides internal dropdown component                                                       |
| [dropdownHandleRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-handle-renderer) | func   |             | Overrides internal dropdown handle                                                          |

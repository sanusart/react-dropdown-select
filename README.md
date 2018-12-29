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
	placeholder="Select"
	addPlaceholder="+"
	multi={true}
	values={[options[0]]}
	options={options}
	onChange={(values) => this.setValues(values)}
	/>
```

### Demo

[![Edit react-dropdown-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p54p8y1987?autoresize=1)

### Preview
> https://sanusart.github.io/react-dropdown-select

### Props

	values: PropTypes.array,
	options: PropTypes.array.isRequired,
	keepOpen: PropTypes.bool,
	dropdownGap: PropTypes.number,
	multi: PropTypes.bool,
	placeholder: PropTypes.string,
	addPlaceholder: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	loading: PropTypes.bool,
	clearable: PropTypes.bool,
	separator: PropTypes.bool,
	dropdownHandle: PropTypes.bool,
	searchBy: PropTypes.string,

#### Callbacks
	
	onChange: PropTypes.func.isRequired,
	onDropdownClose: PropTypes.func,
	onDropdownOpen: PropTypes.func,
	onClearAll: PropTypes.func,
	onSelectAll: PropTypes.func,
	
#### Custom renderers

	contentRenderer: PropTypes.func,
	dropdownRenderer: PropTypes.func,
	itemRenderer: PropTypes.func,
	noDataRenderer: PropTypes.func,
	optionRenderer: PropTypes.func,
	inputRenderer: PropTypes.func,
	loadingRenderer: PropTypes.func,
	clearRenderer: PropTypes.func,
	separatorRenderer: PropTypes.func,
	dropdownHandleRenderer: PropTypes.func

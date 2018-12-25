# react-dropdown-select
Customizable dropdown select for react

![](https://badgen.net/bundlephobia/minzip/react-dropdown-select)
![](https://img.shields.io/npm/v/react-dropdown-select.svg)

### Installation

> `npm install --save react-dropdown-select`

### Usage

```import Select from "react-dropdown-select";```

and use as:
 
```jsx
<Select
	placeholder="Sasha's family members"
	addPlaceholder="+ click to add"
	disabled={this.state.disabled}
	loading={this.state.loading}
	searchBy={this.state.searchBy}
	separator={this.state.separator}
	clearable={this.state.clearable}
	forceOpen={this.state.forceOpen}
	handle={this.state.handle}
	multi={this.state.multi}
	values={[options[0]]}
	options={options}
	onDropdownOpen={() => undefined}
	onDropdownClose={() => undefined}
	onChange={(values) => this.setValues(values)}
	contentRenderer={
		this.state.contentRenderer
			? (innerProps, innerState) => this.contentRenderer(innerProps, innerState)
			: undefined
	}
	dropdownRenderer={
		this.state.dropdownRenderer
			? (innerProps, innerState, innerMethods) =>
					this.dropdownRenderer(innerProps, innerState, innerMethods)
			: undefined
	}
	/>
```

### Demo

[![Edit react-dropdown-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p54p8y1987?autoresize=1)

### Preview
> https://sanusart.github.io/react-dropdown-select

# react-dropdown-select
Customizable dropdown select for react

### installation

> `npm install --save react-dropdown-select`

### Usage

```jsx
<SelectComponent
	placeholder="Sasha's family members"
	addPlaceholder="+ click to add"
	disabled={this.state.disabled}
	loading={this.state.loading}
	searchBy={this.state.searchBy}
	separator={this.state.separator}
	clearable={this.state.clearable}
	forceOpen={this.state.forceOpen}
	handle={this.state.handle}
	contentRenderer={
		this.state.contentRenderer
			? (props, state) => this.contentRenderer(props, state)
			: undefined
	}
	dropdownRenderer={
		this.state.dropdownRenderer
			? (props, state, methods) =>
					this.dropdownRenderer(props, state, methods)
			: undefined
	}
	multi={this.state.multi}
	values={[options[0]]}
	options={options}
	onDropdownOpen={() => undefined}
	onDropdownClose={() => undefined}
	onChange={values => this.setValues(values)}
/>
```

### Demo

> https://codesandbox.io/s/p54p8y1987

> https://sanusart.github.io/react-dropdown-select

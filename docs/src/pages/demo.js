import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

import 'normalize.css';
import '../../../examples/src/demo-styles.css';

import '../styles.css';

import Select from '../../../src/index';

export const options = [
	{
		id: 1,
		name: 'Leanne Graham',
		username: 'Bret',
		email: 'Sincere@april.biz',
		address: {
			street: 'Kulas Light',
			suite: 'Apt. 556',
			city: 'Gwenborough',
			zipcode: '92998-3874',
			geo: {
				lat: '-37.3159',
				lng: '81.1496'
			}
		},
		phone: '1-770-736-8031 x56442',
		website: 'hildegard.org',
		company: {
			name: 'Romaguera-Crona',
			catchPhrase: 'Multi-layered client-server neural-net',
			bs: 'harness real-time e-markets'
		}
	},
	{
		id: 2,
		name: 'Ervin Howell',
		username: 'Antonette',
		email: 'Shanna@melissa.tv',
		address: {
			street: 'Victor Plains',
			suite: 'Suite 879',
			city: 'Wisokyburgh',
			zipcode: '90566-7771',
			geo: {
				lat: '-43.9509',
				lng: '-34.4618'
			}
		},
		phone: '010-692-6593 x09125',
		website: 'anastasia.net',
		company: {
			name: 'Deckow-Crist',
			catchPhrase: 'Proactive didactic contingency',
			bs: 'synergize scalable supply-chains'
		}
	},
	{
		id: 3,
		name: 'Clementine Bauch',
		username: 'Samantha',
		email: 'Nathan@yesenia.net',
		address: {
			street: 'Douglas Extension',
			suite: 'Suite 847',
			city: 'McKenziehaven',
			zipcode: '59590-4157',
			geo: {
				lat: '-68.6102',
				lng: '-47.0653'
			}
		},
		phone: '1-463-123-4447',
		website: 'ramiro.info',
		company: {
			name: 'Romaguera-Jacobson',
			catchPhrase: 'Face to face bifurcated interface',
			bs: 'e-enable strategic applications'
		}
	},
	{
		id: 4,
		name: 'Patricia Lebsack',
		username: 'Karianne',
		email: 'Julianne.OConner@kory.org',
		address: {
			street: 'Hoeger Mall',
			suite: 'Apt. 692',
			city: 'South Elvis',
			zipcode: '53919-4257',
			geo: {
				lat: '29.4572',
				lng: '-164.2990'
			}
		},
		phone: '493-170-9623 x156',
		website: 'kale.biz',
		company: {
			name: 'Robel-Corkery',
			catchPhrase: 'Multi-tiered zero tolerance productivity',
			bs: 'transition cutting-edge web services'
		}
	},
	{
		id: 5,
		name: 'Chelsey Dietrich',
		username: 'Kamren',
		email: 'Lucio_Hettinger@annie.ca',
		address: {
			street: 'Skiles Walks',
			suite: 'Suite 351',
			city: 'Roscoeview',
			zipcode: '33263',
			geo: {
				lat: '-31.8129',
				lng: '62.5342'
			}
		},
		phone: '(254)954-1289',
		website: 'demarco.info',
		company: {
			name: 'Keebler LLC',
			catchPhrase: 'User-centric fault-tolerant solution',
			bs: 'revolutionize end-to-end systems'
		}
	},
	{
		id: 6,
		name: 'Mrs. Dennis Schulist',
		username: 'Leopoldo_Corkery',
		email: 'Karley_Dach@jasper.info',
		address: {
			street: 'Norberto Crossing',
			suite: 'Apt. 950',
			city: 'South Christy',
			zipcode: '23505-1337',
			geo: {
				lat: '-71.4197',
				lng: '71.7478'
			}
		},
		phone: '1-477-935-8478 x6430',
		website: 'ola.org',
		company: {
			name: 'Considine-Lockman',
			catchPhrase: 'Synchronised bottom-line interface',
			bs: 'e-enable innovative applications'
		}
	},
	{
		id: 7,
		name: 'Kurtis Weissnat',
		username: 'Elwyn.Skiles',
		email: 'Telly.Hoeger@billy.biz',
		address: {
			street: 'Rex Trail',
			suite: 'Suite 280',
			city: 'Howemouth',
			zipcode: '58804-1099',
			geo: {
				lat: '24.8918',
				lng: '21.8984'
			}
		},
		phone: '210.067.6132',
		website: 'elvis.io',
		company: {
			name: 'Johns Group',
			catchPhrase: 'Configurable multimedia task-force',
			bs: 'generate enterprise e-tailers'
		}
	},
	{
		id: 8,
		name: 'Nicholas Runolfsdottir V',
		username: 'Maxime_Nienow',
		email: 'Sherwood@rosamond.me',
		address: {
			street: 'Ellsworth Summit',
			suite: 'Suite 729',
			city: 'Aliyaview',
			zipcode: '45169',
			geo: {
				lat: '-14.3990',
				lng: '-120.7677'
			}
		},
		phone: '586.493.6943 x140',
		website: 'jacynthe.com',
		company: {
			name: 'Abernathy Group',
			catchPhrase: 'Implemented secondary concept',
			bs: 'e-enable extensible e-tailers'
		}
	},
	{
		id: 9,
		name: 'Glenna Reichert',
		username: 'Delphine',
		email: 'Chaim_McDermott@dana.io',
		address: {
			street: 'Dayna Park',
			suite: 'Suite 449',
			city: 'Bartholomebury',
			zipcode: '76495-3109',
			geo: {
				lat: '24.6463',
				lng: '-168.8889'
			}
		},
		phone: '(775)976-6794 x41206',
		website: 'conrad.com',
		company: {
			name: 'Yost and Sons',
			catchPhrase: 'Switchable contextually-based project',
			bs: 'aggregate real-time technologies'
		}
	},
	{
		id: 10,
		name: 'Clementina DuBuque',
		username: 'Moriah.Stanton',
		email: 'Rey.Padberg@karina.biz',
		address: {
			street: 'Kattie Turnpike',
			suite: 'Suite 198',
			city: 'Lebsackbury',
			zipcode: '31428-2261',
			geo: {
				lat: '-38.2386',
				lng: '57.2232'
			}
		},
		phone: '024-648-3804',
		website: 'ambrose.net',
		company: {
			name: 'Hoeger LLC',
			catchPhrase: 'Centralized empowering task-force',
			bs: 'target end-to-end models'
		}
	}
];

export class Demo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			multi: true,
			disabled: false,
			loading: false,
			contentRenderer: false,
			dropdownRenderer: false,
			inputRenderer: false,
			itemRenderer: false,
			optionRenderer: false,
			noDataRenderer: false,
			selectValues: [],
			searchBy: 'email',
			clearable: true,
			separator: true,
			forceOpen: false,
			handle: true,
			labelField: 'username',
			valueField: 'email',
			color: '#0074D9'
		};
	}

	setValues = (selectValues) => this.setState({ selectValues });

	contentRenderer = (innerProps, innerState) => {
		return (
			<div>
				{innerState.values.length} of {innerProps.options.length} Selected
			</div>
		);
	};

	noDataRenderer = () => {
		return (
			<p style={{ textAlign: 'center' }}>
				<strong>Ooops!</strong> No data found
			</p>
		);
	};

	itemRenderer = (item, itemIndex, props, state, methods) => (
		<div key={item.value} onClick={() => methods.addItem(item)}>
			<div style={{ margin: '10px' }}>
				<input type="checkbox" checked={methods.isSelected(item)} />
				&nbsp;&nbsp;&nbsp;{item.label}
			</div>
		</div>
	);

	dropdownRenderer = (props, state, methods) => {
		const regexp = new RegExp(state.search, 'i');

		return (
			<div>
				<input
					type="text"
					size={methods.getInputSize()}
					value={state.search}
					onChange={methods.setSearch}
					placeholder="Type anything"
				/>
				<button onClick={methods.selectAll}>Select all</button>
				<button onClick={methods.clearAll}>Clear all</button>
				{props.options
					.filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
					.map((option) => (
						<div key={option[props.valueField]} onClick={() => methods.addItem(option)}>
							<input
								type="checkbox"
								onChange={() => methods.addItem(option)}
								checked={state.values.indexOf(option) !== -1}
							/>
							{option[props.labelField]}
						</div>
					))}
			</div>
		);
	};

	optionRenderer = (option, props, state, methods) => (
		<React.Fragment>
			<div onClick={(event) => methods.removeItem(event, option, true)}>{option.label}</div>
		</React.Fragment>
	);

	inputRenderer = (props, state, methods) => (
		<input
			tabIndex="1"
			className="react-dropdown-select-input"
			size={methods.getInputSize()}
			value={state.search}
			onClick={() => methods.dropDown('open')}
			onChange={methods.setSearch}
			placeholder="Type in"
		/>
	);

	render() {
		return (
			<div style={{ margin: '30px' }}>
				<Header page="demo" title="Demo"/>
				<div>
					<div style={{ width: '500px', margin: '0 auto' }}>
					<Select
						placeholder="Select peoples"
						addPlaceholder="+ click to add"
						color={this.state.color}
						disabled={this.state.disabled}
						loading={this.state.loading}
						searchBy={this.state.searchBy}
						separator={this.state.separator}
						clearable={this.state.clearable}
						keepOpen={this.state.forceOpen}
						dropdownHandle={this.state.handle}
						multi={this.state.multi}
						values={[options[0]]}
						labelField={this.state.labelField}
						valueField={this.state.valueField}
						options={options}
						dropdownGap={5}
						onDropdownOpen={() => undefined}
						onDropdownClose={() => undefined}
						onClearAll={() => undefined}
						onSelectAll={() => undefined}
						onChange={(values) => this.setValues(values)}
						noDataLabel="No matches found"
						noDataRenderer={this.state.noDataRenderer ? () => this.noDataRenderer() : undefined}
						itemRenderer={
							this.state.itemRenderer
								? (item, itemIndex, props, state, methods) =>
									this.itemRenderer(item, itemIndex, props, state, methods)
								: undefined
						}
						inputRenderer={
							this.state.inputRenderer
								? (props, state, methods) => this.inputRenderer(props, state, methods)
								: undefined
						}
						optionRenderer={
							this.state.optionRenderer
								? (option, props, state, methods) =>
									this.optionRenderer(option, props, state, methods)
								: undefined
						}
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
					</div>
				</div>

				<p>
					<input
						type="checkbox"
						checked={this.state.multi}
						onChange={() =>
							this.setState({
								multi: !this.state.multi
							})
						}
					/>{' '}
					Multi
					<br />
					<input
						type="checkbox"
						checked={this.state.disabled}
						onChange={() =>
							this.setState({
								disabled: !this.state.disabled
							})
						}
					/>{' '}
					Disabled
					<br />
					<input
						type="checkbox"
						checked={this.state.loading}
						onChange={() =>
							this.setState({
								loading: !this.state.loading
							})
						}
					/>{' '}
					Loading
					<br />
					<input
						type="checkbox"
						checked={this.state.clearable}
						onChange={() =>
							this.setState({
								clearable: !this.state.clearable
							})
						}
					/>{' '}
					Clearable
					<br />
					<input
						type="checkbox"
						checked={this.state.separator}
						onChange={() =>
							this.setState({
								separator: !this.state.separator
							})
						}
					/>{' '}
					Separator
					<br />
					<input
						type="checkbox"
						checked={this.state.handle}
						onChange={() =>
							this.setState({
								handle: !this.state.handle
							})
						}
					/>{' '}
					Dropdown handle
					<br />
					<input
						type="checkbox"
						checked={this.state.forceOpen}
						onChange={() =>
							this.setState({
								forceOpen: !this.state.forceOpen
							})
						}
					/>{' '}
					Stay open
					<br />
					<input
						type="checkbox"
						checked={this.state.contentRenderer}
						onChange={() =>
							this.setState({
								contentRenderer: !this.state.contentRenderer
							})
						}
					/>{' '}
					Custom content renderer
					<br />
					<input
						type="checkbox"
						checked={this.state.dropdownRenderer}
						onChange={() =>
							this.setState({
								dropdownRenderer: !this.state.dropdownRenderer
							})
						}
					/>{' '}
					Custom dropdown renderer
					<br />
					<input
						type="checkbox"
						checked={this.state.itemRenderer}
						onChange={() =>
							this.setState({
								itemRenderer: !this.state.itemRenderer
							})
						}
					/>{' '}
					Custom dropdown item renderer
					<br />
					<input
						type="color"
						defaultValue={this.state.color}
						onChange={(event) =>
							this.setState({
								color: event.target.value
							})
						}
					/>{' '}
					Custom color
					<br />
					Search by field:{' '}
					<select
						defaultValue={this.state.searchBy}
						onChange={(event) => this.setState({ searchBy: event.target.value })}>
						{Object.keys(options[0]).map((f) => (
							<option value={f}>{f}</option>
						))}
					</select>
					<br />
					Label field:{' '}
					<select
						defaultValue={this.state.labelField}
						onChange={(event) =>
							this.setState({
								labelField: event.target.value,
								searchBy: event.target.value
							})
						}>
						{Object.keys(options[0]).map((f) => (
							<option value={f}>{f}</option>
						))}
					</select>
					<br />
					Value field:{' '}
					<select
						defaultValue={this.state.valueField}
						onChange={(event) => this.setState({ valueField: event.target.value })}>
						{Object.keys(options[0]).map((f) => (
							<option value={f}>{f}</option>
						))}
					</select>
				</p>

				<details>
					<summary>Options:</summary>
					<pre>{JSON.stringify(options, false, 2)}</pre>
				</details>

				<p>Selected value(s):</p>
				<pre>{JSON.stringify(this.state.selectValues, false, 2)}</pre>

				<Footer/>
			</div>
		);
	}
}

export default Demo;

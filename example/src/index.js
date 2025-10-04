import React from "react";
import ReactDOM from "react-dom";
import Select from "react-dropdown-select";
import "./styles.css";

const options = [
	{ label: "hi", value: "hi" },
	{ label: "bye", value: "bye" },
];
const clearStyle = {
	cursor: "pointer",
	background: "salmon",
	color: "white",
	padding: "0px 5px",
	fontSize: "10px",
	borderRadius: "2px",
};

const App = () => (
	<div className="App">
		<h1>Hello CodeSandbox</h1>
		<h2>Start editing to see some magic happen!</h2>

		<Select
			multi
			options={options}
			clearable
			clearRenderer={({ props, state, methods }) => (
				<div
					title="Clear all items from select"
					style={clearStyle}
					onClick={() => methods.clearAll()}
					{...props}
				>
					clear all
				</div>
			)}
		/>
	</div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

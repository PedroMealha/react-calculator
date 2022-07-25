import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: "",
	lastValue: "",
	total: 0,
	operator: "",
	equation: "",
	lastEquation: "",
	history: [],
	canCalculate: false,
	isNegated: false,
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		addToEquation: (state, action) => {
			action.payload.hasSpace ?
			state.equation += ` ${action.payload.key} ` :
			state.equation += action.payload.key;
			state.lastEquation = state.equation;
		},

		setValue: (state, action) => {
			state.value += action.payload;
			state.lastValue = state.value;
			state.canCalculate = true;
		},
		
		setOperator: (state, action) => {
			state.operator = action.payload;
		},
		
		calculate: (state, action) => {

			if (state.canCalculate) {
				state.total = window.eval(state.equation);
				state.canCalculate = false;
			}

			if (action.payload == "Equal") {
				state.operator = "=";
				state.total = state.lastEquation;
				state.lastEquation = state.equation;
			}
			else {
				state.lastValue = state.total;
				state.equation = state.total;
			}
			
			state.value = "";
			state.isNegated = false;
		},
		
		clear: (state) => {
			Object.keys(state).forEach((key) => (state[key] = initialState[key]));
		},
		
		undo: (state) => {
			const length = state.value.length;
			length > 1
				? (state.value = state.value.slice(0, length - 1))
				: (state.value = "");

			const eLength = state.equation.length;
			if (eLength > eLength - length)
				state.equation = state.equation.slice(0, eLength - 1);

			state.lastValue = state.value;
		},
		
		negate: (state) => {
			const regex = /[-()]/g;
			state.equation = state.isNegated
				? state.equation.replace(regex, "")
				: `-(${state.equation})`;
			state.isNegated = !state.isNegated;
		},

		// addToHistory: (state, action) => {
		// 	if (/[^0-9.]/g.test(action.payload))
		// 		state.history.push(state.equation);
		// },
	},
});

export const {
	addToEquation,
	setValue,
	setOperator,

	// addToHistory,
	calculate,
	clear,
	undo,
	negate,
} = calculatorSlice.actions;

export const selectCalculator = (state) => state.calculator;

export default calculatorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	number: "",
	lastNumber: "0",
	total: "",
	lastTotal: "0",
	equation: "0",
	lastEquation: "0",
	showEquation: "",
	operator: "",
	
	steps: [],
	history: [],
	opCount: 2,
	
	opChange: false,
	wasEqual: false,
	newNumber: true,
	isNegated: false,
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		setNumber: (state, action) => {
			if (state.newNumber) {
				state.number = "";
				state.newNumber = false;
			}
			state.number += action.payload;
			state.lastNumber += action.payload;
			state.opChange = true;
			state.isNegated = false;
		},

		setOperator: (state, action) => {
			if (state.opChange) {
				state.steps.push(state.number);
				state.opCount <= 0 ? (state.opCount = 0) : state.opCount--;
				state.operator = action.payload;
			} else {
				state.steps.pop();
				state.operator = action.payload;
			}

			state.steps.push(state.operator);
			state.newNumber = true;
		},

		updateValuePercent: (state) => {
			state.steps.push(state.number);
			state.steps.push(state.operator);
			state.opCount = 0;
			state.opChange = true;
		},

		setTotal: (state) => {
			state.number = state.opCount > 0 ? state.lastNumber : state.number;
			state.number = state.number !== state.lastNumber ? state.number : state.lastNumber;
			state.showEquation = `${state.total} ${state.operator} ${state.number}`;
			state.lastTotal = eval(state.showEquation);
			state.total = eval(`${state.total} ${state.operator} ${state.number}`);
			state.opCount = 0;
			state.opChange = true;
			state.steps.push(state.number);
			state.steps.push(state.operator);
			state.history.push({
				equation: state.showEquation,
				total: state.total,
			});

			state.wasEqual = true;
			state.newNumber = true;
		},

		negate: (state) => {
			console.log("state.number:", state.number);
			state.newNumber = false;
			state.wasEqual = false;

			switch (state.number) {
				case "0":
					state.number = "-";
					state.number = `${(state.number *= -1)}`;
					break;
				case "":
					state.number = "-";
					break;
				case "-":
					state.number = "";
					state.number = `${(state.number *= -1)}`;
					break;
				default:
					state.number = `${(state.number *= -1)}`;
					break;
			}
			state.lastNumber = state.number;
			state.isNegated = !state.isNegated;
		},

		percentage: (state) => {
			const divider =
				state.operator === "-" || state.operator === "+"
					? 100
					: 100 * state.total;
			state.number = (state.number * state.total) / divider;
		},

		calculate: (state) => {
			if (state.opChange && !state.wasEqual) {
				state.opChange = false;
				state.lastNumber = state.number;
				state.number = "";
				if (state.opCount == 0) {
					const length = state.steps.length - 2;
					state.lastTotal = eval(state.lastEquation);
					state.lastEquation = `${state.steps[length - 2]} ${state.steps[length - 1]} ${state.steps[length]}`;
					state.equation = `${state.total} ${state.steps[length - 1]} ${state.steps[length]}`;
					state.total = eval(state.equation);
					state.showEquation = state.equation;
					state.history.push({
						equation: state.showEquation,
						total: state.total,
					});
				} else {
					state.total = state.lastNumber;
				}
			}
			state.wasEqual = false;
			state.newNumber = true;
		},

		undo: (state) => {
			const length = state.number.length;
			length > 1
				? (state.number = state.number.slice(0, length - 1))
				: (state.number = "");

			const eLength = state.equation.length;
			if (eLength > eLength - length)
				state.equation = state.equation.slice(0, eLength - 1);

			length > 1 ?
				state.equation = state.equation.slice(0, length - 1) :
				state.equation = '0'
			state.lastNumber = state.number;
		},

		clearAll: (state) => {
			Object.keys(state).forEach((key) => (state[key] = initialState[key]));
		},
	},
});

export const {
	setNumber,
	setOperator,
	updateValuePercent,
	setTotal,
	negate,
	calculate,
	percentage,
	undo,
	clearAll,
} = calculatorSlice.actions;

export const selectCalculator = (state) => state.calculator;

export default calculatorSlice.reducer;

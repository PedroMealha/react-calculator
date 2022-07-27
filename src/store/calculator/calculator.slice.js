import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	number: "",
	lastNumber: "0",
	total: "",
	lastTotal: "0",
	equation: "0",
	lastEquation: "0",
	operator: "",
	steps: [],
	history: [],
	opCount: 2,
	opChange: false,
	ranOnce: false,

	showEquation: "",
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		setNumber: (state, action) => {
			state.number += action.payload;
			state.opChange = true;
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
		},

		calculate: (state) => {
			if (state.opChange) {
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
		},

		setsteps: (state, val) => {
			state.steps.push(val);
		},
	},
});

export const { setNumber, setOperator, calculate } = calculatorSlice.actions;

export const selectCalculator = (state) => state.calculator;

export default calculatorSlice.reducer;

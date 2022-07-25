import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	total: 0,
	equation: "0",
	history: [],
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		add: (state, action) => {
			state.total += action.payload;
		},
		subtract: (state, action) => {
			state.total -= action.payload;
		},
		addToEquation: (state, action) => {
			if (state.equation === "0") state.equation = "";
			state.equation += action.payload;
		},
		addToHistory: (state, action) => {
			if (/[^0-9.]/g.test(action.payload))
				state.history.push(state.equation);
		},
		calculate: (state) => {
			state.total = window.eval(state.equation);
		},
		clearAll: (state) => {
			state.total = initialState.total;
			state.equation = initialState.equation;
			state.history = [];
		},
		clearLast: (state) => {
			const length = state.equation.length;
			console.log('length:', length);

			length > 1 ?
				state.equation = state.equation.slice(0, length - 1) :
				state.equation = '0'
		},
		negate: (state) => {
			state.equation *= -1;
		},
	},
});

export const {
	add,
	subtract,
	addToEquation,
	addToHistory,
	calculate,
	clearAll,
	clearLast,
	negate,
} = calculatorSlice.actions;

export const selectCalculator = (state) => state.calculator;

export default calculatorSlice.reducer;

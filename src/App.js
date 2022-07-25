import Calculator from "./components/calculator/calculator.component";

import './App.scss';

function App() {
	return (
		<div className="app">
			<h2>Calculator App</h2>
			<div className="calculator-wrapper">
				<Calculator />
			</div>
		</div>
	);
}

export default App;

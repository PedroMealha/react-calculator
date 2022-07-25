import { useSelector } from "react-redux";

import { selectCalculator } from "../../store/calculator/calculator.slice";

import Button from "../button/button.component";

import styles from "./calculator.module.scss";

import CALCULATOR_KEYS from "./calculator.keys";

const Calculator = () => {
	const calc = useSelector(selectCalculator);

	return (
		<div className={ styles.wrapper }>
			<div className={ styles.calculator }>
				<div className={ styles.screen }>
					<div className={ styles.lastEquation }>
						{ calc.total } { calc.operator }
					</div>
					<div className={ styles.value }>
						<div>{ calc.lastValue }</div>
					</div>
				</div>
				<div className={ styles.keys }>
					{ CALCULATOR_KEYS.map((button) => (
						<Button key={ button.name } button={ button } />
					)) }
				</div>
			</div>
			<div className={ styles.history }>
				<div>value: { calc.value }</div>
				<div>lastValue: { calc.lastValue }</div>
				<div>total: { calc.total }</div>
				<div>operator: { calc.operator }</div>
				<div>equation: { calc.equation }</div>
				<div>lastEquation: { calc.lastEquation }</div>
				<div>history: { calc.history }</div>

				{/* { calc.history.map((log, idx) => (
					<div key={ idx }>{ log }</div>
				)) } */}
			</div>
		</div>
	);
};

export default Calculator;

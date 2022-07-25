import { useSelector } from "react-redux";

import { selectCalculator } from "../../store/calculator/calculator.slice";

import Button from "../button/button.component";

import styles from "./calculator.module.scss";

import CALCULATOR_KEYS from "./calculator.keys";

const Calculator = () => {
	const calculatorSelector = useSelector(selectCalculator);

	return (
		<div className={ styles.wrapper }>
			<div className={ styles.calculator }>
				<div className={ styles.screen }>
					<div className={ styles.value }>{ calculatorSelector.total }</div>
					<div className={ styles.equation }>{ calculatorSelector.equation }</div>
				</div>
				<div className={ styles.keys }>
					{ CALCULATOR_KEYS.map((button) => (
						<Button key={ button.name } button={ button }></Button>
					)) }
				</div>
			</div>
			<div className={ styles.history }>
				{ calculatorSelector.history.map((log, idx) => (
					<div key={ idx }>{ log }</div>
				)) }
			</div>
		</div>
	);
};

export default Calculator;

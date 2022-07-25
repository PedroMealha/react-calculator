import { useDispatch } from "react-redux";

import styles from './button.module.scss';

import {
	addToEquation,
	setValue,
	setOperator,

	calculate,
	clear,
	undo,
	negate,
	// addToHistory,
} from "../../store/calculator/calculator.slice";

const Button = ({ button }) => {
	const { name, tag, text, key } = button;
	const dispatch = useDispatch();

	const handleClick = key => {

		switch (key) {
			case 'Equal':
				dispatch(calculate(key))
				// dispatch(addToHistory(key));
				break;
			case 'Delete':
				dispatch(clear())
				break;
			case 'Backspace':
				dispatch(undo())
				break;
			case 'Negate':
				dispatch(negate())
				break;
			default:
				if (/[^0-9.]/.test(key)) {
					dispatch(setOperator(key))
					dispatch(calculate())
					dispatch(addToEquation({key, hasSpace: true}))
				}
				
				if (/[0-9.]/.test(key)) {
					dispatch(setValue(key))
					dispatch(addToEquation({key, hasSpace: false}))
				}

				break;
		}

		return key;
	}

	return tag === 'ico' ?
		<i className={ styles.button } style={ { gridArea: name } } onClick={ () => handleClick(key) }>{ text }</i> :
		<div className={ styles.button } style={ { gridArea: name } } onClick={ () => handleClick(key) }>{ text }</div>
}

export default Button;
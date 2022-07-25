import { useDispatch } from "react-redux";

import styles from './button.module.scss';

import {
	addToEquation,
	calculate,
	clearAll,
	clearLast,
	negate,
	addToHistory
} from "../../store/calculator/calculator.slice";

const Button = ({ button }) => {
	const { name, tag, text, key } = button;
	const dispatch = useDispatch();

	const handleClick = key => {

		switch (key) {
			case 'Equal':
				dispatch(calculate())
				dispatch(addToHistory(key));
				break;
			case 'Delete':
				dispatch(clearAll())
				break;
			case 'Backspace':
				dispatch(clearLast())
				break;
			case 'Negate':
				dispatch(negate())
				break;
			default:
				if (/[^0-9.]/g.test(key)) {
					dispatch(addToHistory(key));
					dispatch(calculate())
				}
				dispatch(addToEquation(key))
				break;
		}
		return key;
	}

	return tag === 'ico' ?
		<i className={ styles.button } style={ { gridArea: name } } onClick={ () => handleClick(key) }>{ text }</i> :
		<div className={ styles.button } style={ { gridArea: name } } onClick={ () => handleClick(key) }>{ text }</div>
}

export default Button;
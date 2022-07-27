import { useDispatch } from "react-redux";

import styles from "./button.module.scss";

import {
  setNumber,
  setOperator,
  calculate,
} from "../../store/calculator/calculator.slice";

const Button = ({ button }) => {
  const { name, tag, text, key, type } = button;
  const dispatch = useDispatch();

  const handleClick = () => {
    switch (type) {
      case "number":
        dispatch(setNumber(key));
        break;
      case "operator":
        dispatch(setOperator(key));
				dispatch(calculate(key));
        break;
      default:
        break;
    }
  };

  return tag === "ico" ? (
    <i
      className={styles.button}
      style={{ gridArea: name }}
      onClick={() => handleClick()}
    >
      {text}
    </i>
  ) : (
    <div
      className={styles.button}
      style={{ gridArea: name }}
      onClick={() => handleClick()}
    >
      {text}
    </div>
  );
};

export default Button;

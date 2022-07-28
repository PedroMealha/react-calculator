import { useDispatch } from "react-redux";

import styles from "./button.module.scss";

import {
  setNumber,
  setOperator,
  updateValuePercent,
  setTotal,
  calculate,
  negate,
  percentage,
  clearAll,
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
        switch (key) {
          case "Delete":
            dispatch(clearAll());
            break;
          case "Equal":
            dispatch(setTotal());
            break;
          case "Negate":
            dispatch(negate());
            break;
          case "%":
            dispatch(percentage(key));
            dispatch(updateValuePercent());
            dispatch(calculate());
            break;
          default:
            dispatch(setOperator(key));
            dispatch(calculate());
            break;
        }
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
      className={`${styles.button} ${
        button.name === "equal" ? styles.equal : ""
      }`}
      style={{ gridArea: name }}
      onClick={() => handleClick()}
    >
      {text}
    </div>
  );
};

export default Button;

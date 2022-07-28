import { useSelector } from "react-redux";

import { selectCalculator } from "../../store/calculator/calculator.slice";

import Button from "../button/button.component";

import styles from "./calculator.module.scss";

import CALCULATOR_KEYS from "./calculator.keys";

const Calculator = () => {
  const calc = useSelector(selectCalculator);

  return (
    <div className={styles.wrapper}>
      <div className={styles.calculator}>
        <div className={styles.screen}>
          <div className={styles.equation}>
            <div>{calc.showEquation}</div>
            <div>{calc.total}</div>
          </div>
          <div className={styles.value}>
            <div>
              {calc.total} {calc.operator}{" "}
              <span className={calc.done ? "done" : ""}>{calc.number}</span>
            </div>
          </div>
        </div>
        <div className={styles.keys}>
          {CALCULATOR_KEYS.map((button) => (
            <Button
              key={button.name}
              button={button}
            />
          ))}
        </div>
      </div>
      <div className={styles.history}>
        {calc.history.map((log, idx) => (
          <div key={idx}>
            <div>{log.equation} =</div>
            <div>{log.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;

import classes from "../css/ValueSection.module.css";
import { getPopulatedValues, getResourceValues } from "../utils";

const ValueSection = (props) => {
  const values = getResourceValues(props);
  const populatedValues = getPopulatedValues(values);

  return (
    populatedValues.length > 0 && (
      <div
        className={classes["value-container"]}
        data-test="value-section"
      >
        <h3 className={classes["values-heading"]}>What value does it bring you?</h3>
        <ul>
          {populatedValues.map((value, i) => {
            return (
              <li key={i} className={classes["value-item"]}>
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}

export default ValueSection;

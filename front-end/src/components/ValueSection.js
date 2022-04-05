import classes from "../css/ValueSection.module.css";

function ValueSection(props) {
  const values = [
    props.resource.value_one,
    props.resource.value_two,
    props.resource.value_three,
  ];

  const filteredValues = values.filter((val) => {
    return val && val.length > 1;
  });

  return (
    filteredValues.length > 0 && (
      <div
        className={classes["value-container"]}
        data-test="value-section"
      >
        <h3>What value does it bring you?</h3>
        <ul>
          {filteredValues.map((value, i) => {
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

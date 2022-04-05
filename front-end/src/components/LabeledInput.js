import classes from "../css/LabeledInput.module.css";

function LabeledInput(props) {
  return (
    <div className={classes["inputContainer"]}>
      {props.error ? (
        <label
        className={classes["label"]} data-test={`${props?.dataAttr}-error`}>*{props.error}</label>
      ) : null}
      <input
        className={classes["input"]}
        id={props.item?.toLowerCase()}
        type={props.itemType}
        placeholder={props?.item}
        defaultValue={props?.defaultValue}
        value={props.value}
        onChange={props.onChange}
        data-test={props?.dataAttr}
      />
      <br />
    </div>
  );
}

export default LabeledInput;

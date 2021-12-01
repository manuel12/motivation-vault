import "../css/Input.css";

function Input(props) {
  return (
    <div className="inputContainer">
      {props.error ? (
        <label data-test={`${props?.dataAttr}-error`}>*{props.error}</label>
      ) : null}
      <input
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

export default Input;

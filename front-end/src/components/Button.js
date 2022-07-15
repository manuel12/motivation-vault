import "../css/Button.module.css";


const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={props.className}
      id={props.id}
      type={props.type}
      onClick={props.onClick}
      data-test={props["data-test"]}
    >{props.text}</button>
  );
};

export default Button;
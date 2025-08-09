import "./style/buttons.css";
function Button(props) {
  return (
    <button
      className={`btn text-white ${props.class}`}
      data-bs-target={props.data_bs_target}
      data-bs-toggle={props.data_bs_toggle}
      onClick={() => {
        // When using a function, you must put parentheses () to call it immediately.
        // Without parentheses, it means "pass the function reference to be called later".
        if (props.deleteProducts) props.deleteProducts();
        if (props.changeMode) props.changeMode();
      }}
    >
      {props.icon}
      {props.title}
    </button>
  );
}

export default Button;

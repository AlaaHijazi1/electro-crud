import "./style/StateCards.css";
function StateCards(props) {
  return (
    <div className="Card p-3">
      <div className="Card__icon">{props.icon}</div>
      <div className="Card__values">
        <small className="text-secondary">{props.title}</small>
        <h2 className="fw-bold fs-4">{props.value}</h2>
      </div>
    </div>
  );
}
export default StateCards;

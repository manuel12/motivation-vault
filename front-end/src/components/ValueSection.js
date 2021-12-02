function ValueSection(props) {
  return (
    <div className="value-section-container" data-test="value-section">
      <h3>What value does it bring you?</h3>
      <ul>
        <li>{props.resource.value_one}</li>
        <li>{props.resource.value_two}</li>
        <li>{props.resource.value_three}</li>
      </ul>
    </div>
  );
}

export default ValueSection;

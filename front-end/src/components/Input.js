function Input(props) {
  
  return(
    <div className="inputContainer">
      <input  
        id={props.item?.toLowerCase()} 
        type={props.itemType}
        placeholder={props?.item}
        value={props.value}
        onChange={props.onChange}
        data-test={props?.dataAttr}/> 
        <br/>
    </div>
  )
}

export default Input;
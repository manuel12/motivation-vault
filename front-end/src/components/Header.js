import classes from "../css/Header.module.css";

const Header = (props) => {
  return (
    <div>
      <header data-test="heading">
        <a className={classes["header-link"]} href="/">
          <h1>Motivation Vault</h1>
        </a>
      </header> 
    </div>
  );
}

export default Header;

import classes from "../css/Header.module.css";

function Header(props) {
  return (
    <div>
      <header data-test="heading">
        <a className={classes["header-link"]} href="/">
          <h1>Resource API Project</h1>
        </a>
      </header>
    </div>
  );
}

export default Header;

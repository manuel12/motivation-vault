import Navbar from "./Navbar";
import useToken from "./useToken";

import classes from "../css/Header.module.css";

const Header = (props) => {
  const { token, setToken, deleteToken } = useToken();

  return (
    <div className={classes["header"]} data-test="header">
      <div className={classes["header-title"]} data-test="header-title">
        <a className={classes["header-link"]} href="/">
          <h1>Motivation Vault</h1>
        </a>
      </div>
      <Navbar deleteToken={deleteToken} />
    </div>
  );
};

export default Header;

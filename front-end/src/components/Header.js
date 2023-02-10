import Navbar from "./Navbar";
import useToken from "./useToken";
import HeaderTitle from "./HeaderTitle";

import classes from "../css/Header.module.css";

const Header = (props) => {
  const { token, setToken, deleteToken } = useToken();

  return (
    <div className={classes["header"]} data-test="header">
      <HeaderTitle />
      <Navbar deleteToken={deleteToken} />
    </div>
  );
};

export default Header;

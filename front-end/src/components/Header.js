import "../css/Header.css";

function Header(props) {
  return (
    <div>
      <header className="app-header">
        <a className="header-link" href="/">
          <h1>Resource API Project</h1>
        </a>
      </header>
    </div>
  );
}

export default Header;

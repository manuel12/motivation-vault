import '../css/Navbar.css';

function Navbar({ deleteToken }) {
  const logoutUser = () => {
    deleteToken()
    window.location.href = '/';
  }


  return  (
    <div className="app-nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/"
            data-test="home-link">Home</a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/books/"
            data-test="books-link">Books</a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/podcasts/"
            data-test="podcasts-link">Podcasts</a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/motivational-speeches/"
            data-test="motivational-speeches-link">Motivational Speeches</a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/about/"
            data-test="about-link">About</a>
        </li>
        <li className="nav-item">
          <div
            className="nav-item-link "
            onClick={()=> {logoutUser()}}
            data-test="logout-link">Logout</div>
        </li>
      </ul>
    </div>
    )
}

export default Navbar;
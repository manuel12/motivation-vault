import '../css/Navbar.css';

function Navbar({ deleteToken }) {
  const logoutUser = () => {
    console.log('logout')
    deleteToken()
    window.location.href = '/';
  }


  return  (
    <div className="app-nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <a className="nav-item-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/books/">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/podcasts/">Podcasts</a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/motivational-speeches/">Motivational Speeches</a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/about/">About</a>
        </li>
        <li className="nav-item">
          <div className="nav-item-link " onClick={()=> {logoutUser()}}>Logout</div>
        </li>
      </ul>
    </div>
    )
}

export default Navbar;
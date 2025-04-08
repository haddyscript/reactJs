import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/authSlice'; 
import "../components/NavBar.css"; 

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user state from Redux store
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    navigate('/login'); 
    dispatch(logout());  
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Hadrian Evarula</h2>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/profile">Profile</a></li>

        {!user ? (
          <li><a href="/login">Login</a></li>
        ) : (
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              {user.name}
            </span>
            {dropdownOpen && (
              <ul className="dropdown-menu show" aria-labelledby="navbarDropdown">
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

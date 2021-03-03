import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { removeAuthToken } from '../services/authService';
import { HouseFill } from 'react-bootstrap-icons';

function Navigation({ user }) {
  const handleLogout = () => {
    removeAuthToken();
    window.location = '/login';
  };

  return (
    <div className='shadow-sm bg-white rounded'>
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand ' to='/'>
            <HouseFill />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto '>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/products'>
                  Products
                </NavLink>
              </li>
              {[1].includes(user.roleId) && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/movies'>
                    Movies
                  </NavLink>
                </li>
              )}
            </ul>
            {/* Right aligned Menu Items */}
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/account'>
                  {user.firstName} {user.lastName}
                </NavLink>
              </li>
            </ul>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;

import { NavLink } from 'react-router-dom';

import './styles.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-expand-lg navbar-light">
        <div className="custom-navbar" id="navbarSupportedContent">
          <NavLink to="/" className="navbar-brand">
            MovieFlix - Bootcamp 3.0 Dev Superior
          </NavLink>
          <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-outline-dark btn-sm my-2 my-sm-0">
              SAIR
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

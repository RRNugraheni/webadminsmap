import React from 'react';

const Navbar = () => {
  const user = {
    nama: 'Administrator',
    role: 'Administrator',
  }
  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <a className="navbar-brand brand-logo" href="index.php">
          <img src="assets/images/logo.jpeg" style={{ height: '140%', width: '70%' }} alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown d-none d-xl-inline-block user-dropdown">
            <a className="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <img className="img-xs rounded-circle" src="assets/images/faces/face.png" alt="Profile image" />{' '}
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
              <div className="dropdown-header text-center">
                <img className="img-md rounded-circle" src="assets/images/faces/face.png" alt="Profile image" />
                <p className="mb-1 mt-3 font-weight-semibold">{user.nama}</p>
                <p className="font-weight-light text-muted mb-0">{user.role}</p>
              </div>
              <a className="dropdown-item" href="/login">
                Keluar<i className="dropdown-item-icon ti-power-off"></i>
              </a>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

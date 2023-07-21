import React from 'react';

const Sidebar = () => {
  const role = "Admin";
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="profile-image">
              <img className="img-xs rounded-circle" src="assets/images/faces/face.png" alt="profile image" />
            </div>
            <div className="text-wrapper">
              <p className="profile-name">Admin</p>
              <p className="designation">Admin</p>
            </div>
          </a>
        </li>
        <li className="nav-item nav-category">Daftar Menu</li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="menu-icon typcn typcn-document-text"></i>
            <span className="menu-title">Beranda</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/user">
            <i className="menu-icon typcn typcn-document-text"></i>
            <span className="menu-title">Data User</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i className="menu-icon typcn typcn-coffee"></i>
            <span className="menu-title">Data Master</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="/apar">Data APAR</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/p3k">Data P3K</a>
              </li>
            </ul>
          </div>
        </li>
        {/* Cuma bisa diakses Kepala Apoteker */}
        {/* {role === 'Admin' && (
          <li className="nav-item">
            <a className="nav-link" href="?menu=laporan">
              <i className="menu-icon typcn typcn-shopping-bag"></i>
              <span className="menu-title">Laporan</span>
            </a>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Sidebar;

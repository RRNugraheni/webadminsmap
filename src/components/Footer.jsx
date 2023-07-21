import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ marginTop: '10px' }}>
      <div className="container-fluid clearfix">
        <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2021 RR Nugraheni. All rights reserved.</span>
        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
          Made with <i className="mdi mdi-heart text-danger"></i> and Bootstrap <i className="fa fa-smile-o"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

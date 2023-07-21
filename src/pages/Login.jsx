import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Dummy user data for login
  const dummyUserData = {
    username: 'Admin',
    password: '12345678',
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Check if the entered username and password match the dummy user data
    if (username === dummyUserData.username && password === dummyUserData.password) {
      // Login successful
      // Set 'isLoggedIn' to true in localStorage to indicate the user is logged in
      localStorage.setItem('isLoggedIn', 'true');

      // Navigate to the Dashboard
      navigate('/');
    } else {
      // Invalid username or password
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Username dan Password Salah.',
      });
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div className="row w-100">
            <div className="col-lg-4 mx-auto">
              <div className="auto-form-wrapper">
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="label">Username</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukan Username Anda"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label">Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Masukan Password Anda"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary submit-btn btn-block" type="submit">
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Login;

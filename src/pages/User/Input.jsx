import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const UserDataForm = () => {
  const navigate = useNavigate();
  const { act, id } = useParams();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    username: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyD9lUq2ZYv-yM88goN6lC9dbBcvuobKo_o",
        authDomain: "smartri.firebaseapp.com",
        databaseURL: "https://smartri-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "smartri",
        storageBucket: "smartri.appspot.com",
        messagingSenderId: "865477741683",
        appId: "1:865477741683:web:a1391889a947ed4f286e06",
        measurementId: "G-5SVS43JRMJ"
      };
      initializeApp(firebaseConfig);
    }

    if (act === 'update') {
      // Fetch user data for update
      const fetchUserData = async () => {
        const db = getFirestore();
        const userRef = doc(db, 'User', id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFormData({
            nama_lengkap: userData.nama_lengkap,
            username: userData.username,
            role: userData.role,
            password: userData.password, // Assuming you want to set the password field too.
          });
          console.log(userData);
        } else {
          console.log('User data not found!');
        }
      };
      fetchUserData();
    }
  }, [act, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyD9lUq2ZYv-yM88goN6lC9dbBcvuobKo_o",
        authDomain: "smartri.firebaseapp.com",
        databaseURL: "https://smartri-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "smartri",
        storageBucket: "smartri.appspot.com",
        messagingSenderId: "865477741683",
        appId: "1:865477741683:web:a1391889a947ed4f286e06",
        measurementId: "G-5SVS43JRMJ"
      };
      initializeApp(firebaseConfig);
    }

    const db = getFirestore();
    if (act === 'update') {
      // Update user data
      const userRef = doc(db, 'User', id);
      await updateDoc(userRef, formData);
      console.log('User data updated successfully!');
      navigate('/user');
    } else {
      // Add new user data
      const userCollectionRef = collection(db, 'User');
      await addDoc(userCollectionRef, formData);
      console.log('New user data added successfully!');
      navigate('/user');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <center>
          <h2 className="card-title">{act === 'update' ? 'Ubah Data' : 'Tambah User'}</h2>
        </center>
        <form onSubmit={handleSubmit} className="forms-sample">
          {act === 'update' && (
            <input type="hidden" name="id" value={id} />
          )}
          <div className="form-group">
            <label htmlFor="exampleInputName1">Nama {act === 'update' ? 'Admin' : 'User'}</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="nama_lengkap"
              placeholder={`Nama ${act === 'update' ? 'Admin' : 'User'}`}
              value={formData.nama_lengkap}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="username"
              placeholder="Username User"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Role</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="role"
              placeholder="Role User"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          {act !== 'update' && (
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword4"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <center>
            <button type="submit" className="btn btn-success mr-2">
              {act === 'update' ? 'Submit' : 'Masukan Data'}
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;

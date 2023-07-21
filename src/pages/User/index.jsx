import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, deleteDoc, doc} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const DataUser = () => {
  const [users, setUsers] = useState([]);

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

    // Get the 'pengguna' collection from Firestore
    const db = getFirestore();
    const q = query(collection(db, 'User'), where('role', 'in', ['Operator', 'Supervisor']), orderBy('nama_lengkap'));

    getDocs(q)
      .then((querySnapshot) => {
        // Convert query snapshot to an array of user objects
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
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
      const userRef = doc(db, 'User', id);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
      // Fetch updated users data after deletion
      const q = query(collection(db, 'User'), where('role', 'in', ['Operator', 'Supervisor']), orderBy('nama_lengkap'));
      const querySnapshot = await getDocs(q);
      const updatedUsersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(updatedUsersData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <div style={{ marginBottom: '10px' }}>
              <Link to="/user/input?act=create">
                <button type="button" className="btn btn-outline-primary btn-inverse-* btn-fw">
                  Tambah User
                </button>
              </Link>
              <div className="card">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th> No </th>
                        <th> Nama User </th>
                        <th> Username </th>
                        <th> Role </th>
                        <th> Aksi </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td> {index + 1} </td>
                          <td> {user.nama_lengkap} </td>
                          <td> {user.username} </td>
                          <td> {user.role} </td>
                          <td>
                            <Link to={`/user/update/${user.id}`}>
                              <button type="button" className="btn btn-primary">
                                <i className="fa fa-pencil-square-o"></i> Update
                              </button>
                            </Link>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                              <i className="fa fa-trash-o"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default DataUser;

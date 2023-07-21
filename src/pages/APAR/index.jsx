import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const DataAPAR = () => {
  const [apar, setApar] = useState([]);

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

    // Get the 'APAR' collection from Firestore
    const db = getFirestore();
    const q = query(collection(db, 'APAR'));

    getDocs(q)
      .then((querySnapshot) => {
        const aparData = [];
        querySnapshot.forEach((doc) => {
          aparData.push({ id: doc.id, ...doc.data() });
        });
        setApar(aparData);
      })
      .catch((error) => {
        console.error('Error fetching APAR data:', error);
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
      const userRef = doc(db, 'APAR', id);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
      // Fetch updated users data after deletion
      const q = query(collection(db, 'APAR'));
      const querySnapshot = await getDocs(q);
      const updatedUsersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApar(updatedUsersData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div style={{ marginBottom: '10px' }}>
              <Link to="/apar/input?act=create">
                <button type="button" className="btn btn-outline-primary btn-inverse-* btn-fw">
                  Tambah Data APAR
                </button>
              </Link>
              <div className="card">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th> No </th>
                        <th> ID Apar </th>
                        <th> Jenis Apar </th>
                        <th> Lokasi APAR </th>
                        <th> Kondisi </th>
                        <th> Tanggal Terakhir </th>
                        <th> Keterangan </th>
                        <th> Aksi </th>
                      </tr>
                    </thead>
                    <tbody>
                      {apar.map((data, index) => (
                        <tr key={data.id}>
                          <td> {index + 1} </td>
                          <td> {data.id_apar} </td>
                          <td> {data.jenis} </td>
                          <td> {data.lokasi} </td>
                          <td> {data?.kondisi} </td>
                          <td> {data?.tanggal?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </td>
                          <td> {data?.keterangan} </td>
                          <td>
                            {/* <Link to={`?menu=data_apar&act=update&id=${data.id}`}>
                              <button type="button" className="btn btn-primary">
                                <i className="fa fa-pencil-square-o"></i> Detail
                              </button>
                            </Link> */}
                            <Link to={`/apar/update/${data.id}`}>
                              <button type="button" className="btn btn-primary">
                                <i className="fa fa-pencil-square-o"></i> Update
                              </button>
                            </Link>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(data.id)}>
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

export default DataAPAR;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const DataP3K = () => {
  const [dataP3K, setDataP3K] = useState([]);

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

    // Get the 'data_p3k' collection from Firestore
    const db = getFirestore();
    const q = query(collection(db, 'P3K'));

    getDocs(q)
      .then((querySnapshot) => {
        // Convert query snapshot to an array of dataP3K objects
        const dataP3KData = [];
        querySnapshot.forEach((doc) => {
          dataP3KData.push({ id: doc.id, ...doc.data() });
        });
        setDataP3K(dataP3KData);
      })
      .catch((error) => {
        console.error('Error fetching Data P3K:', error);
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
      const userRef = doc(db, 'P3K', id);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
      // Fetch updated users data after deletion
      const q = query(collection(db, 'P3K'));
      const querySnapshot = await getDocs(q);
      const updatedUsersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDataP3K(updatedUsersData);
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
              <Link to="/p3k/input">
                <button type="button" className="btn btn-outline-primary btn-inverse-* btn-fw">
                  Tambah Data P3K
                </button>
              </Link>
              <div className="card">
                <div className="card-body">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th> No </th>
                        <th> ID P3K </th>
                        <th> Lokasi </th>
                        <th> Terakhir Inspeksi </th>
                        <th> Alkohol </th>
                        <th> Aquade </th>
                        <th> Betadin </th>
                        <th> Buku Catatan </th>
                        <th> Buku Panduan </th>
                        <th> Daftar Isi </th>
                        <th> Gelas </th>
                        <th> Gunting </th>
                        <th> Kain Segitiga </th>
                        <th> Kantong Plastik </th>
                        <th> Kapas </th>
                        <th> Kasa </th>
                        <th> Lampu Senter </th>
                        <th> Masker </th>
                        <th> Nama </th>
                        <th> Peniti </th>
                        <th> Perban </th>
                        <th> Pinset </th>
                        <th> Plester Cepat </th>
                        <th> Sarung Tangan </th>
                        <th> Kondisi </th>
                        <th> Keterangan </th>
                        <th> Aksi </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataP3K.map((data, index) => (
                        <tr key={data.id}>
                          <td> {index + 1} </td>
                          <td> {data.id_p3k} </td>
                          <td> {data.lokasi} </td>
                          <td> {data.tanggal?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </td>
                          <td> {data.alkohol} </td>
                          <td> {data.aquade} </td>
                          <td> {data.betadin} </td>
                          <td> {data.bukuCatatan} </td>
                          <td> {data.bukuPanduan} </td>
                          <td> {data.daftarIsi} </td>
                          <td> {data.gelas} </td>
                          <td> {data.gunting} </td>
                          <td> {data.kainSegitiga} </td>
                          <td> {data.kantongPlastik} </td>
                          <td> {data.kapas} </td>
                          <td> {data.kasa} </td>
                          <td> {data.lampuSenter} </td>
                          <td> {data.masker} </td>
                          <td> {data.name} </td>
                          <td> {data.peniti} </td>
                          <td> {data.perban} </td>
                          <td> {data.pinset} </td>
                          <td> {data.plesterCepat} </td>
                          <td> {data.sarungTangan} </td>
                          <td> {data.kondisi} </td>
                          <td> {data.keterangan} </td>
                          <td>
                            <Link to={`/p3k/update/${data.id}`}>
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

export default DataP3K;

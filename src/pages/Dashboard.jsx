import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [jml_user, setJmlUser] = useState(0);
  const [jml_apar, setJmlApar] = useState(0);
  const [jml_p3k, setJmlP3k] = useState(0);

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

    // Fetch data from Firestore
    const fetchData = async () => {
      const db = getFirestore();
      const usersCollectionRef = collection(db, 'User');
      const aparCollectionRef = collection(db, 'APAR');
      const p3kCollectionRef = collection(db, 'P3K');

      const usersSnapshot = await getDocs(usersCollectionRef);
      const aparSnapshot = await getDocs(aparCollectionRef);
      const p3kSnapshot = await getDocs(p3kCollectionRef);

      // Update the state with the fetched data
      setJmlUser(usersSnapshot.size);
      setJmlApar(aparSnapshot.size);
      setJmlP3k(p3kSnapshot.size);
    };

    fetchData();
  }, []);

  return (
    <div className="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />

        <div class="main-panel">
          <div class="content-wrapper">

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 grid-margin stretch-card average-price-card">
                    <div className="card text-white">
                      <div className="card-body">
                        <div className="d-flex justify-content-between pb-2 align-items-center">
                          <h2 className="font-weight-semibold mb-0">{jml_user}</h2>
                          <div className="icon-holder">
                            <i className="fa fa-group"></i>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h5 className="font-weight-semibold mb-0">Jumlah User</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 grid-margin stretch-card average-price-card">
                    <div className="card text-white">
                      <div className="card-body">
                        <div className="d-flex justify-content-between pb-2 align-items-center">
                          <h2 className="font-weight-semibold mb-0">{jml_apar}</h2>
                          <div className="icon-holder">
                            <i className="fa fa-group"></i>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h5 className="font-weight-semibold mb-0">Jumlah APAR</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 grid-margin stretch-card average-price-card">
                    <div className="card text-white">
                      <div className="card-body">
                        <div className="d-flex justify-content-between pb-2 align-items-center">
                          <h2 className="font-weight-semibold mb-0">{jml_p3k}</h2>
                          <div className="icon-holder">
                            <i className="fa fa-university"></i>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h5 className="font-weight-semibold mb-0">Jumlah P3K</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

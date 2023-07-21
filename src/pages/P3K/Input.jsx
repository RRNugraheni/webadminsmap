import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const P3KInputForm = () => {
  const navigate = useNavigate();
  const { act, id } = useParams();
  const [formData, setFormData] = useState({
    id_p3k: '',
    lokasi: '',
    terakhir_inspeksi: '',
    kondisi: '',
    keterangan: '',
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
      // Fetch P3K data for update
      const fetchP3KData = async () => {
        try {
          const db = getFirestore();
          const p3kRef = doc(db, 'P3K', id);
          const p3kSnap = await getDoc(p3kRef);
          if (p3kSnap.exists()) {
            const p3kData = p3kSnap.data();
            setFormData({
              id_p3k: p3kData.id_p3k,
              lokasi: p3kData.lokasi,
              tanggal: p3kData.terakhir_inspeksi,
              kondisi: p3kData.kondisi,
              keterangan: p3kData.keterangan,
            });
          } else {
            console.log('P3K data not found!');
          }
        } catch (error) {
          console.error('Error fetching P3K data:', error);
        }
      };
      fetchP3KData();
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
      // Update P3K data
      const p3kRef = doc(db, 'P3K', id);
      await updateDoc(p3kRef, formData);
      console.log('P3K data updated successfully!');
      navigate('/p3k');
    } else {
      // Add new P3K data
      const p3kCollectionRef = collection(db, 'P3K');
      await addDoc(p3kCollectionRef, formData);
      console.log('New P3K data added successfully!');
      navigate('/p3k');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <center>
          <h2 className="card-title">{act === 'update' ? 'Ubah Data P3K' : 'Tambah P3K'}</h2>
        </center>
        <form onSubmit={handleSubmit} className="forms-sample">
          <div className="form-group">
            <label htmlFor="exampleInputName1">ID P3K</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="id_p3k"
              placeholder="ID P3K"
              value={formData.id_p3k}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Lokasi</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="lokasi"
              placeholder="Lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              required
            />
          </div>
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

export default P3KInputForm;

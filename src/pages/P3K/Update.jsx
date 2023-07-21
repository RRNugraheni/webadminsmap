import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const UpdateP3K = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

    // Fetch P3K data for update
    const fetchP3KData = async () => {
      const db = getFirestore();
      const p3kRef = doc(db, 'P3K', id);
      const p3kSnap = await getDoc(p3kRef);

      if (p3kSnap.exists()) {
        const p3kData = p3kSnap.data();
        setFormData({
          id_p3k: p3kData.id_p3k,
          lokasi: p3kData.lokasi,
          terakhir_inspeksi: p3kData.terakhir_inspeksi,
          kondisi: p3kData.kondisi,
          keterangan: p3kData.keterangan,
        });
      } else {
        console.log('P3K data not found!');
      }
    };
    fetchP3KData();
  }, [id]);

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
    // Update P3K data
    const p3kRef = doc(db, 'P3K', id);
    await updateDoc(p3kRef, formData);
    console.log('P3K data updated successfully!');
    navigate('/p3k');
  };

  return (
    <div className="card">
      <div className="card-body">
        <center>
          <h2 className="card-title">Ubah Data P3K</h2>
        </center>
        <form onSubmit={handleSubmit} className="forms-sample">
          <input type="hidden" name="id" value={id} />
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
            <label htmlFor="exampleInputName1">Lokasi P3K</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="lokasi"
              placeholder="Lokasi P3K"
              value={formData.lokasi}
              onChange={handleChange}
              required
            />
          </div>
          <center>
            <button type="submit" className="btn btn-success mr-2">
              Submit
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default UpdateP3K;

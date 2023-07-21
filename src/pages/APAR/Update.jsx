import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const UpdateAPAR = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id_apar: '',
        jenis: '',
        lokasi: '',
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

        // Fetch APAR data for update
        const fetchAPARData = async () => {
            const db = getFirestore();
            const aparRef = doc(db, 'APAR', id);
            const aparSnap = await getDoc(aparRef);

            if (aparSnap.exists()) {
                const aparData = aparSnap.data();
                setFormData({
                    id_apar: aparData.id_apar,
                    jenis: aparData.jenis,
                    lokasi: aparData.lokasi,
                });
            } else {
                console.log('APAR data not found!');
            }
        };
        fetchAPARData();
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
        // Update APAR data
        const aparRef = doc(db, 'APAR', id);
        await updateDoc(aparRef, formData);
        console.log('APAR data updated successfully!');
        navigate('/apar');
    };

    return (
        <div className="card">
            <div className="card-body">
                <center>
                    <h2 className="card-title">Ubah Data APAR</h2>
                </center>
                <form onSubmit={handleSubmit} className="forms-sample">
                    <input type="hidden" name="id" value={id} />
                    <div className="form-group">
                        <label htmlFor="exampleInputIDAPAR">ID APAR</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputIDAPAR"
                            name="id_apar"
                            placeholder="ID APAR"
                            value={formData.id_apar}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputJenis">Jenis APAR</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputJenis"
                            name="jenis"
                            placeholder="Jenis APAR"
                            value={formData.jenis}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputLokasi">Lokasi APAR</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputLokasi"
                            name="lokasi"
                            placeholder="Lokasi APAR"
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

export default UpdateAPAR;

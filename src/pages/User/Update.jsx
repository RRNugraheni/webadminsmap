import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
                    // We don't set the password field during an update.
                    // This way, the password remains unchanged in the Firestore.
                });
            } else {
                console.log('User data not found!');
            }
        };
        fetchUserData();
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
        // Update user data
        const userRef = doc(db, 'User', id);
        await updateDoc(userRef, formData);
        console.log('User data updated successfully!');
        navigate('/user');
    };

    return (
        <div className="card">
            <div className="card-body">
                <center>
                    <h2 className="card-title">Ubah Data</h2>
                </center>
                <form onSubmit={handleSubmit} className="forms-sample">
                    <input type="hidden" name="id" value={id} />
                    <div className="form-group">
                        <label htmlFor="exampleInputName1">Nama Admin</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            name="nama_lengkap"
                            placeholder="Nama Admin"
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

export default UpdateUser;

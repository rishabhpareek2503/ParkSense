import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Layout, NoPage, Parking } from './pages';
import ParkingForm from './pages/ParkingForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Space from './pages/Space';
import SpaceForm from './pages/SpaceForm';
import BookingForm from './pages/BookingForm';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Users from './pages/Users';
import About from './pages/About';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="parking" element={<Parking />} />
          <Route path="parkingForm" element={<ParkingForm />} />
          <Route path="space" element={<Space />} />
          <Route path="spaceForm" element={<SpaceForm />} />
          <Route path="bookingForm" element={<BookingForm />} />
          <Route path="booking" element={<Booking />} />
          <Route path="profile" element={<Profile />} />
          <Route path="review" element={<Reviews />} />
          <Route path="users" element={<Users />} />
          <Route path="about" element={<About />} />
          {/* New route for Google login */}
          <Route path="auth/google" element={<GoogleLogin setUser={setUser} />} />
        </Route>
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component for Google login
const GoogleLogin = ({ setUser }) => {
  useEffect(() => {
    const loginWithGoogle = async () => {
      try {
        const response = await axios.get('/auth/google/callback');
        setUser(response.data);
      } catch (error) {
        console.error('Google login failed:', error);
      }
    };

    loginWithGoogle();
  }, [setUser]);

  return null;
};

export default App;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // ✅ Add this line

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', { username, password });
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert('Username already exists');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sweet Shop Registration</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/">Login here</a></p>
    </div>
  );
}

export default Register;

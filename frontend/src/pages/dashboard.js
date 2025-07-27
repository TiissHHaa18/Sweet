import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/sweets', {
          headers: { token }
        });
        setSweets(res.data);
      } catch (err) {
        alert('Unauthorized. Please login again.');
        navigate('/');
      }
    };

    fetchSweets();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <header className="dashboard-navbar">
        <h1>Sweet Shop Managemnt System</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Sidebar + Content */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <Link to="/dashboard"> Home</Link>
          <Link to="/add">➕ Add Sweet</Link>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <h2>Sweets Inventory</h2>
          <div className="sweet-list">
            {sweets.map(sweet => (
              <div className="sweet-card" key={sweet.id}>
                <h3>{sweet.name}</h3>
                <p>₹{sweet.price} | Qty: {sweet.quantity}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

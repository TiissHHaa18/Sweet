import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSweet() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/sweets', { name, price, quantity }, {
        headers: { token }
      });
      alert('Sweet added!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to add sweet');
    }
  };

  return (
    <div>
      <h2>Add Sweet</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <br />
        <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} required />
        <br />
        <button type="submit">Add Sweet</button>
      </form>
    </div>
  );
}

export default AddSweet;

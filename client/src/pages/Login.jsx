import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      } else {
        console.log('User successfully logged in!');
      }
      setLoading(false);
      setError(null);
      navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };

  return ( 
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          onChange={handleChange}
          type="email" 
          placeholder="Email" 
          className="border p-3 rounded-lg"  
          id="email"
        />
        <input 
          onChange={handleChange}
          type="password" 
          placeholder="Password" 
          className="border p-3 rounded-lg"  
          id="password"
        />
        <button 
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50"
        >
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-slate-700 hover:underline">
          <span>Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
   );
}
 
export default Login;
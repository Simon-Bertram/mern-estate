import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  };

  const handleDeleteuser = async () => {
    try {
      res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('signout');
    } catch (error) {
      console.log(error);
    }
  };


  return ( 
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form 
        onSubmit={handlesubmit}
        className='flex flex-col gap-4'
      >
        <input type="text" />
        <img 
          src={FormData.avatar || currentUser.avatar} 
          alt="profile picture" 
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <input 
          type="text" 
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onClick={handleChange}
        />
        <input 
          type="email" 
          placeholder='email'
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link 
          to={'/create-listing'}
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90'
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteuser}
          className='text-red-700 p-3 rounded-lg cursor-pointer uppercase text-center hover:opacity-90 hover:border hover:border-red-700'
        >
            Delete Account
        </span>
        <span
          onClick={handleDeleteuser}
          className='text-red-700 p-3 rounded-lg cursor-pointer uppercase text-center hover:border hover:border-red-700'
        >
            Sign Out
        </span>
      </div>
    </div>
   );
}
 
export default Profile;
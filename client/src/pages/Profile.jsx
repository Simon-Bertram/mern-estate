import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from 'firebase/storage'
import { app } from '../firebase'
import { 
  updateUserStart, 
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../redux/user/userSlice.js'

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();
  const fileRef = useRef();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 1 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handlesubmit = (e) => {
    e.preventDefault()
    try {
      console.log('submit')
    } catch (error) {
      
    }
  };

  const handleDeleteuser = async () => {
    try {
      dispatch(deleteUserStart());
      res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
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
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} 
          hidden 
          accept='image/*' 
        />
        <img 
          src={FormData.avatar || currentUser.avatar} 
          alt="profile picture" 
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className='text-sm self-center'>
          {fileUploadError && (
            <span className='text-red-700'>
              Error uploading file. Please try again. (Image must be less than 2MB)
            </span>
          )}
          {filePercentage > 0 && filePercentage < 100 && (
            <span className='text-slate-700'>
              {`Uploading file: ${filePercentage}%`}
            </span>
          )}
          {filePercentage === 100 && (
            <span className='text-green-700'>
              Image uploaded successfully.
            </span>
          )}
        </p>
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
        <p className='text-green-700 mt-5'>{updateUserSuccess ? 'User is updated successfully!' : ""}</p>
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
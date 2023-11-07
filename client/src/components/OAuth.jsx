import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../firebase';
import { sign } from 'jsonwebtoken';

const OAuth = () => {

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log('Could not sign in with Google.', error.message);
    }
  };

  return ( 
    <button 
      onClick={handleGoogleClick} 
      type="button" 
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      <h1>Continue with Google</h1>
    </button>
   );
}
 
export default OAuth;

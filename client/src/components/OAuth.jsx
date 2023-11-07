const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      
    } catch (error) {
      console.log('Could not sign in with Google', error.message);
    }
  };

  return ( 
    <button type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80 w-full mt-3">
      Continue with Google
    </button>
   );
}
 
export default OAuth;
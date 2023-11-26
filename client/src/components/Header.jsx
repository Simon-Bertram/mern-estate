import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser.avatar);

  return ( 
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Bertram</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500"/>
        </form>
        <nav>
          <ul className="flex items-center gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/register">
              <li className="text-slate-700 hover:underline">
                Sign Up
              </li>
            </Link>
            <Link to="/profile" className="flex items-center">
            {currentUser ? (
              <img 
                src={currentUser.avatar} 
                alt="profile" 
                className="w-12 h-12 rounded-full object-cover cursor-pointer self-center mt-2"
              />
              ): (
                <li className="text-slate-700 hover:underline">
                  Sign In
                </li>
              )}
            </Link>
          </ul>
        </nav>
      </div>

    </header>
   );
}




export default Header;
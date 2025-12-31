import { Link } from "react-router-dom";
import { useauth } from "./context/authcontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  const { user,fetchuser,setuser }  = useauth();
  const navigate = useNavigate();

  const role = user ? user.user.role : null;
  
  const logout = () => {
    axios.post("http://localhost:3000/user/logout",{},
        {
          withCredentials: true
        }
       )
    .then((res) => {
      setuser(null);
      navigate("/login");
    })
  };

  return (
    <>
    <nav className="bg-white border-purple-400 md:border-b-2 px-6 py-4">
    <div className="md:max-w-7xl md:mx-auto md:flex md:items-center items-center justify-between">
    
    <div className="text-2xl font-black text-purple-600">
      <Link to={"/"}>Job Portal</Link>
    </div>

    <div className="flex md:flex items-center justify-center md:space-x-8 space-x-6 overflow-clip">
      <Link to={"/jobs"} className="text-lg md:text-xl text-purple-600 font-bold hover:text-purple-700 transition-colors">Jobs</Link>
      {user && role === "a" &&
      <Link to={`/savedjobs/${user.user.userid}`} className="text-lg md:text-xl text-purple-600 font-bold hover:text-purple-700 transition-colors">My jobs</Link>
      }
      {user && role === "a" && <Link to={`/applications/${user.user.userid}`} className="text-lg md:text-xl text-purple-600 font-bold hover:text-purple-700 transition-colors">Applications</Link>}
      {!user ? (
      <Link to={"/login"}><button className='md:px-4 px-2 md:py-1.5 py-1 border-2 cursor-pointer hover:border-purple-600 rounded-lg bg-purple-700 hover:bg-white text-white text-lg font-bold hover:text-purple-700 transition-colors'>Login</button></Link>
      ) : (
      <button className='md:px-4 px-2 md:py-1.5 py-1 border-2 cursor-pointer hover:border-purple-600 rounded-lg bg-purple-700 hover:bg-white text-white text-lg md:text-xl font-bold hover:text-purple-700 transition-colors' onClick={logout}>Logout</button>
      )}
    </div>
    </div>
    </nav>
    </>
  )
}
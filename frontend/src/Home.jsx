import hero from './assets/Hero img.jfif'
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom";
import { useauth } from "./context/authcontext";

export default function Home(){
    const { user } = useauth();

    const role = user ? user.user.role : null;

    const navigate = useNavigate();

return(
    <>
        <div className="bg-purple-600 text-white max-w-6xl lg:mx-auto my-8 p-6 md:p-12 rounded-xl shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-18 items-center">
        <div className="flex justify-center order-1">
            <img 
                className="w-full max-w-sm md:max-w-md lg:max-w-full h-auto md:h-100 object-cover rounded-2xl" 
                src={hero} 
                alt="" 
            />
        </div>
        
        <div className='w-full text-center lg:text-left order-2'>
            {role && role == "r" ? (
            <h1 className='font-sans font-black text-3xl md:text-5xl tracking-wide mb-4 leading-tight'>
                Hiring top talent? We're here for you
            </h1>
            ) : (
            <h1 className='font-sans font-black text-3xl md:text-5xl tracking-wide mb-4 leading-tight'>
                Looking for a job? We're here for you
            </h1>
            )}
            
            <div className='font-sans text-lg md:text-xl font-medium mb-6 tracking-wide opacity-90'>
                {role && role == "r" ? (
                <p className='leading-relaxed'>
                    Connect with world-class professionals and build the team that defines your company’s future. Our platform bridges the gap between vision and execution, offering the precision tools you need to find, track, and hire the perfect fit for your culture.
                </p>
                ) : (
                <p className='leading-relaxed'>
                    Connect with top industry leaders and discover career-defining best opportunities. 
                    Our platform bridges the gap between talent and ambition, offering the tools you 
                    need to build a professional future that lasts.
                </p>
                )}
            </div>
            {role && role == "r" ? (
            <Link to={"/newjobpost"} className='px-4 py-2 border-2 border-transparent hover:border-white rounded-xl bg-white text-purple-600 hover:bg-transparent hover:text-white text-lg font-bold tracking-wide transition-all duration-300 cursor-pointer shadow-lg'>
                Post now
            </Link>
            ) : (
            <Link to={"/jobs"} className='px-4 py-2 border-2 border-transparent hover:border-white rounded-xl bg-white text-purple-600 hover:bg-transparent hover:text-white text-lg font-bold tracking-wide transition-all duration-300 cursor-pointer shadow-lg'>
                Explore now
            </Link>  
            )}
            </div>
        </div>
        </div>
    </>
);
}
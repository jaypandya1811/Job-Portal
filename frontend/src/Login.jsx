import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import axios from "axios";
import { useauth } from "./context/authcontext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(){

    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
      } = useForm({});
    
    const { user,fetchuser }  = useauth();

    const navigate = useNavigate();

    const userlogin = (data) => {
       axios.post("http://localhost:3000/user/login",data,
        {
          withCredentials: true
        }
       )
       .then((res) => {
        fetchuser();
        toast.success("Log in successfull");
        navigate("/");
       })
       .catch((err) => {
        if (err.response) {
        const status = err.response.status;
        const message = err.response.data.message;

        if(status === 406){
          toast.error(message);
        }
        }
       });
    };

    return(
        <>
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-2xl border border-gray-100 my-10">
  <div className="mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900">Login to Account</h2>
  </div>

  <form className="space-y-6" method="post" onSubmit={handleSubmit(userlogin)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
        <input type="email"
         placeholder="Enter your E-mail"
         {...register("email",
          {required : true,
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address"
          }
          })}
         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
         {errors.email && ( <span className="text-red-600 font-semibold py-2">{errors.email.message}</span> )}        
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
        <input type="password"
         {...register("password",{required : true})}
         placeholder="Enter your password"
         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
         {errors.password && <span className="text-red-600 font-semibold py-2">Password is required</span>}        
      </div>
    </div>

    <div className="flex justify-between pt-6 mt-4">
      <button type="button" className="py-2.5 text-sm md:text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">
        Don't have an account? <Link className="text-blue-800 cursor-pointer" to={"/register"}>Register</Link>
      </button>
      <button 
        type="submit" 
        className="px-6 py-3 md:px-10 md:py-3 md:text-lg bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:shadow-lg transition-all"
      >
        Login
      </button>
    </div>
  </form>
</div>
        </>
    );
}
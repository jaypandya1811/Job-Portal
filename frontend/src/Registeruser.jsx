import { data, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function Registeruser(){
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    } = useForm({
      defaultValues: {
      }
    });

    const navigate = useNavigate();

    const [role,setrole] = useState(null);

    const saveuser = (data) => {
    const formdata = new FormData();

  Object.keys(data).forEach((key) => {
    if(key !== "resume"){
      formdata.append(key, data[key]);
    }
  });

  if (role !== "r" && data.resume && data.resume[0]) {
    formdata.append("resume", data.resume[0]);
  }

      axios.post("http://localhost:3000/user/registeruser",formdata)
      .then((res) => {
        toast.success("Registered");
        navigate("/login");
        reset();
      })
      .catch((error) => {
        if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        
        if (status === 406) {
        toast.error(message);
        }else if(status === 400) {
          toast.error(message);
        }
      }
      });
    };

  return(
        <>
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-2xl border border-gray-100 my-10">
  <div className="mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
  </div>

  <form className="space-y-6" onSubmit={handleSubmit(saveuser)} method="post" encType="multipart/form-data">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
        <input
         type="text"
         placeholder="Enter Fullname" 
         {...register("fullname",{required: true})}
         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
         {errors.fullname && <span className="text-red-600 font-semibold py-2">Fullname is required</span>}        
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
        <input type="email"
        autoComplete="true"
         placeholder="Enter your E-mail"
         {...register("email",
          {required : "Email is required",
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address"
          }
          })}
         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
         {errors.email && ( <span className="text-red-600 font-semibold py-2">{errors.email.message}</span> )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
        <input type="tel"
         placeholder="Enter your phone number"
         {...register("phone",{required : "Phone number is required",
          pattern: {
          value: /^[0-9]{10}$/,
          message: "Phone number must be 10 digits"
         }
         })}
         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
         {errors.phone && (
         <p className="text-red-600 font-semibold">{errors.phone.message}</p>
         )}        
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Select your role <span className="text-red-500">*</span></label>
        <select 
        {...register("role",{required : true})}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
        onChange={(e) => setrole(e.target.value)}
        >
          <option value="">Select what will be your role</option>
          <option value="a">Applicant</option>
          <option value="r">Recruiter</option>
        </select>
        {errors.role && <span className="text-red-600 font-semibold py-2">Role is required</span>}        
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile <span className="text-red-500">*</span></label>
        <select 
        {...register("profile",{required : true})}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
          <option value="">Select your profile</option>
          {role && role === "r" ? (
            <>
            <option value="Recruiter">Recruiter</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Hiring Manager">Hiring Manager</option>
            <option value="Chief Executive Officer">Chief Executive Officer</option>
            </>
          ) : (
          <>
          <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="Fullstack Developer">Fullstack Developer</option>
          <option value="Cloud Engineer">Cloud Engineer</option>
          <option value="Devops Engineer">Devops Engineer</option>
          <option value="UI / UX Designer">UI / UX Designer</option>
          </>
          )}
        </select>
         {errors.profile && <span className="text-red-600 font-semibold py-2">Profile is required</span>}        
      </div>
      {role == "a" && (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume <span className="text-red-500">*</span></label>
        <input type="file"
         {...register("resume",{required : role == "r" ? flase : "Resume is required", 
          validate : {
            fileType: (files) =>
              ["application/pdf",
               "application/msword",
              ].includes(files[0]?.type) || 
              "only PDF or Word files allowed",
          }
         })}
         className="" /><br></br>
         {errors.resume && (
  <span className="text-red-600 font-semibold py-2">
    {errors.resume.message}
  </span>
)} 
    </div>
    )}
    </div>
      <div className="grid grid-cols-1 gap-6">
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
      <button type="button" className="py-2.5 text-sm md:text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">Already have an account?<Link to={"/login"} className="text-blue-800 cursor-pointer"> Login</Link></button>
      <button type="submit" className="px-6 py-3 space-x-2 md:px-10 md:py-3 md:text-lg bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:shadow-lg">
        Register 
      </button>
    </div>
  </form>
</div>
        </>
    );
}
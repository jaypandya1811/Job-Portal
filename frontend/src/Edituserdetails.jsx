import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Edituserdetails(){
  const navigate = useNavigate();
  const [userdetails,setuserdetails] = useState();

  const { id } = useParams();

    useEffect(() => {
      if(id){
        axios.get(`http://localhost:3000/user/viewuser/${id}`)
        .then((res) => {
          setuserdetails(res.data);
        })
      }

    }, [id]);
    
    const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    } = useForm({
      values: {
        fullname: userdetails?.fullname,
        email: userdetails?.email,
        phone: userdetails?.phone,
        profile: userdetails?.profile,
      }
    });

    const updatedetails = (data) => {

      const formdata = new FormData();

      Object.keys(data).forEach((key) => {
      if(key !== "resume"){
      formdata.append(key, data[key]);
      }
      });

      if (data.resume && data.resume[0]) {
      formdata.append("resume", data.resume[0]);
      }

      axios.put(`http://localhost:3000/user/editdetails/${id}`,formdata)
      .then((res) => {
        toast.success("Details edited");
        navigate(-1);
      })
    };

    return(
    <>
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-2xl border border-gray-100 my-10">
      <form className="space-y-6" onSubmit={handleSubmit(updatedetails)}>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
    <input
      type="text"
      placeholder="Enter Fullname"
      {...register("fullname", { required: true })}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
    />
    {errors.fullname && <span className="text-red-600 font-semibold py-2">Fullname is required</span>}
  </div>

  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
    <input
      type="email"
      placeholder="Enter your E-mail"
      {...register("email", {
        required: true,
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
          message: "Enter a valid email address",
        },
      })}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
    />
    {errors.email && <span className="text-red-600 font-semibold py-2">{errors.email.message}</span>}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
    <input
      type="tel"
      placeholder="Enter your phone number"
      {...register("phone", {
        required: true,
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Phone number must be 10 digits",
        },
      })}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
    />
    {errors.phone && <p className="text-red-600 font-semibold">{errors.phone.message}</p>} {/* Added </p> */}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      Job Profile <span className="text-red-500">*</span>
    </label>
    <select
      {...register("profile", { required: true })}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
    >
      <option value="">Select your profile</option>
      <option value="Front-end Developer">Front-end Developer</option>
      <option value="Back-end Developer">Back-end Developer</option>
      <option value="Fullstack Developer">Fullstack Developer</option>
      <option value="Cloud Engineer">Cloud Engineer</option>
      <option value="Devops Engineer">Devops Engineer</option>
      <option value="UI / UX Designer">UI / UX Designer</option>
    </select>
    {errors.profile && <span className="text-red-600 font-semibold py-2">Profile is required</span>}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Resume</label>
    <span className="text-blue-800 cursor-pointer"><a href={`http://localhost:3000/resumes/` + userdetails?.resume} target="_blank">Resume</a></span>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      Resume <span className="text-red-500">*</span>
    </label>
    <input
      type="file"
      {...register("resume", {
        required: false,
        validate: {
          fileType: (files) => {
            if (!files || files.length === 0) return true;
            return ["application/pdf", "application/msword"].includes(files[0]?.type) || "only PDF or Word files allowed";
          }
        },
      })}
    />
    <br />
    {errors.resume && <span className="text-red-600 font-semibold py-2">{errors.resume.message}</span>}
  </div>

  <div className="md:col-span-2 flex justify-end space-x-4 pt-6">
    <button type="button" className="px-6 py-2.5 text-md font-semibold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" onClick={() => navigate(-1)}>
      Cancel
    </button>
    <button type="submit" className="px-8 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:shadow-lg cursor-pointer">
      Edit
    </button>
  </div>
  </form>
</div>  
    </>
    );
}
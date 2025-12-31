import axios from "axios";
import { useForm } from "react-hook-form";
import { useauth } from "./context/authcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Jobform(){
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job_type: "Fresher",
      mode: "On-site"
    }
  });

  const { user } = useauth();

  const navigate = useNavigate();

  const id = user ? user.user.userid : null;

  const postjob = (data) => {
    const newdata = {
      ...data,
      r_id : id,
      status : "active",
    };
    axios.post("http://localhost:3000/job/postjob",newdata)
    .then((res) => {
      toast.success("Job added successfully");
      navigate(-1);
      reset();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  };

    return(
        <>
          <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-2xl border border-gray-100 my-10">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">Create Job Post</h2>
              <p className="text-gray-500 mt-1">Fill the details to publish a new job</p>
          </div>

          <form onSubmit={handleSubmit(postjob)} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("company_name", { required: "Company name is required" })}
            type="text"
            placeholder="e.g. Microsoft"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.company_name && <span className="text-red-600 font-semibold py-2">Company name is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Website Url<span className="text-red-500"> *</span>
          </label>
          <input
            {...register("website_url", { required: "Website url name is required" })}
            type="text"
            placeholder="e.g. Google.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.website_url && <span className="text-red-600 font-semibold py-2">Website url is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("job_title", { required: "Job title is required" })}
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.job_title && <span className="text-red-600 font-semibold py-2">Job title is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Select Job Type <span className="text-red-500">*</span>
          </label>
          <select 
            {...register("job_type", { required: "Job type is required" })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
          >
            <option value="Fresher">Fresher</option>
            <option value="Internship">Internship</option>
            <option value="Experienced">Experienced</option>
          </select>
          {errors.job_type && <span className="text-red-600 font-semibold py-2">Job type is required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary Range / Stipend</label>
          <input
            {...register("salary")}
            type="text"
            placeholder="e.g. ₹10LPA - ₹15LPA"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.salary && <span className="text-red-600 font-semibold py-2">Salary range is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Experience <span className="text-red-500">*</span>
          </label>
          <input
            {...register("experience", { required: "Experience is required" })}
            type="text"
            placeholder="e.g. 2+ Years"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.experience && <span className="text-red-600 font-semibold py-2">Experience is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Graduation <span className="text-red-500">*</span>
          </label>
          <input
            {...register("graduation", { required: "graduation is required" })}
            type="text"
            placeholder="e.g. Bachelors in IT"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.graduation && <span className="text-red-600 font-semibold py-2">Graduation is required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Select Work Mode <span className="text-red-500">*</span>
          </label>
          <select 
            {...register("mode", { required: "mode is required" })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.mode && <span className="text-red-600 font-semibold py-2">Work mode is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            {...register("location", { required: "location is required" })}
            type="text"
            placeholder="City, State"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.location && <span className="text-red-600 font-semibold py-2">Location is required</span>}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("job_description", { required: "job description is required " })}
            rows="4"
            placeholder="Write about the role..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
          {errors.job_description && <span className="text-red-600 font-semibold py-2">Job description is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("requirements", { required: "requirements is required" })}
            rows="3"
            placeholder="Technical skills and requirements..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
          {errors.requirements && <span className="text-red-600 font-semibold py-2">Requirements is required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">About Company</label>
          <textarea
            {...register("company_info")}
            rows="2"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Benefits</label>
          <textarea
            {...register("benefits")}
            rows="2"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Remark</label>
          <input
            {...register("remark")}
            type="text"
            placeholder="Notes..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button type="button" className="px-6 py-2.5 text-md font-semibold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="px-8 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:shadow-lg cursor-pointer">
          Post Job
        </button>
        </div>
      </form>
          </div>
        </>
    );
};
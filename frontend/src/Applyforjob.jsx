import { useState,useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useauth } from "./context/authcontext";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

export default function Applyforjob(){
  const [job,setjob] = useState();
  const [userdetails,setuserdetails] = useState();
  const { user, setuser, fetchuser } = useauth();

  const { id } = useParams();

  const role = user ? user.user.role : null;

  const uid = user ? user.user.userid : null;

  const navigate = useNavigate();

    useEffect(() => {
      if (!id) return;
      axios.get(`http://localhost:3000/job/jobdetails/${id}`)
      .then((res) => {
        setjob(res.data);
      })
      .catch(err => console.log(err));

      if(user){
        axios.get(`http://localhost:3000/user/viewuser/${user?.user?.userid}`)
        .then((res) => {
          setuserdetails(res.data);
        })
      }

    }, [id,user]);

    const details = job ? {
    j_id : job._id,
    r_id : job.r_id,
    a_id : user?.user?.userid,
    resume : userdetails?.resume
    } : null;

    const post = () => {
      if(user){
      axios.post(`http://localhost:3000/application/apply`,details)
      .then((res) => {
        console.log(res);
          toast.success("Application sent");
          navigate(`/applications/${user?.user?.userid}`);
      })
      .catch((e) => {
        toast.info(e.response.data.message);
      })
    }else{
      toast.warning("Login first");
      navigate("/login");
    }
    };

    return(
      <>
     <div className="md:my-8 my-6 p-4 md:mx-18 flex flex-col lg:flex-row md:justify-between">
     {job ? (
     <>
     <div className="lg:min-w-3xl rounded-xl border border-gray-200 bg-white shadow-lg overflow-y-auto">
     <div className="p-6 pb-4">
     <div className="flex md:flex-row flex-col items-start justify-between">
      <div>
        <h2 className="text-xl leading-tight font-bold text-gray-900">{ job.job_title }</h2>
        <p className="text-sm font-medium text-blue-600 line-clamp-2">
              {job.website_url ? (
              <a href={job.website_url} target="_blank">{job.company_name}</a>
              ) : ( <span>{job.company_name}</span> ) }
        </p>
      </div>
      <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-semibold text-green-800 mt-2"> { job.job_type } </span>
    </div>
  </div>

  <div className="mb-3 grid grid-cols-2 gap-4 border-t-3 border-gray-300 px-6 pt-5 pb-3">
    <div className="flex items-center text-sm font-semibold text-gray-600"><span className="mr-2">📍</span>{ job.mode }</div>
    <div className="flex items-center text-sm font-semibold text-gray-600"><span className="mr-2">💰</span> ₹ { job.salary }</div>
    <div className="flex items-center text-sm font-semibold text-gray-600"><span className="mr-2">💼</span>{ job.experience }</div>
    <div className="flex items-center text-sm font-semibold text-gray-600"><span className="mr-2">🎓</span>{ job.graduation }</div>
  </div>

  <div className="p-6 pt-4 space-y-4">
    {job.company_info && (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">About Company</h3>
      <p className="text-gray-600 text-sm">
        { job.company_info }
      </p>
    </div> 
    )}

    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Job Description</h3>
      <p className="text-gray-600 text-sm">
        { job.job_description }
      </p>
    </div>

    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Requirements</h3>
      <ul className="text-sm text-gray-600 list-disc list-inside">
          { job.requirements }
      </ul>
    </div>

    {job.benefits && ( 
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">benefits</h3>
      <p className="text-gray-600 text-sm">
        { job.benefits }
      </p>
    </div>
    )}

    {job.remark && ( 
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Remark</h3>
      <p className="text-gray-600 text-sm">
        { job.remark }
      </p>
    </div>
    )}
    {!user && 
    <button className="w-full rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 hover:cursor-pointer" onClick={post}>Apply</button>
    }
    {role && role == "r" && (
    <button className="w-full rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 hover:cursor-pointer">
    <Link to={`/applications/${uid}`}>Applications</Link>
    </button>
    )}
  </div>
  </div>
  {userdetails && role && role === "a" &&(
  <div className="rounded-xl border border-gray-200 bg-white shadow-lg lg:w-xl lg:ml-4 my-3 lg:my-0 max-h-fit">
    <div className="mx-6">
    <div className="flex items-center justify-between">
    <p className="text-center text-xl text-gray-900 font-bold my-4">Preview Your Details</p>
    <Link to={`/edituser/${user.user.userid}`}><FaPen className="text-xl hover:cursor-pointer"></FaPen></Link>
    </div>
    <>
    <div className="mb-4">
    <p className="text-md font-bold text-gray-900">Full Name: </p>
    <p className="text-md font-semibold text-gray-800">{userdetails.fullname}</p>
    </div>
    <div className="mb-4">
    <p className="text-md font-bold text-gray-900">Profile:</p>
    <p className="text-md font-semibold text-gray-800">{userdetails.profile}</p>
    </div>
    <div className="mb-4">
    <p className="text-md font-bold text-gray-900">Phone:</p>
    <p className="text-md font-semibold text-gray-800">{userdetails.phone}</p>
    </div>
    <div className="mb-4">
    <p className="text-md font-bold text-gray-900">Email:</p>
    <p className="text-md font-semibold text-gray-800">{userdetails.email}</p>
    </div>
    <div className="">
    <p className="text-md font-bold text-gray-900">Resume:</p>
    <p className="text-md font-semibold text-blue-800 hover:cursor-pointer"><a href={`http://localhost:3000/resumes/` + userdetails.resume} target="_blank">Resume</a></p>
    </div>
    </>
    </div>
    <div className="px-6 pb-6 flex gap-2 mt-12">
    <button className="w-full rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 hover:cursor-pointer" onClick={post}>Apply</button>
    <button
    className="rounded-lg hover:text-purple-600 bg-purple-600 text-white cursor-pointer">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-10 h-10 text-white"
    >
    <path
    fill="currentColor"
    d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616v11.436q0 .864-.727 1.345q-.727.482-1.535.134zm0-1.123l4.135 1.784q.307.135.586-.057q.279-.193.279-.52V5.617q0-.231-.192-.424T16.384 5H7.616q-.231 0-.424.192T7 5.616v11.392q0 .327.279.519t.586.057z"
    />
  </svg>
  </button>
  </div>
  </div>
  ) }
  </>
  ) : ( <span className="text-center text-xl block">No Jobs</span> )
  }
  </div>
  </>
  );
}
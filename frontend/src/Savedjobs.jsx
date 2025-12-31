import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useauth } from "./context/authcontext";

export default function Savedjobs(){
  const [jobs,setjobs] = useState([]);
  const [query,setquery] = useState();

  const badges = {
  Internship: "bg-blue-100 text-blue-800",
  Fresher: "bg-green-100 text-green-800",
  Experienced: "bg-orange-100 text-orange-800"
  };

  const { user } = useauth();

  const userrole = user ? user.user.role : false;

  const id = user ? user.user.userid : null;

  useEffect(() => {
    if(id){
    axios.get(`http://localhost:3000/job/viewsavedjobs/${id}`)
      .then((res) => {
        setjobs(res.data);
      });
    }
    }, [id]);

  const searchjobs = () => {
    if(query && query.length > 0){
    axios.get(`http://localhost:3000/job/search?q=${query}`)
    .then((res) => {
      setjobs(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  };

    return(
        <>
        <div className="max-w-full mx-18">
        <div className="my-5 md:px-6 w-full flex justify-center md:justify-end items-center gap-1 md:gap-2">
                <div>
                  {userrole == "r" && 
                  <Link to="/newjobpost" className="bg-purple-700 text-white hover:cursor-pointer hover:bg-white hover:text-purple-700 hover:border-2 hover:border-purple-700 py-2 px-3 font-semibold rounded-lg">
                      Add Post
                  </Link>
                  }
                </div>
                <div className="flex items-center gap-1">
                <input type="text" name="query" placeholder="Search jobs here" className="border-2 border-gray-500 py-1 px-3 md:pr-12 rounded-lg" onChange={(e) => { setquery(e.target.value) }} />
                <FaSearch size={24} className="text-purple-700 cursor-pointer" onClick={() => { searchjobs() }}></FaSearch>
                </div>
                </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
        {jobs && jobs.length > 0 ? (
        jobs.map((j) => (
        <div
        key={j._id}
        className="my-4 max-w-md flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg "
        style={{ minHeight: '280px' }}>
      <div className="p-6">
        <div className="flex flex-col gap-0.5 md:flex-row items-start justify-between">
          <div className="">
            <h2 className="text-xl leading-tight font-bold text-gray-900 line-clamp-2">
              {j.j_id.job_title}
            </h2>
            <p className="text-sm font-medium text-blue-600 line-clamp-2">
              {j.j_id.website_url ? (
              <a href={j.j_id.website_url} target="_blank">{j.j_id.company_name}</a>
              ) : ( <span>{j.j_id.company_name}</span> ) }
            </p>
          </div>
          <span className={`rounded-full shrink-0 px-3 py-0.5 text-sm font-semibold mt-2 ${badges[j.j_id.job_type]}`}>
            {j.j_id.job_type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-300 px-6 pt-5 pb-3">
        <div className="flex items-center text-sm font-semibold text-gray-600">
          <span className="shrink-0">📍</span>
          <span className="truncate">{j.j_id.location}</span>
        </div>
        {j.j_id.salary && ( 
        <div className="flex items-center text-sm font-semibold text-gray-600">
          <span className="shrink-0">💰</span>
          <span className="truncate">{j.j_id.salary}</span>
        </div>
        ) }
        <div className="flex items-center text-sm font-semibold text-gray-600">
          <span className="shrink-0">💼</span>
          <span className="truncate">{j.j_id.experience}</span>
        </div>
        <div className="flex items-center text-sm font-semibold text-gray-600">
          <span className="shrink-0">🎓</span>
          <span className="truncate">{j.j_id.graduation}</span>
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-2 mt-auto">  
        {userrole && userrole == "r" ? (
        <Link to={`/applications/${id}`} className="w-full text-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 cursor-pointer">
          Applications
        </Link>
        ) : (
        <Link to={`/applytojob/${j.j_id._id}`} className="w-full text-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 cursor-pointer">
          Apply Now
        </Link>
        ) }
      </div>
    </div>
  ))
) : (
  <span className="text-center text-3xl font-semibold mx-auto">No Jobs</span>
)}
  </div>
  </div>
</>
    );
}
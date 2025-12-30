import axios from "axios";
import { useState,useEffect } from "react";
import { IoDocument } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useauth } from "./context/authcontext";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Applications(){

  const [applications,setapplications] = useState([]);

  const [refresh,setrefresh] = useState(false);

  const { user } = useauth();

  const { id } = useParams();

  const navigate = useNavigate();

  const userrole = user ? user.user.role : false ;

      useEffect(() => {
        if (!id) return;
        console.log(userrole);
        if(userrole){
          if(userrole !== "a"){
          console.log("pupu");
        axios.get(`http://localhost:3000/application/recruiter/${id}`)
        .then((res) => {
        setapplications(res.data);
        })
        .catch(err => {
          toast.error(err.response.data.message);
        });
        }else{
           axios.get(`http://localhost:3000/application/applicant/${id}`)
          .then((res) => {
          setapplications(res.data);
          console.log(applications);
          })
          .catch(err => console.log(err));
        }
        }
        },[id,userrole]);

        console.log(applications);

      const deleteapplication = (appid) => {
        console.log("front appid" + appid);
        axios.delete(`http://localhost:3000/application/deleteapplication/${appid}`)
        .then((res) => {
          setapplications(data => data.filter(app => app._id !== appid));
        })
        .catch(err => {
          toast.error(err.response.data.message);
        });
      };

    return(
        <>
  <div className="max-w-6xl mx-auto my-10 px-4">
  {userrole == "a" ? (
  <>
  <div className="mb-6">
    <h2 className="text-2xl font-extrabold text-gray-900">Jobs you have applied for</h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-400 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-400">
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">company</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Profile</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Website</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Applied on</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Resume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {user && (
          applications.map((a) => (
          <tr className="hover:bg-indigo-50/30 transition-colors group" key={a._id}>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-600">
              {a.j_id.company_name}
            </td>
            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{a.j_id.job_title}</td>
            <td className="px-6 py-4 text-gray-600 font-medium truncate"><a href={a.j_id.website_url} target="_blank" className="hover:text-blue-800">{a.j_id.website_url}</a></td>
            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString('en-GB')}</td>
            <td className="px-6 py-4 text-center">
              <a href={`http://localhost:3000/resumes/` + a.resume} target="_blank"><IoDocument size={24} className="text-purple-700 hover:cursor-pointer mx-auto"></IoDocument></a>
            </td>
          </tr>
          )) 
          )}
        </tbody>
      </table>
    </div>
</div>
</>
) : ( 
  <>
    <div className="mb-6">
    <h2 className="text-2xl font-extrabold text-gray-900">Applications for this job</h2>
    </div>

  <div className="bg-white rounded-xl border border-gray-400 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-400">
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Profile</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Applied on</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Resume</th>
            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Action</th>  
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {user && applications.length > 0 ? ( 
        applications.map((a) => (
          <tr className="hover:bg-indigo-50/30 transition-colors group" key={a._id}>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-600">
              {a.a_id.fullname}
            </td>
            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{a.a_id.profile}</td>
            <td className="px-6 py-4 text-gray-600 whitespace-nowrap font-medium">{a.a_id.phone}</td>
            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{a.a_id.email}</td>
            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString('en-GB')}</td>
            <td className="px-6 py-4 text-center">
              <a href={`http://localhost:3000/resumes/` + a.resume} target="_blank"><IoDocument size={24} className="text-purple-700 hover:cursor-pointer mx-auto"></IoDocument></a>
            </td>
            <td className="px-6 py-4 text-center">
              <FaTrash size={24} className="text-red-600 hover:cursor-pointer mx-auto" onClick={() => deleteapplication(a._id)}></FaTrash>
            </td>
          </tr>
        ))) : ( <span className="text-center text-2xl block font-bold text-gray-600">No Applications</span> )}
        </tbody>
      </table>
    </div>
  </div>
  </>
)}
</div>
    </>
    );
}
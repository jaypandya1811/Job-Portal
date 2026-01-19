import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { FaBookmark, FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useauth } from "./context/authcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";

export default function Joblist() {
  const [jobs, setjobs] = useState([]);
  const [query, setquery] = useState();
  const [refresh, setrefresh] = useState(null);

  const jobTypes = ["Fresher", "Experienced", "Internship"];

  const jobmodes = ["On-site", "Remote"];

  const [selectedJobType, setSelectedJobType] = useState(null);

  const [selectedJobmode, setSelectedJobmode] = useState(null);

  const badges = {
    Internship: "bg-blue-100 text-blue-800",
    Fresher: "bg-green-100 text-green-800",
    Experienced: "bg-orange-100 text-orange-800",
  };

  const { user } = useauth();

  const userrole = user ? user.user.role : false;

  const id = user ? user.user.userid : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userrole) {
      axios
        .get("http://localhost:3000/job/viewjobs")
        .then((res) => setjobs(res.data))
        .catch((err) => toast.error("Failed to load jobs"));
      return;
    }

    if (userrole === "r") {
      axios
        .get(`http://localhost:3000/job/mypostedjobs/${id}`)
        .then((res) => {
          setjobs(res.data);
        })
        .catch((err) => toast.error("Failed to load your jobs"));
    } else {
      axios
        .get("http://localhost:3000/job/viewjobs")
        .then((res) => setjobs(res.data));
    }
  }, [userrole, id, refresh]);

  const savejob = (jid) => {
    if (user) {
      const data = {
        a_id: id,
        j_id: jid,
      };

      axios
        .post(`http://localhost:3000/job/savejob`, data)
        .then((res) => {
          toast.success("Job saved to my jobs");
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        });
    } else {
      toast.info("Login first");
      navigate("/login");
    }
  };

  const searchjobs = () => {
    console.log(query.length);
    if (query && query.length > 2) {
      axios
        .get(`http://localhost:3000/job/search?q=${query}`)
        .then((res) => {
          setjobs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const applyFilters = () => {
    if (!selectedJobType && !selectedJobmode) return;

    const filters = {};
    if (selectedJobType) filters.job_type = selectedJobType;
    if (selectedJobmode) filters.mode = selectedJobmode;

    axios.post(`http://localhost:3000/job/filter`, filters).then((res) => {
      setjobs(res.data);
    });
  };

  const clearFilters = () => {
    setSelectedJobType(null);
    setSelectedJobmode(null);
    setrefresh(1);
  };

  return (
    <>
      <div className="max-w-full mx-18">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 p-4 w-full bg-white shadow-md mt-8 rounded-lg">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="flex gap-2 items-center border border-gray-400 font-semibold text-gray-700 rounded-2xl px-3 py-1 hover:border-purple-600 cursor-pointer transition-all">
                <p className="text-sm">{selectedJobType || "Job type"}</p>
                <IoIosArrowDown className="text-lg" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-20 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none">
                  {jobTypes.map((type) => (
                    <Menu.Item key={type}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => setSelectedJobType(type)}
                          className={`w-full px-4 py-2 text-sm text-left rounded-xl transition ${
                            active
                              ? "bg-purple-100 text-purple-700"
                              : "text-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="flex gap-2 items-center border border-gray-400 font-semibold text-gray-700 rounded-2xl px-3 py-1 hover:border-purple-600 cursor-pointer transition-all">
                <p className="text-sm">{selectedJobmode || "Job mode"}</p>
                <IoIosArrowDown className="text-lg" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-20 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none">
                  {jobmodes.map((type) => (
                    <Menu.Item key={type}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => setSelectedJobmode(type)}
                          className={`w-full px-4 py-2 text-sm text-left rounded-xl transition ${
                            active
                              ? "bg-purple-100 text-purple-700"
                              : "text-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <input type="hidden" name="jobtype" value={selectedJobType || ""} />

            <input type="hidden" name="jobmode" value={selectedJobmode || ""} />

            <div className="flex items-center justify-center md:justify-start w-full md:w-0 gap-2 md:ml-2 md:border-l md:pl-4 border-gray-300">
              <button
                type="button"
                onClick={applyFilters}
                className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-2xl font-bold hover:bg-purple-700 hover:text-white transition-colors hover:cursor-pointer"
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-red-500 font-bold px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {userrole === "r" && (
              <>
              <Link
                to="/newjobpost"
                className="hidden lg:block whitespace-nowrap bg-purple-700 text-white border border-purple-700 py-1.5 px-4 font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition-all text-md"
              >
                Add Post
              </Link>
              <Link
                to="/newjobpost"
                className="lg:hidden whitespace-nowrap bg-purple-700 text-white border border-purple-700 py-1.5 px-2 font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition-all text-md"
              >
                <FaPlus size={20} />
              </Link>
              </>
            )}

            <div className="relative flex items-center w-full md:w-64">
              <input
                type="text"
                name="query"
                placeholder="Search jobs..."
                className="w-full border border-gray-400 py-1.5 pl-3 pr-10 rounded-lg focus:border-purple-700 outline-none text-md"
                onChange={(e) => setquery(e.target.value)}
              />
              <FaSearch
                className="absolute right-3 text-purple-700 cursor-pointer hover:scale-110 transition-transform"
                onClick={searchjobs}
                size={18}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 md:gap-4 gap-2 mt-2">
          {jobs && jobs.length > 0 ? (
            jobs.map((j) => (
              <div
                key={j._id}
                className="my-4 max-w-md flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg "
                style={{ minHeight: "280px" }}
              >
                <div className="p-6">
                  <div className="flex flex-col gap-0.5 md:flex-row items-start justify-between">
                    <div className="">
                      <h2 className="text-xl leading-tight font-bold text-gray-900 line-clamp-2">
                        {j.job_title}
                      </h2>
                      <p className="text-sm font-medium text-blue-600 line-clamp-2">
                        {j.website_url ? (
                          <a href={j.website_url} target="_blank">
                            {j.company_name}
                          </a>
                        ) : (
                          <span>{j.company_name}</span>
                        )}
                      </p>
                    </div>
                    <span
                      className={`rounded-full shrink-0 px-3 py-0.5 text-sm font-semibold mt-2 ${
                        badges[j.job_type]
                      }`}
                    >
                      {j.job_type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-300 px-6 pt-5 pb-3">
                  <div className="flex items-center text-sm font-semibold text-gray-600">
                    <span className="shrink-0">📍</span>
                    <span className="truncate">{j.location}</span>
                  </div>
                  {j.salary && (
                    <div className="flex items-center text-sm font-semibold text-gray-600">
                      <span className="shrink-0">💰</span>
                      <span className="truncate">{j.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm font-semibold text-gray-600">
                    <span className="shrink-0">💼</span>
                    <span className="truncate">{j.experience}</span>
                  </div>
                  <div className="flex items-center text-sm font-semibold text-gray-600">
                    <span className="shrink-0">🎓</span>
                    <span className="truncate">{j.graduation}</span>
                  </div>
                </div>

                <div className="px-6 pb-6 flex gap-2 mt-auto">
                  {userrole && userrole == "r" ? (
                    <Link
                      to={`/applications/${id}`}
                      className="w-full text-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 cursor-pointer"
                    >
                      Applications
                    </Link>
                  ) : (
                    <Link
                      to={`/applytojob/${j._id}`}
                      className="w-full text-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 cursor-pointer"
                    >
                      Apply Now
                    </Link>
                  )}
                  {userrole && userrole == "r" ? (
                    <Link
                      to={`/applytojob/${j._id}`}
                      className="text-center rounded-lg bg-purple-600 p-2 font-bold text-white hover:bg-purple-700 cursor-pointer"
                    >
                      <FaEye size={22} />
                    </Link>
                  ) : (
                    <button
                      className="rounded-lg bg-purple-600 text-white p-2 cursor-pointer"
                      onClick={() => savejob(j._id)}
                    >
                      <FaBookmark size={22} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <span className="text-center text-3xl font-semibold mx-auto">
              No Jobs
            </span>
          )}
        </div>
      </div>
    </>
  );
}
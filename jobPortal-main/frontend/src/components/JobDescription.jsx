import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  
  const { singleJob } = useSelector((store) => store.job);
  const params = useParams();
  const jobId = params.id;

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

 const applyJobHandler = async () => {
   try {
     const res = await axios.get(
       `${APPLICATION_API_END_POINT}/apply/${jobId}`,
       {
         withCredentials: true,
       }
     );

     if (res.data.success) {
       setIsApplied(true); // Update the local state
       const updatedSingleJob = {
         ...singleJob,
         application: [...singleJob.application, { applicant: user?._id }],
       };
       dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
       toast.success(res.data.message);
     }
   } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
   }
 };

   useEffect(() => {
     const fetchSingleJob = async () => {
       try {
         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
           withCredentials: true,
         });
         if (res.data.success) {
           dispatch(setSingleJob(res.data.job));
           setIsApplied(
             res.data.job.application.some(
               (application) => application.applicant === user?._id
             )
           ); 
         }
       } catch (error) {
         console.log(error);
       }
     };
     fetchSingleJob();
   }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-12 bg-white p-8 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge variant="outline" className="text-blue-600 font-medium">
              {singleJob?.position} Position{singleJob?.position > 1 ? "s" : ""}
            </Badge>
            <Badge variant="outline" className="text-red-600 font-medium">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="outline" className="text-purple-600 font-medium">
              ₹ {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 rounded-xl text-white font-medium transition ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {singleJob?.description}
      </h1>
      {/* Divider */}
      {/* <hr className="my-6 border-gray-300" /> */}

      {/* Job Details */}
      <div className="space-y-4 text-gray-800">
        <div className="mt-4">
          <span className="font-semibold">Role:</span>
          <span className="ml-2">{singleJob?.title}</span>
        </div>
        <div>
          <span className="font-semibold">Location:</span>
          <span className="ml-2">{singleJob?.location}</span>
        </div>
        <div>
          <span className="font-semibold">Description:</span>
          <span className="ml-2">{singleJob?.description}</span>
        </div>
        <div>
          <span className="font-semibold">Experience:</span>
          <span className="ml-2">{singleJob?.experience} yrs</span>
        </div>
        <div>
          <span className="font-semibold">Salary:</span>
          <span className="ml-2">₹ {singleJob?.salary} LPA</span>
        </div>
        <div>
          <span className="font-semibold">Total Applicants:</span>
          <span className="ml-2">{singleJob?.application.length}</span>
        </div>
        <div>
          <span className="font-semibold">Posted Date:</span>
          <span className="ml-2">{singleJob?.createdAt.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

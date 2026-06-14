import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold mx-5">
        <span className="text-[#6A3862]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-4 mx-5">
        {!allJobs || allJobs.length === 0 ? (
          <span>No job found</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

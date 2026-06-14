import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6 rounded-2xl shadow-md bg-white border border-gray-200 transition hover:shadow-xl duration-300 ease-in-out max-w-xl mx-auto sm:max-w-full">
      {/* Header: Time & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
        <p className="text-xs sm:text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-gray-100 transition self-start sm:self-auto"
          size="icon"
          aria-label="Save job"
        >
          <Bookmark className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
        <Avatar className="w-14 h-14 shadow-sm border border-gray-200 flex-shrink-0">
          <AvatarImage src={job?.company?.logo} alt="Company logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h2 className="text-base font-semibold text-gray-800">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{job?.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100">
          {job?.position} position
        </Badge>
        <Badge className="text-[#F83002] font-semibold bg-red-100">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold bg-purple-100">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
        <Button
          variant="outline"
          className="hover:bg-gray-100 w-full sm:w-auto"
          onClick={() => navigate(`/job/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5a0791] transition w-full sm:w-auto">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;

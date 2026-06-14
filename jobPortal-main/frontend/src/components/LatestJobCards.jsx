import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/job/description/${job._id}`)}
      className="p-4 sm:p-6 rounded-xl bg-white border border-gray-100 shadow-md cursor-pointer transition-transform duration-300 hover:shadow-2xl hover:border-gray-300 hover:scale-105"
    >
      {/* Header: Company Info */}
      <div className="mb-2">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {job?.company?.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {job?.location}
        </p>
      </div>

      {/* Job Info */}
      <div className="my-3 sm:my-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
          {job?.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Tags/Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

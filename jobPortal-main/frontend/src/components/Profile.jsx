import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import ApplicationJobTable from "./ApplicationJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "./hooks/useGetAppliedJobs.jsx";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  if (!user) return <div>Loading...</div>;

  const isResume = !!user?.profile?.resume;

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={
                user?.profile?.profilePhoto || "https://github.com/shadcn.png"
              }
              alt="Profile Image"
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.fullname}
            </h1>
            <p className="text-gray-600 mt-1 text-sm leading-relaxed">
              {user.profile.bio}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Edit Profile"
          onClick={() => setOpen(true)}
        >
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      {/* Contact Info */}
      <div className="mt-6 text-gray-700">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Contact className="w-5 h-5 text-gray-500" />
          <span>{user.phoneNumber}</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.profile.skills.length > 0 ? (
            user.profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">No skills listed</span>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-6">
        <Label className="text-md font-medium text-gray-800">Resume</Label>
        <div className="mt-1">
          {isResume ? (
            <a
              href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                user.profile.resume,
              )}`}
              target="_blank"
              // rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Applied Jobs</h2>
        <div className="bg-gray-50 border rounded-xl p-4">
          <ApplicationJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

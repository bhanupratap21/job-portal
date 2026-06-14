import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant.js";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

import { toast } from "sonner";
import { persistor } from "../../redux/store.js";
import { clearAllAppliedJobs } from "../../redux/jobSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.status) {
         dispatch(clearAllAppliedJobs());
         dispatch(setUser(null));

         await persistor.purge();






        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const commonLinks = (
    <>
      <li>
        <Link
          to="/"
          className="block px-4 py-2 transition hover:text-[#f83002]"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/jobs"
          className="block px-4 py-2 transition hover:text-[#f83002]"
          onClick={() => setMenuOpen(false)}
        >
          Jobs
        </Link>
      </li>
      <li>
        <Link
          to="/browse"
          className="block px-4 py-2 transition hover:text-[#f83002]"
          onClick={() => setMenuOpen(false)}
        >
          Browse
        </Link>
      </li>
    </>
  );

  const recruiterLinks = (
    <>
      <li>
        <Link
          to="/admin/companies"
          className="block px-4 py-2 transition hover:text-[#f83002]"
          onClick={() => setMenuOpen(false)}
        >
          Companies
        </Link>
      </li>
      <li>
        <Link
          to="/admin/jobs"
          className="block px-4 py-2 transition hover:text-[#f83002]"
          onClick={() => setMenuOpen(false)}
        >
          Jobs
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 hover:text-[#6A38C2] cursor-pointer">
          Job<span className="text-[#f83002]">Portal</span>
        </h1>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 font-medium text-gray-700 ml-20">
          <ul className="flex gap-8 list-none">
            {user?.role === "recruiter" ? recruiterLinks : commonLinks}
          </ul>
        </nav>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 mt-2 p-4 rounded-xl shadow-xl border border-gray-200">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-gray-700">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 hover:text-[#6A38C2]"
                    >
                      <User2 size={16} />
                      <Button variant="link" className="p-0 h-auto text-sm">
                        View Profile
                      </Button>
                    </Link>
                  )}

                  <button
                    className="flex items-center gap-2 hover:text-red-600"
                    onClick={logoutHandler}
                  >
                    <LogOut size={16} />
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Logout
                    </Button>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-2 text-gray-700">
            {user?.role === "recruiter" ? recruiterLinks : commonLinks}
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full mt-2">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] mt-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <button
                onClick={logoutHandler}
                className="text-left mt-2 text-red-600 hover:underline"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

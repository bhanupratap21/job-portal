import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const {user, loading} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log("res.data",res.data);
      // console.log("res.data.success", res.data.success);
      if (res.data.status) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex items-center justify-center flex-1">
        <form
          action=""
          className="w-full max-w-md bg-white px-6 py-1 rounded-lg shadow border border-gray-200"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-3">
            Log In
          </h1>

          <div className="mb-3">
            <Label htmlFor="email" className="text-sm text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="password" className="text-sm text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-3">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="text-gray-700 text-sm">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="recruiter" className="text-gray-700 text-sm">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full py-2 text-white bg-black hover:bg-black rounded-md mt-3 transition duration-200">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 text-white bg-black hover:bg-black rounded-md mt-3 transition duration-200"
            >
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 py-3">
              signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

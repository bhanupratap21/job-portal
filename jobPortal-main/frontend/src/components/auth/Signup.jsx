import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";


const Signup = () => {
 const[input,setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
 });

  const {user, loading} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
 }

 const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]});
 }
 
 const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }    

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
       toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    
 }

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
            Create an Account
          </h1>

          <div className="mb-3">
            <Label htmlFor="fullname" className="text-sm text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullname"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
            <Label htmlFor="phoneNumber" className="text-sm text-gray-700">
              Phone Number
            </Label>
            <Input
              type="tel"
              maxLength={10}
              id="phoneNumber"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
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
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
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

          <div className="mb-3">
            <Label className="text-sm text-gray-700">Profile Picture</Label>
            <input
              type="file"
              onChange={changeFileHandler}
              accept="image/*"
              className="w-full py-2 px-3 border border-gray-300 rounded-md mt-1 cursor-pointer"
            />
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
              Sign Up
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 py-3">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

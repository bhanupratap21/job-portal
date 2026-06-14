import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications || []));
        }
        else{
           dispatch(setAllAppliedJobs([]));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllAppliedJobs([]));
      }
    };

    fetchAppliedJobs();
  }, [user, dispatch]);
};


export default useGetAppliedJobs;

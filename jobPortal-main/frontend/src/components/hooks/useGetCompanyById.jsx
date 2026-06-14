import { setSingleCompany } from "@/redux/companySlice";
// import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true },
        );
        if (res.data.status) {
          dispatch(setSingleCompany(res.data.company || []));
        } else {
          dispatch(setSingleCompany([]));
        }
      } catch (error) {
        console.log(error);
        dispatch(setSingleCompany([]));
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;

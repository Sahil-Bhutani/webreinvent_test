import React from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import { useDispatch,useSelector } from "react-redux";
import useHttp from "../services/api";
import { setUserData } from "../redux/slices/authentication";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const userSlug = location.pathname.replace(`/dashboard/`,'');
  const userData = useSelector((state:any)=> state?.userData?.data)

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "RESET" });
    navigate("/");
  };

  const fetchUserData = React.useCallback(async()=>{
    try {
      const responseData = await sendRequest({
        method: "GET",
        url: `https://reqres.in/api/user/${userSlug}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User fetched successful:", responseData);
      if (responseData) {
        localStorage.setItem("user_Data",JSON.stringify(responseData));
        dispatch(setUserData(responseData));
      }
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  },[userSlug,sendRequest])

  React.useEffect(()=>{
    fetchUserData();
  },[])

  console.log(userData)

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Hey {userData?.data?.name ? userData?.data?.name : "Guest" }, You have accessed your dashboard.
            </h1>
            <CustomButton text="Logout" disabled={false} action={handleLogout} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Dashboard);

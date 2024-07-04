import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import useHttp from "../services/api";
import { postToast } from "../common/CommonToast";
import {useSelector, useDispatch } from "react-redux";
import { setLoginData } from "../redux/slices/authentication";


interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, sendRequest } = useHttp();
  const userId = useSelector((state: any)=>state?.register?.data?.id);
  const token = useSelector((state : any)=>state?.login?.data?.token)
  const navigate = useNavigate();
  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLogin((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [login]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest({
        method: "POST",
        url: "https://reqres.in/api/login",
        body: login,
        headers: {
            "Content-Type": "application/json"
          }
      });
      postToast({ message: "Login successful", type: "success" });
      console.log("Login successful:", responseData);
      if(responseData){
        localStorage.setItem("login_data",JSON.stringify(responseData));
        dispatch(setLoginData(responseData))
      }
    } catch (error) {
      console.error("Login failed:", error);
      postToast({
        message: `Invalid credentials, please login with specified valid credentials.`,
        type: "error",
      });
    }
  };

  React.useEffect(()=>{
    if(userId && token){
      navigate(`/dashboard/${userId}`)
    }
    if(!userId){
      navigate('/')
    }
  },[userId,token])


  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <CustomInput
                  labelName={`email`}
                  labelText={`Enter your email`}
                  inputType={`email`}
                  inputName={`email`}
                  value={login.email}
                  onChange={handleChange}
                  placeholder={`Enter your email`}
                />
              </div>
              <div>
                <CustomInput
                  labelName={`password`}
                  labelText={`Enter your password`}
                  inputType={`password`}
                  inputName={`password`}
                  value={login.password}
                  onChange={handleChange}
                  placeholder={`Enter your password`}
                />
              </div>
              <CustomButton
                text={isLoading ? "Please wait..." : `Login`}
                disabled={isLoading ? true : false}
              />
              <p className="text-sm font-light text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Login);

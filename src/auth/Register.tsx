import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import useHttp from "../services/api";
import { postToast } from "../common/CommonToast";
import { useDispatch } from "react-redux";
import { setRegisterData } from "../redux/slices/authentication";

interface RegisterState {
  email: string;
  password: string;
  c_password: string;
}

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, sendRequest } = useHttp();
  const navigate = useNavigate();
  const [register, setRegister] = useState<RegisterState>({
    email: "",
    password: "",
    c_password: "",
  });

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRegister((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [register]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest({
        method: "POST",
        url: "https://reqres.in/api/register",
        body: register,
        headers: {
          "Content-Type": "application/json",
        },
      });
      postToast({ message: "Registration successful", type: "success" });
      console.log("Registration successful:", responseData);
      if (responseData) {
        localStorage.setItem("register_data",JSON.stringify(responseData));
        dispatch(setRegisterData(responseData));
      }
      navigate(`/login`);
    } catch (error) {
      console.error("Registration failed:", error);
      postToast({
        message: `Invalid credentials, please login with specified valid credentials.`,
        type: "error",
      });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <CustomInput
                  labelName={`email`}
                  labelText={`Enter your email`}
                  inputType={`email`}
                  inputName={`email`}
                  value={register.email}
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
                  value={register.password}
                  onChange={handleChange}
                  placeholder={`Enter your password`}
                />
              </div>
              <div>
                <CustomInput
                  labelName={`c_password`}
                  labelText={`Confirm your password`}
                  inputType={`password`}
                  inputName={`c_password`}
                  value={register.c_password}
                  onChange={handleChange}
                  placeholder={`Confirm your password`}
                />
              </div>
              <CustomButton
                text={isLoading ? "Please wait..." : `Create an account`}
                disabled={isLoading ? true : false}
              />
            </form>
            <p>NOTE: Please register/login from approved users.
               </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SignUpForm);

import { Link } from "react-router-dom";
import InputTag from "../components/InputTag";

const AdminSignup = () => {
  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Sign up as an Admin</p>
          <p className=" text-xs ">
            You already have an account?{" "}
            <Link to="/admin/login" className="underline">
              Login
            </Link>{" "}
          </p>
        </div>

        <form action="">
          <div className=" flex flex-col gap-5">
            <InputTag
              inputFor={"firstName"}
              inputPlaceholder={"Enter your first name"}
              inputType={"text"}
              inputLabel={"first Name"}
            />
            <InputTag
              inputFor={"lastName"}
              inputPlaceholder={"Enter your last name"}
              inputType={"text"}
              inputLabel={"last Name"}
            />
            <InputTag
              inputFor={"userName"}
              inputPlaceholder={"Choose a username"}
              inputType={"text"}
              inputLabel={"username"}
            />
            <InputTag
              inputFor={"email"}
              inputPlaceholder={"Enter your email"}
              inputType={"email"}
              inputLabel={"email"}
            />

            <InputTag
              inputFor={"password"}
              inputPlaceholder={"Create your password"}
              inputType={"password"}
              inputLabel={"Password"}
            />
            <InputTag
              inputFor={"confirmPassword"}
              inputPlaceholder={"Confirm your password"}
              inputType={"password"}
              inputLabel={"confirm Password"}
            />

            <button className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md">
              Sign up
            </button>
          </div>
          <p className="text-xs mt-2 text-center text-primary-mainBlue">
            Sign up as a{" "}
            <Link to="/marketer/signup" className="underline">
              Marketer
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default AdminSignup;

import { Link } from "react-router-dom";
import InputTag from "../components/InputTag";

const AdminLogin = () => {
  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Login as an Admin</p>
          <p className=" text-xs ">
            You dont have an account?{" "}
            <Link to="/admin/signup" className="underline">
              Sign up
            </Link>{" "}
          </p>
        </div>

        <form action="">
          <div className=" flex flex-col gap-5">
            <InputTag
              inputFor={"email"}
              inputPlaceholder={"Enter your email"}
              inputType={"email"}
              inputLabel={"email"}
            />

            <InputTag
              inputFor={"password"}
              inputPlaceholder={"Enter your password"}
              inputType={"password"}
              inputLabel={"Password"}
            />

            <button className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md">
              Login
            </button>
          </div>
          <p className="text-xs mt-2 text-center text-primary-mainBlue">
            Login as a{" "}
            <Link to="/marketer/login" className="underline">
              Marketer
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;

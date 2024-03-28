import { Link } from "react-router-dom";
import InputTag from "../components/InputTag";

const MarketerLogin = () => {
  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Login as a Marketer</p>
          <p className=" text-xs ">
            You dont have an account?{" "}
            <Link to="/marketer/signup" className="underline">
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

            <Link to="/marketer">
              <button className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md">
                Login
              </button>
            </Link>
          </div>
          <p className="text-xs mt-2 text-center text-primary-mainBlue">
            Login as an{" "}
            <Link to="/admin/login" className="underline">
              Admin
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default MarketerLogin;

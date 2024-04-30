/* eslint-disable react/prop-types */
import { TfiMenu } from "react-icons/tfi";
import { useSelector } from "react-redux";

const TopNav = ({ proileImg }) => {
  const auth = useSelector((state) => state.auth);
  const userInfo = auth?.user;
  return (
    <div className="flex items-center justify-between">
      <div className="onMobilMemu">
        <TfiMenu className="text-3xl" />
      </div>

      <div className="proile md:w-[30%] ml-auto flex justify-end items-center gap-2">
        <div className="text-xs text-end text-primary-mainBlue">
          <p className="name">
            Welcome <span>{userInfo?.firstName}</span> {""}
            <span>({userInfo?.role})</span>
          </p>
          <p className="email">{userInfo?.email}</p>
        </div>
        <div className="img bg-primary-mainBlue w-[40px] h-[40px] flex items-center justify-center">
          {proileImg ? (
            <img src={proileImg} alt="" />
          ) : (
            <p className="text-white text-2xl font-bold">
              {userInfo?.firstName.slice(0, 1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;

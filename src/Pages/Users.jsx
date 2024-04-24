import PageName from "../components/PageName";
import TopNav from "./TopNav";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../Feature/GetUserSlice";
const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2";

const Users = () => {
  const dispatch = useDispatch();
  const { status, allUsers } = useSelector((state) => state.allUsers);
  console.log("on the page", allUsers, status);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <>
        <div className="flex flex-col gap-10">
          <PageName pageNmae={"Users"} />

          <div className="flex items-center justify-end gap-5">
            <p className="text-2xl">Add users</p>
            <Button btnText={"Add user"} />
          </div>

          <div className="bg-white shadow-xl">
            <div className="px-5 py-2 text-primary-mainBlue flex items-center justify-between">
              <div className="flex items-center justify-end gap-5">
                <Button btnText={"All"} />
                <Button btnText={"Admins"} />
                <Button btnText={"Marketers"} />
              </div>
              <p>Tota users ({allUsers?.length})</p>
            </div>
            <table className="table  divide-y  divide-gray-200 w-full">
              <thead>
                <tr className="text-center bg-primary-mainBlue">
                  <th className={`${tHead}`}>S/N</th>
                  <th className={`${tHead}`}>Username</th>
                  <th className={`${tHead}`}>Email</th>
                  <th className={`${tHead}`}>Verified</th>
                  <th className={`${tHead}`}>Role</th>
                  <th className={`${tHead}`}>Last modified</th>
                </tr>
              </thead>
              {status === "idle" ? (
                <tbody>
                  {allUsers?.map((item, index) => (
                    <tr
                      className={`text-center border-b cursor-pointer`}
                      key={index}
                    >
                      <td className={`${tData}`}>{index + 1}</td>

                      <td className={`${tData}`}>{item?.username}</td>
                      <td className={`${tData}`}>{item?.email}</td>
                      <td className={`${tData}`}>
                        {item?.emailVerified === true
                          ? "Verified"
                          : "unverified"}
                      </td>
                      <td className={`${tData}`}>{item.role}</td>
                      <td className={`${tData}`}>{item.lastModifiedAt}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <p>Loading....</p>
              )}
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default Users;
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import Button from "../components/Button";
import { campaignData } from "../utilities/dataUse";
import BoardCard from "../components/BoardCard";
import CampaignForm from "../components/CampaignForm";
import { useSelector } from "react-redux";
import { useGetCampaignQuery } from "../services/campaignApi";
const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2";

const Campaign = () => {
  const [form, setForm] = useState(false);
  const [allCampaign, setAllCampaign] = useState([]);

  const userRole = useSelector((state) => state.auth?.user?.role);
  const { data, isLoading, isFetching } = useGetCampaignQuery();

  useEffect(() => {
    if (isLoading || isFetching) return;
    setAllCampaign(data?.data);
  }, [data, isFetching, isLoading]);
  console.log("first", data);
  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      {form ? (
        <div className="flex flex-col gap-10">
          <CampaignForm closeForm={() => setForm(false)} />
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <PageName pageNmae={"Campaign"} />

          {userRole === "ADMIN" ? (
            ""
          ) : (
            <div className="flex items-center justify-end gap-5">
              <p className="text-2xl">Create Campaign</p>
              <Button
                btnText={"Create Campaign"}
                btnClick={() => setForm(true)}
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-5 text-primary-mainBlue">
            <BoardCard name={"Campaign"} total={allCampaign?.length + 300} />
            <BoardCard name={"Active"} total={allCampaign?.length + 100} />
            <BoardCard name={"Draft"} total={allCampaign?.length} />
          </div>

          <div className="bg-white shadow-xl">
            <div className="px-5 py-2 text-primary-mainBlue flex items-center justify-between">
              {allCampaign?.length === 0 ? (
                <p className="text-red-600 text-xl">No campaign available</p>
              ) : (
                <p>Total campaign ({allCampaign?.length})</p>
              )}
            </div>
            <table className="table  divide-y  divide-gray-200 w-full">
              <thead>
                <tr className="text-center bg-primary-mainBlue">
                  <th className={`${tHead}`}>S/N</th>
                  <th className={`${tHead}`}>Title</th>
                  <th className={`${tHead}`}>Type</th>
                  <th className={`${tHead}`}>Status</th>
                  <th className={`${tHead}`}>Created by</th>

                  <th className={`${tHead}`}>Last modified</th>
                </tr>
              </thead>

              <tbody>
                {allCampaign?.map((item, index) => (
                  <tr
                    className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                    key={index}
                  >
                    <td className={`${tData}`}>{index + 1}</td>
                    <td className={`${tData}`}>{item?.title}</td>
                    <td className={`${tData}`}>{item?.type}</td>
                    <td className={`${tData}`}>{item?.status}</td>
                    <td className={`${tData}`}>{item?.authorId}</td>
                    <td className={`${tData}`}>
                      {item.lastModifiedAt.toDateString()}
                      {/* {item?.lastModifiedAt ? new Date(item.lastModifiedAt).toDateString() : 'N/A'} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Campaign;

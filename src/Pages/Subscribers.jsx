import { useCallback, useEffect, useState } from "react";
import TopNav from "./TopNav";
import Button from "../components/Button";
import InputTag from "../components/InputTag";
import PageName from "../components/PageName";
import BoardCard from "../components/BoardCard";
// import PaginationComp from "../components/PaginationComp";
import { BiDotsHorizontal } from "react-icons/bi";
import {
  useUpdateCampaignListMutation,
  useCreatCampaignListMutation,
  useDeleteCampaignListMutation,
  useGetCampaignListQuery,
  useImportSubscribersMutation,
  useLazyGetCampaignListSubscribersQuery,
} from "../services/campaignApi";
import BarsLoader from "../utilities/BarsLoader";
import { validateForm } from "../utilities/validation";
import { useMediaFileUploadMutation } from "../services/mediaApi";
import { errorToast, successToast } from "../utilities/ToastMessages";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2";

const Subscribers = () => {
  const [showForm, setShowForm] = useState(false);
  const [importForm, setImportForm] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allCampaignList, setAllCampaignList] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [csvError, setCsvError] = useState("");

  const [campaignListState, setCamgaignListState] = useState({
    name: "",
  });
  const [subscriberState, setSubscriberState] = useState({
    campaignListId: "",
  });

  const [creatCampaignList, { isLoading: isCreateList }] =
    useCreatCampaignListMutation();
  const [updateCampaignList, { isLoading: isUpdateList }] =
    useUpdateCampaignListMutation();
  const [deleteCampaignList, { isLoading: isDeleteList }] =
    useDeleteCampaignListMutation();
  const [mediaFileUpload, { isLoading: isUploadingFire }] =
    useMediaFileUploadMutation();
  const [importSubscribers, { isLoading: isImporting }] =
    useImportSubscribersMutation();
  const { data, refetch } = useGetCampaignListQuery();

  const [
    triggerGetSubscribers,
    { data: subscribers, isFetching: isFetchimgSub },
  ] = useLazyGetCampaignListSubscribersQuery();

  const getSubscribers = useCallback(async () => {
    if (!selectedItem || fetched) return;
    try {
      const data = await triggerGetSubscribers(selectedItem.id).unwrap();
      setSubscriberList(data?.data);
      setFetched(true);
      return data;
    } catch (error) {
      errorToast(error.data?.message || "Something went wrong");
    }
  }, [selectedItem, fetched, triggerGetSubscribers]);

  useEffect(() => {
    if (isFetchimgSub) return;
    getSubscribers();
  }, [isFetchimgSub, subscribers, selectedItem, getSubscribers]);

  useEffect(() => {
    if (fetched) return;
    setAllCampaignList(data?.data);
  }, [data, fetched]);

  const handleFileChange = async (e, inputName) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("file", file);
    setCsvError("");
    try {
      const res = await mediaFileUpload(formData).unwrap();
      setSubscriberState((prevFiles) => ({
        ...prevFiles,
        [inputName]: res.data.id,
      }));
    } catch (error) {
      errorToast(error?.error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCsvError("");
    if (id === "name") {
      setCamgaignListState((pre) => ({ ...pre, [id]: value }));
    } else {
      setSubscriberState((pre) => ({ ...pre, [id]: value }));
    }
  };

  const submitCampList = async (e) => {
    e.preventDefault();
    if (!validateForm(campaignListState)) {
      errorToast("All fields are required");
    } else {
      try {
        if (selectedItem && editMode) {
          await updateCampaignList({
            id: selectedItem.id,
            data: campaignListState,
          }).unwrap();
          successToast("Campaign list updated successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          await creatCampaignList(campaignListState).unwrap();
          successToast("Campaign list created successfully");
        }
        setShowForm(false);
        refetch();
      } catch (error) {
        errorToast(error.data.message);
      }
    }
  };

  const action = (item) => {
    setOpenItemId((prevOpenItemId) =>
      prevOpenItemId === item.id ? null : item.id
    );
    setSelectedItem(item);
  };
  const closeAction = () => {
    setOpenItemId(null);
    setSelectedItem(null);
    setEditMode(false);
  };
  const openEdit = () => {
    setShowForm(true);
    setEditMode(true);
  };

  useEffect(() => {
    if (selectedItem && editMode) {
      setCamgaignListState({
        ...selectedItem,
      });
    }
  }, [editMode, selectedItem]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCampaignList(selectedItem?.id).unwrap();
      successToast("Campaign list deleted successfully");
      refetch();
    } catch (error) {
      errorToast(error.data?.message || "Something went wrong");
    }
  };

  //
  const submitUpload = async (e) => {
    e.preventDefault();

    try {
      await importSubscribers(subscriberState).unwrap();
      successToast("Subscribers imported successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setCsvError(error.data.message || "Something went wrong");
      errorToast(error.data?.message || "invalid csv file");
    }
  };

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      {importForm ? (
        <div className="flex flex-col gap-10">
          <div className="md:w-[85%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
            <div>
              <InputTag
                inputType={"file"}
                inputLabel={`Import a CSV file`}
                inputChange={(e) =>
                  handleFileChange(e, "subscribersMediaFileId")
                }
                inputFor={"subscribersMediaFileId"}
              />
              {csvError ? (
                <span className="text-red-700 text-lg">{csvError}</span>
              ) : (
                ""
              )}
            </div>

            <div>
              <label htmlFor="campaignListId">Available campaign list</label>{" "}
              <br />
              <select
                name="campaignListId"
                id="campaignListId"
                onChange={(e) => handleChange(e)}
                className=" px-5 py-2 border-2 "
              >
                <option value="">Select campaign list</option>
                {allCampaignList?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>{" "}
              <br />
              {csvError ? (
                <span className="text-red-700 text-lg">{csvError}</span>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center gap-10">
              <button
                // onClick={btnClick}
                className="hover-effect px-7 py-2 bg-primary-mainBlue text-white text-sm"
              >
                {"Cancel"}
              </button>
              <Button btnText={"Submit"} btnClick={submitUpload} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            <PageName pageNmae={"Subscribers"} />

            <div className="flex items-center justify-end gap-5">
              <Button
                btnText={"Import subscribers (CSV)"}
                btnClick={() => setImportForm(true)}
              />
              <Button
                btnText={"Create campaign list"}
                btnClick={() => setShowForm(!showForm)}
              />
            </div>

            <div className="flex items-start gap-5 justify-between text-primary-mainBlue">
              <div className="w-1/3">
                <BoardCard
                  name={"Campaign list"}
                  total={allCampaignList?.length}
                />
              </div>

              <div className="w-2/3 bg-white shadow-xl min-h-[150px] max-h-[300px] overflow-auto ">
                {/* TODO: PUT THE LIST FOR HERE FOR A WHILE */}
                {showForm ? (
                  <form action="" className=" p-5">
                    <div className="flex items-center justify-between gap-5">
                      <div className="w-1/2 flex flex-col gap-5">
                        <InputTag
                          inputChange={(e) => handleChange(e)}
                          inputFor={"name"}
                          inputLabel={"Campaign list name"}
                          inputPlaceholder={"Enter campiagn list name"}
                          inputValue={campaignListState.name}
                        />
                        <Button
                          btnText={editMode ? "Update" : "Save"}
                          btnClick={submitCampList}
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  ""
                )}

                <div className="px-5 py-2 text-primary-mainBlue">
                  <p>Total campaign list({allCampaignList?.length})</p>
                </div>
                <table className="table  divide-y  divide-gray-200 w-full">
                  <thead>
                    <tr className="text-center bg-primary-mainBlue">
                      <th className={`${tHead}`}>S/N</th>
                      <th className={`${tHead}`}>Name</th>
                      <th className={`${tHead}`}>Updated at</th>
                      <th className={`${tHead}`}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allCampaignList?.map((item, index) => (
                      <tr
                        className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                        key={index}
                        onClick={() => {
                          setFetched(false);
                          setSelectedItem(item);
                        }}
                      >
                        <td className={`${tData}`}>{index + 1}</td>

                        <td className={`${tData}`}>{item.name}</td>
                        <td className={`${tData}`}>
                          {new Date(item.lastModifiedAt).toDateString()}
                        </td>
                        <td className={`${tData} cursor-pointer`}>
                          <p
                            className="flex items-center justify-center text-3xl"
                            onClick={() => action(item)}
                          >
                            <BiDotsHorizontal />
                          </p>

                          <div
                            className={`${
                              openItemId === item.id ? "" : "hidden"
                            } py-2 px-3 bg-white flex flex-col gap-3 absolute right-5 shadow-lg z-[100]`}
                          >
                            <p
                              className="hover-effect text-xs cursor-pointer text-[#0F2851]"
                              onClick={() => closeAction()}
                            >
                              Close
                            </p>
                            <p
                              className="hover-effect text-xs cursor-pointer text-[#0F2851]"
                              onClick={openEdit}
                            >
                              Update
                            </p>
                            <p
                              className="hover-effect text-xs cursor-pointer text-[#FF0101]"
                              onClick={handleDelete}
                            >
                              {isDeleteList ? (
                                <BarsLoader height={20} color={"#f1f5f9"} />
                              ) : (
                                "Delete"
                              )}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white shadow-xl">
              <div className="px-5 py-2 text-primary-mainBlue flex items-center justify-between">
                <p>The subscribers in {selectedItem?.name}</p>
                <p>Total Subscribers({subscriberList?.length})</p>
              </div>
              <table className="table  divide-y  divide-gray-200 w-full">
                <thead>
                  <tr className="text-center bg-primary-mainBlue">
                    <th className={`${tHead}`}>S/N</th>
                    <th className={`${tHead}`}>First name</th>
                    <th className={`${tHead}`}>Last name</th>
                    <th className={`${tHead}`}>Email</th>
                    <th className={`${tHead}`}>Phone number</th>
                    {/* <th className={`${tHead}`}>Status</th> */}
                  </tr>
                </thead>
                {subscriberList.length === 0 ? (
                  <tr className="text-center">
                    <td className="">No data</td>
                  </tr>
                ) : (
                  <tbody>
                    {subscriberList?.map((item, index) => (
                      <tr
                        className={`text-center border-b cursor-pointer`}
                        key={index}
                      >
                        <td className={`${tData}`}>{index + 1}</td>
                        <td className={`${tData}`}>{item.firstName}</td>
                        <td className={`${tData}`}>{item.lastName}</td>
                        <td className={`${tData}`}>{item.emailAddress}</td>
                        <td className={`${tData}`}>{item.phoneNumber}</td>
                        {/* <td className={`${tData}`}>
                          {item.status ? "Active" : "Inactive"}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>

              {/* <div className="pagination flex items-end justify-end">
                <PaginationComp />
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Subscribers;

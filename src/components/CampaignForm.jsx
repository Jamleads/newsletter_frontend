/* eslint-disable react/prop-types */
import { useState } from "react";
import InputTag from "../components/InputTag";
import TextAreaTag from "./TextAreaTag";
import { useMediaFileUploadMutation } from "../services/mediaApi";
import { errorToast, successToast } from "../utilities/ToastMessages";
import { validateForm } from "../utilities/validation";
import { useCreateCampaignMutation } from "../services/campaignApi";

const CampaignForm = ({ closeForm }) => {
  const [mediaFileUpload, { isLoading }] = useMediaFileUploadMutation();
  const [createCampaign, { isLoading: isLoadingCamp }] =
    useCreateCampaignMutation();

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [campaignFormState, setCampaignFormState] = useState({
    name: "",
    title: "",
    detail: "",
    type: "EMAIL",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCampaignFormState((pre) => ({ ...pre, [id]: value }));
  };
  const handleFileChange = async (e, inputName) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("file", file);
    try {
      const res = await mediaFileUpload(formData).unwrap();
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [inputName]: res.data.id,
      }));
    } catch (error) {
      errorToast(error?.error);
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    !validateForm(campaignFormState) && errorToast("All fields are required");
    const payLoad = {
      ...campaignFormState,
      ...selectedFiles,
    };
    try {
      const res = await createCampaign(payLoad).unwrap();
      console.log("cretaed campaign", res);
      successToast("Campaign created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return res;
    } catch (error) {
      errorToast(error.data.message);
    }
  };

  return (
    <>
      <div className="md:w-[85%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Create Campaign</p>
        </div>

        <form action="" className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-5">
              <InputTag
                inputFor={"name"}
                inputType={"text"}
                inputPlaceholder={"Enter name"}
                inputLabel={"Campaign name"}
                inputValue={campaignFormState?.name}
                inputChange={(e) => handleChange(e)}
              />
              <div>
                <label htmlFor="status" className="capitalize">
                  Campaign type
                </label>
                <br />
                <select
                  id="type"
                  name="type"
                  value={campaignFormState.type}
                  onChange={(e) => handleChange(e)}
                  className="border-[1px] border-primary-mainBlue px-5 py-2 rounded-md bg-transparent w-full mt-2"
                >
                  <option value="EMAIL" className="capitalize">
                    Email
                  </option>
                  <option value="SMS" className="capitalize">
                    Sms
                  </option>
                </select>
              </div>
              {/* <InputTag
                inputFor={"date"}
                inputPlaceholder={"Enter date"}
                inputType={"text"}
                inputLabel={"Campaign date"}
              /> */}
              <div>
                <TextAreaTag
                  textareaName={"detail"}
                  labelTitle={"Details"}
                  textareaPlaceholder={"Briefly about campaign details"}
                  textareaValue={campaignFormState.detail}
                  textareaOnChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <InputTag
                inputFor={"title"}
                inputType={"text"}
                inputPlaceholder={"Enter title"}
                inputLabel={"Campaign title"}
                inputValue={campaignFormState.title}
                inputChange={(e) => handleChange(e)}
              />
              <InputTag
                inputFor={"imageMediaFile"}
                inputType={"file"}
                inputPlaceholder={"Add an image"}
                inputLabel={"Campaign image"}
                inputChange={(e) => handleFileChange(e, "imageMediaFileId")}
              />
              <InputTag
                inputFor={"video"}
                inputType={"file"}
                inputPlaceholder={"Add a video"}
                inputLabel={"Campaign video"}
                inputChange={(e) => handleFileChange(e, "videoMediaFileId")}
              />
            </div>
          </div>

          <div className=" flex items-center justify-center gap-10">
            <button
              disabled={isLoading || isLoadingCamp}
              onClick={submitCreate}
              className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md"
            >
              Create campaign
            </button>

            <button
              disabled={isLoading || isLoadingCamp}
              onClick={closeForm}
              className="bg-secondary-gray text-primary-mainBlue border-[1px] font-bold px-5 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CampaignForm;

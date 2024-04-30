/* eslint-disable react/prop-types */
import { useState } from "react";
import InputTag from "../components/InputTag";
// import { errorToast, successToast } from "../utilities/ToastMessages";

const CampaignForm = ({ closeForm }) => {
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((pre) => ({ ...pre, [id]: value }));
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await createUser(formState).unwrap();
    //   successToast("User created successfully");
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    //   return res;
    // } catch (error) {
    //   errorToast(error.data.message);
    // }
  };

  return (
    <>
      <div className="md:w-[85%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Create Campaign</p>
        </div>

        <form action="" onSubmit={submitCreate} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-5">
              <InputTag
                inputFor={"name"}
                inputPlaceholder={"Enter name"}
                inputType={"text"}
                inputLabel={"Campaign name"}
              />
              <div>
                <label htmlFor="status" className="capitalize">
                  Campaign status
                </label>
                <br />
                <select
                  id="status"
                  name="status"
                  className="border-[1px] border-primary-mainBlue px-5 py-2 rounded-md bg-transparent w-full mt-2"
                >
                  <option value="draft" className="capitalize">
                    Draft
                  </option>
                  <option value="pending" className="capitalize">
                    Pending
                  </option>
                  <option value="approved" className="capitalize">
                    Approved
                  </option>
                  <option value="sent" className="capitalize">
                    sent
                  </option>
                  <option value="rejected" className="capitalize">
                    rejected
                  </option>
                  <option value="completed" className="capitalize">
                    completed
                  </option>
                </select>
              </div>
              <InputTag
                inputFor={"date"}
                inputPlaceholder={"Enter date"}
                inputType={"text"}
                inputLabel={"Campaign date"}
              />
            </div>
            <div className="flex flex-col gap-5">
              <InputTag
                inputFor={"title"}
                inputPlaceholder={"Enter title"}
                inputType={"text"}
                inputLabel={"Campaign title"}
              />
              <InputTag
                inputFor={"image"}
                inputPlaceholder={"Add an image"}
                inputType={"file"}
                inputLabel={"Campaign image"}
              />
              <InputTag
                inputFor={"video"}
                inputPlaceholder={"Add a video"}
                inputType={"file"}
                inputLabel={"Campaign video"}
              />
            </div>
          </div>

          <div>
            <label htmlFor="details" className="capitalize">
              details
            </label>
            <br />
            <textarea
              name="details"
              id="details"
              className=" w-full h-[350px] border-[1px] border-primary-mainBlue rounded-lg"
            ></textarea>
          </div>

          <div className=" flex items-center justify-center gap-10">
            <button
              //   disabled={isLoading}
              className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md"
            >
              Create campaign
            </button>

            <button
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

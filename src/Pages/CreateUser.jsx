/* eslint-disable react/prop-types */
import { useState } from "react";
import InputTag from "../components/InputTag";
import { useCreateUserMutation } from "../services/userApi";
import { errorToast, successToast } from "../utilities/ToastMessages";

const CreateUser = ({ closeForm }) => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "MARKETING",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((pre) => ({ ...pre, [id]: value }));
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser(formState).unwrap();
      successToast("User created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return res;
    } catch (error) {
      errorToast(error.data.message);
    }
  };

  return (
    <>
      <div className="md:w-[50%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-primary-mainBlue">
          <p className="text-2xl font-bold">Add user</p>
        </div>

        <form action="" onSubmit={submitCreate}>
          <div className=" flex flex-col gap-5">
            <InputTag
              inputValue={formState.firstName}
              inputChange={(e) => handleChange(e)}
              inputFor={"firstName"}
              inputPlaceholder={"Enter user's first name"}
              inputType={"text"}
              inputLabel={"First Name"}
            />
            <InputTag
              inputValue={formState.lastName}
              inputChange={(e) => handleChange(e)}
              inputFor={"lastName"}
              inputPlaceholder={"Enter user's last name"}
              inputType={"text"}
              inputLabel={"Last Name"}
            />
            <InputTag
              inputValue={formState.username}
              inputChange={(e) => handleChange(e)}
              inputFor={"username"}
              inputPlaceholder={"Enter user's username"}
              inputType={"text"}
              inputLabel={"username"}
            />
            <InputTag
              inputValue={formState.email}
              inputChange={(e) => handleChange(e)}
              inputFor={"email"}
              inputPlaceholder={"Enter user's email"}
              inputType={"email"}
              inputLabel={"email"}
            />
            <div>
              <label htmlFor="role" className="capitalize">
                Role
              </label>
              <br />
              <select
                id="role"
                name="role"
                onChange={(e) => handleChange(e)}
                className="border-[1px] border-primary-mainBlue px-5 py-2 rounded-md bg-transparent w-full mt-2"
              >
                <option value="MARKETING">MARKETING</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className=" flex items-center justify-center gap-10">
              <button
                disabled={isLoading}
                className="bg-primary-mainBlue text-white font-bold px-5 py-2 rounded-md"
              >
                {!isLoading ? "Add user" : "Loading..."}
              </button>

              <button
                onClick={closeForm}
                className="bg-secondary-gray text-primary-mainBlue border-[1px] font-bold px-5 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;

import React from "react";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";

const Dashboard = () => {
  const [loginData, setLoginData] = useState(null);
  const [userData, setUserData] = useState({});
  let [isOpen, setIsOpen] = useState(false);
  const [upudateData, setUpdateData] = useState({
    name: "",
    email: "",
    address: "",
    age: "",
    phone: "",
    adhaar: "",
    gender: "",
    password: "",
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const handleChangeGender = (value) => {
    setUpdateData({ ...upudateData, gender: value.value });
  };

  useEffect(() => {
    setLoginData(JSON.parse(window.localStorage.getItem("token")));
    FindUserData();
  }, []);

  // console.log("from dashboard", userData);

  const FindUserData = () => {
    const id = JSON.parse(window.localStorage.getItem("token")).data._id;
    // console.log(id);

    axios
      .get(`http://localhost:4000/user?id=${id}`)
      .then((res) => {
        // console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function EditData() {
    console.log("Edit Data >> ");
    setUpdateData({
      name: userData.name,
      email: userData.email,
      address: userData.address,
      age: userData.age,
      phone: userData.phone,
      adhaar: userData.adhaar,
      gender: userData.gender,
      // password: "",
    });
  }

  function UpdateUser() {
    // console.log("from update User >> ", upudateData);
    const id = JSON.parse(window.localStorage.getItem("token")).data._id;

    // console.log("Update id >> ", id);

    axios
      .put(`http://localhost:4000/users/${id}`, upudateData)
      .then((res) => {
        console.log(res);
        FindUserData();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsOpen(false);
  }

  return (
    <>
      <div>
        <div className="card p-8 w-72 md:ml-[40%]  ">
          <div>
            <span className="font-semibold opacity-50">Name : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.name
                  : userData.name
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Email : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.email
                  : userData.email
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Address : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.address
                  : userData.address
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Adhaar : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.adhaar
                  : userData.adhaar
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Phone : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.phone
                  : userData.phone
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Age : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.age
                  : userData.age
                : null}
            </span>
          </div>
          <div>
            <span className="font-semibold opacity-50">Gender : </span>
            <span className="font-light ml-2 text-lg opacity-75">
              {loginData
                ? loginData.userType === "admin"
                  ? loginData.data.gender
                  : userData.gender
                : null}
            </span>
          </div>
          <div>
            {loginData ? (
              loginData.userType === "user" ? (
                <button
                  className="flex flex-row mt-4 font-medium bg-gray-500 text-white p-1 rounded-md hover:bg-gray-400 "
                  onClick={() => {
                    EditData();
                    setIsOpen(true);
                  }}
                >
                  <AiOutlineEdit /> <span>Update User Data</span>
                </button>
              ) : null
            ) : null}
          </div>
        </div>
        {/* Modal  */}
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="bg-[#f7f7f7] w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                      >
                        Please Enter User Data and Register!
                      </Dialog.Title>
                      <div className="grid grid-cols-2 mt-4 ">
                        <div className="col-span-1">
                          <div>
                            <div className="font-semibold text-gray-600">
                              Name
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.name}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Email
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.email}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  email: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Address
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.address}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  address: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Age
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.age}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  age: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-span-1 ml-2">
                          <div>
                            <div className="font-semibold text-gray-600">
                              Adhaar
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.adhaar}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  adhaar: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Phone
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              value={upudateData.phone}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  phone: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Gender
                            </div>
                            <Select
                              className="border-[1px] w-48 h-[2.25rem] rounded-md mt-1"
                              // defaultValue={upudateData.gender}
                              options={genderOptions}
                              onChange={handleChangeGender}
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-gray-600">
                              Password
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="text"
                              // value={upudateData.password}
                              onChange={(e) => {
                                setUpdateData({
                                  ...upudateData,
                                  password: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-1"
                          onClick={() => UpdateUser()}
                        >
                          Submit and Change
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

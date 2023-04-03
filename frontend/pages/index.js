import { HiOutlineLogin } from "react-icons/hi";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const userTypeOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const handleChangeGender = (value) => {
    setregisterValue({ ...registerValue, gender: value.value });
  };
  const handleChangeUserType = (data) => {
    setregisterValue({ ...registerValue, userType: data.value });
  };

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState({
    email: false,
    password: false,
  });

  const [registerValue, setregisterValue] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    age: "",
    phone: "",
    adhaar: "",
    gender: "",
    userType: "user",
  });
  const [registerError, setregisterError] = useState({
    name: false,
    email: false,
    password: false,
    address: false,
    age: false,
    phone: false,
    adhaar: false,
  });
  const clearData = () => {
    setregisterValue({
      ...registerValue,
      name: "",
      email: "",
      password: "",
      address: "",
      age: "",
      phone: "",
      adhaar: "",
      gender: "",
      userType: "user",
    });
  };

  function SubmitLogin() {
    // console.log("Login Value >> ", loginValue);

    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!loginValue.email) {
      return setErrorLogin({ ...errorLogin, email: true });
    } else if (!regex.test(loginValue.email)) {
      return setErrorLogin({ ...errorLogin, email: true });
    }

    if (!loginValue.password) {
      return setErrorLogin({ ...errorLogin, password: true });
    }

    axios
      .post("http://localhost:4000/login", loginValue)
      .then((res) => {
        // console.log(res.data.data);

        if (res.status === 200) {
          if (res.status === 200) {
            localStorage.setItem(
              "token",
              JSON.stringify({
                userType: res.data.data.userType,
                data: res.data.data,
              })
            );
          }

          router.push({
            pathname: "/dashboard",
            // query: { data_id: res.data.data._id },
          });
        }
      })
      .catch((err) => {
        console.log(`error occuring Lgin ${err}`);
        // setSpinner(false);
      });
  }
  function SubmitRegister() {
    console.log("HandleRegister", registerValue);
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!registerValue.name) {
      return setregisterError({ ...registerError, name: true });
    }

    if (!registerValue.email) {
      return setregisterError({ ...registerError, email: true });
    } else if (!regex.test(registerValue.email)) {
      return setregisterError({ ...registerError, email: true });
    }
    if (!registerValue.password) {
      return setregisterError({ ...registerError, password: true });
    }
    if (!registerValue.address) {
      return setregisterError({ ...registerError, address: true });
    }
    if (!registerValue.age) {
      return setregisterError({ ...registerError, age: true });
    }

    if (!registerValue.phone) {
      return setregisterError({ ...registerError, phone: true });
    }
    if (!registerValue.adhaar) {
      return setregisterError({ ...registerError, adhaar: true });
    }

    axios
      .post("http://localhost:4000/users", registerValue)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Something went wrong!, Error: ${err}`);
      });

    setIsOpen(false);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-[#f7e6d9]">
        <div className="flex justify-center items-center flex-col bg-[#f7f7f7] rounded-md shadow-md w-3/4 h-fit md:w-96 xl:w-96 shadow-[#f8a67c] ">
          <div className="text-center w-full mt-2">
            <p className="text-base capitalize font-light mb-2 text-gray-600 ">
              Welcome Back
            </p>
            <p className="text-xs capitalize font-light text-gray-600 ">
              Sign In To Continue
            </p>
          </div>
          <div className=" flex items-center justify-center w-full">
            <div className="w-3/4">
              <div className="font-semibold text-gray-600">Email</div>
              <input
                type="email"
                className={
                  errorLogin.email
                    ? "border-[1px] focus:outline-red-600 border-red-600  px-3 text-[0.9rem] rounded-[3px] mt-2 w-full h-9"
                    : "border-[1px]  px-3 text-[0.9rem] rounded-[3px]  mt-2 w-full h-9"
                }
                value={loginValue.email}
                onChange={(e) => {
                  setLoginValue({
                    ...loginValue,
                    email: e.target.value,
                  });
                  setErrorLogin({ ...errorLogin, email: false });
                }}
              />

              <div className="flex">
                <div className="text-gray-600 font-semibold mt-5">Password</div>
                <div className="cursor-pointer mr-2 text-gray-600 hover:text-gray-800 text-xs font-light mt-7 flex justify-end w-full transition ease-in-out hover:duration-300">
                  Forget Password?
                </div>
              </div>
              <input
                type="password"
                className={
                  errorLogin.password
                    ? "border-[1px] border-red-600 focus:border-red-600 px-3 text-[0.9rem] rounded-[3px]  mt-2 w-full h-9 "
                    : "border-[1px] px-3 text-[0.9rem] rounded-[3px]  mt-2 w-full h-9 "
                }
                value={loginValue.password}
                onChange={(e) => {
                  setLoginValue({
                    ...loginValue,
                    password: e.target.value,
                  });
                  setErrorLogin({ ...errorLogin, password: false });
                }}
              />
              <div className="flex justify-center mt-8 mb-14">
                <button
                  onClick={() => SubmitLogin()}
                  className=" bg-black w-32 h-10 text-white rounded-md hover:bg-[#333] flex justify-center items-center font-semibold transition ease-in-out hover:duration-300"
                >
                  <HiOutlineLogin /> <span>Login</span>
                </button>
              </div>
              <div className="flex justify-center mb-2 font-medium text-gray-400 ">
                New user please
                <button
                  className="ml-2 font-light hover:-translate-y-1 cursor-pointer"
                  onClick={() => {
                    clearData();
                    setIsOpen(true);
                  }}
                >
                  Register.
                </button>
              </div>
            </div>
          </div>
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
                            className={
                              registerError.name
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.name}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                name: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                name: false,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <div className="font-semibold text-gray-600">
                            Password
                          </div>
                          <input
                            className={
                              registerError.password
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.password}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                password: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                password: false,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <div className="font-semibold text-gray-600">Age</div>
                          <input
                            className={
                              registerError.age
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.age}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                age: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                age: false,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <div className="font-semibold text-gray-600">
                            Phone
                          </div>
                          <input
                            className={
                              registerError.phone
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.phone}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                phone: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                phone: false,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-600">
                            Adhaar
                          </div>
                          <input
                            className={
                              registerError.adhaar
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.adhaar}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                adhaar: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                adhaar: false,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-span-1 ml-2">
                        <div>
                          <div className="font-semibold text-gray-600">
                            Email
                          </div>
                          <input
                            className={
                              registerError.email
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.email}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                email: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                email: false,
                              });
                            }}
                          />
                        </div>

                        <div>
                          <div className="font-semibold text-gray-600">
                            Address
                          </div>
                          <input
                            className={
                              registerError.address
                                ? "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 focus:outline-red-600 border-red-600"
                                : "border-[1px] w-48 h-[2.25rem] rounded-md mt-1 "
                            }
                            type="text"
                            value={registerValue.address}
                            onChange={(e) => {
                              setregisterValue({
                                ...registerValue,
                                address: e.target.value,
                              });
                              setregisterError({
                                ...registerError,
                                address: false,
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
                            options={genderOptions}
                            onChange={handleChangeGender}
                          />
                        </div>

                        <div className="mt-1">
                          <div className="font-semibold text-gray-600">
                            User Type
                          </div>
                          <Select
                            className="border-[1px] w-48 h-[2.25rem] rounded-md mt-1"
                            options={userTypeOptions}
                            defaultValue={userTypeOptions[0]}
                            onChange={handleChangeUserType}
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
                        onClick={() => SubmitRegister()}
                      >
                        Submit
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

Home.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

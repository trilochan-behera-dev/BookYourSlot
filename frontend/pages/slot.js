import React from "react";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

const slot = () => {
  const [slotData, setSlotData] = useState([]);
  const [slotStatus, setSlotStatus] = useState({ status: "", id: "" });
  let [isOpen, setIsOpen] = useState(false);
  // const [date, setDate] = useState("");
  // console.log(date);

  useEffect(() => {
    getAllSlot();
  }, []);

  const getAllSlot = (e) => {
    // console.log(date);
    const date = moment(e).format("DD-MM-YYYY");

    axios
      .get(`http://localhost:4000/slot/?date=${date}`)
      .then((response) => {
        // console.log(response);

        setSlotData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function UpdateSlot() {
    // console.log("slotStatus", slotStatus);
    // console.log("Update Status");

    const body = {
      status: slotStatus.status,
    };

    axios
      .put(`http://localhost:4000/slot/${slotStatus.id}`, body)
      .then((res) => {
        // console.log(res.data);
        getAllSlot();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="my-4 ml-4">
        <div>Select Date</div>
        <input
          type="date"
          onChange={(e) => {
            // setDate();
            getAllSlot(e.target.value);
          }}
        />
      </div>
      {/* Table  */}
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Adhaar
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Update Status
                </th> */}
                {/* <th scope="col" className="px-6 py-3">
                  View Details
                </th> */}
              </tr>
            </thead>
            <tbody>
              {slotData.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{e.user.name}</td>
                    <td className="px-6 py-4">{e.user.adhaar}</td>
                    <td className="px-6 py-4">{e.user.phone}</td>
                    <td className="px-6 py-4">{e.date}</td>
                    <td className="px-6 py-4">{e.status}</td>
                    {/* <td className="px-6 py-4">
                      <select
                        className="rounded-md p-1 bg-gray-300"
                        onChange={(ele) => {
                          setSlotStatus({
                            ...slotStatus,
                            status: ele.target.value,
                            id: e._id,
                          });
                          // UpdateSlot();
                        }}
                      >
                        <option value={"pending"}>pending</option>
                        <option value={"confirmed"}>confirmed</option>
                        <option value={"cancel"}>cancel</option>
                      </select>

                      <button
                        onClick={() => UpdateSlot()}
                        className="ml-1 bg-gray-300 p-1 rounded-md hover:bg-gray-200"
                      >
                        <MdOutlineDone />
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                          <span></span>
                        </div>
                      </div>

                      <div className="col-span-1 ml-2"></div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
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
};

export default slot;

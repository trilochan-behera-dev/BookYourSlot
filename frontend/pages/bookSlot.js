import React from "react";
import { useState, Fragment, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";

const bookSlot = () => {
  const [slotData, setSlotData] = useState([]);
  const [hiddenSlot, setHiddenSlot] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [slotBookDate, setSlotBookDate] = useState("");
  const [findSlotData, setFindSlotData] = useState({});
  //   console.log(findSlotData);

  useEffect(() => {
    FindBookedSlot();
  }, []);

  const getAllSlot = (e) => {
    setHiddenSlot(true);

    const date = moment(e).format("DD-MM-YYYY");

    axios
      .get(`http://localhost:4000/slot/?date=${date}`)
      .then((response) => {
        setSlotData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function BookSlot() {
    // console.log("Book Slot >> ", slotBookDate);
    const date = moment(slotBookDate).format("DD-MM-YYYY");
    const id = JSON.parse(window.localStorage.getItem("token")).data._id;
    const data = {
      date: date,
      status: "confirmed",
      user: id,
    };

    console.log(data);

    axios
      .post("http://localhost:4000/slot/newSlot", data)
      .then((res) => {
        console.log(res);

        Swal.fire({
          title: res.data.message,
          showConfirmButton: false,
          timer: 1600,
        });
        FindBookedSlot();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(false);
  }

  const FindBookedSlot = () => {
    const id = JSON.parse(window.localStorage.getItem("token")).data._id;
    // console.log("Booked Slot >> ");
    axios
      .get(`http://localhost:4000/user/slot?id=${id}`)
      .then((response) => {
        setFindSlotData(response.data[0].slot);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div className="my-4 ml-4 bg-[#f7f7f7] p-4 w-fit flex space-x-3 rounded-md ">
          <div className="font-medium">Select Date</div>
          <input
            type="date"
            className="bg-[#f7f7f7] hover:translate-y-px "
            onChange={(e) => {
              getAllSlot(e.target.value);
            }}
          />
        </div>

        <div>
          <div className="my-4 ml-4 bg-[#f7f7f7] p-4 w-fit flex flex-col space-x-3 rounded-md  ">
            <div className="font-medium">
              Total Slot : <span className="font-light">5</span>
            </div>

            {hiddenSlot ? (
              <>
                <div className="font-medium">
                  Available Slot :
                  <span className="font-light">
                    {slotData.length < 5
                      ? 5 - slotData.length
                      : "All Slots Booked "}
                  </span>
                </div>
                <div>
                  {slotData.length < 5 ? (
                    <button
                      className="border-[1px] bg-slate-50 p-1 rounded-md hover:bg-white"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      Book Slot
                    </button>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
        {findSlotData && (
          <div className="my-4 ml-4 bg-[#f7f7f7] p-4 w-fit flex flex-col space-x-3 rounded-md  ">
            <div>
              <div>
                Date : <span>{findSlotData.date}</span>
              </div>
              <div>
                Status : <span>{findSlotData.status}</span>
              </div>
            </div>
          </div>
        )}

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
                        Please Select Date!
                      </Dialog.Title>
                      <div className=" mt-4 ">
                        <div>
                          <div>
                            <div className="font-semibold text-gray-600">
                              Date
                            </div>
                            <input
                              className="border-[1px] w-48 h-[2.25rem] border-gray-300 rounded-md mt-1 focus:outline-gray-300  "
                              type="date"
                              onChange={(e) => {
                                setSlotBookDate(e.target.value);
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
                          onClick={() => BookSlot()}
                        >
                          Conform
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

export default bookSlot;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";

const updateSlot = () => {
  const [slotData, setSlotData] = useState([]);
  const [slotStatus, setSlotStatus] = useState({ status: "", id: "" });
  //   let [isOpen, setIsOpen] = useState(false);
  // const [date, setDate] = useState("");
  // console.log(date);

  useEffect(() => {
    getAllSlot();
  }, []);

  const getAllSlot = (e) => {
    // console.log(date);
    // const date = moment(e).format("DD-MM-YYYY");

    axios
      .get(`http://localhost:4000/slot`)
      .then((response) => {
        console.log(response);

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
      {/* <div className="my-4 ml-4">
        <div>Select Date</div>
        <input
          type="date"
          onChange={(e) => {
            // setDate();
            getAllSlot(e.target.value);
          }}
        />
      </div> */}
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Update Status
                </th>
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
                    <td className="px-6 py-4">{e.date}</td>
                    <td className="px-6 py-4">{e.status}</td>
                    <td className="px-6 py-4">
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default updateSlot;

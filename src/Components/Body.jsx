import axios from "axios";
import { useState, useEffect } from "react";
import Button from "./Button";
import Pagination from "./Pagination";
import Record from "./Record";
import Report from "./Report";

const Body = ({ onClickEdit, role }) => {
  const userBtns = {
    Admin: ["UPDATE", "ARCHIVE"],
    Radiologist: ["REPORT", "DONE"],
    Physician: ["REPORT", "EDIT"],
    HeadOfDepart: ["ASSIGN", "VIEW"],
  };
  const userID = window.sessionStorage.getItem("ricomUserID");
  const [recordsData, setRecordsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    await axios
      .get(`/api/orders/getOrders/${userID}`, { withCredentials: true })
      .then((resp) => {
        console.log(resp.data.data[0].id);
        setRecordsData(resp.data.data);
        setLoading(false);
      });
  };

  const getRecord = (record) => {
      return (
        <>
          {role == "PHYSICIAN" && (
            <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Physician}
                role={role}
                onClickEdit={onClickEdit}
                data={record}
              />
            </>
          )}
          {role == "ADMIN" && (
            <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Admin}
                role={role}
                onClickEdit={onClickEdit}
                data={record}
              />
            </>
          )}
          {role == "PHYSICIAN" && (
            <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Physician}
                role={role}
                onClickEdit={onClickEdit}
                data={record}
              />
            </>
          )}
          {role == "Radiologist" && (
            <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Radiologist}
                role={role}
                onClickEdit={onClickEdit}
                data={record}
              />
            </>
          )}
          {role == "HEADOFDEPART" && (
            <>
              <Record
                key={record.id}
                btnsLabel={userBtns.HeadOfDepart}
                role={role}
                onClickEdit={onClickEdit}
                data={record}
              />
            </>
          )}
        </>
      )
  };

  useEffect(() => {
    fetchRecords();
    // setUser(userToCommWith.get(user))
  }, [userID]);

  return (
    <>
      <div className="overflow-auto no-scrollbar w-full h-[550px]">
        <table className="w-full table-auto border-separate border-spacing-responsive md:border-spacing">
          {/* <thead class="flex w-full items-center justify-between mb-7"> */}
          <tr className="bg-white sticky top-0 text-center py-1 h-4 w-5/6">
            <th className="p-2 text-left ">Patient REF</th>
            <th className="p-2">Order</th>
            <th className="p-2">Added At</th>
            <th className="p-2">Status</th>
            <th className="p-2">
              {role == "PHYSICIAN" ? "Radiologist" : "Physician"}
            </th>
            <th className="p-2"></th>
          </tr>
          {/* </thead> */}
          {/* <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full"> */}

          {!loading ? (
            recordsData.map((record) => getRecord(record))
          ) : (
            <h3>Loading</h3>
          )}
          {/* { setTimeout(() => {recordsData.map(
           (record) => getRecord(record))}, 100)
            // <Record btnsLabel={userBtns.Admin} role ={role} onClickEdit={onClickEdit} data={record} />
          } */}
          {/* {
  getRecord("test")
} */}
          {/* </tbody> */}
        </table>
      </div>
    </>
  );
};

export default Body;

import axios from "axios";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { triggerRefresh, selectRecord } from "../redux/recordSlice"


import Pagination from "./Pagination";
import Record from "./Record";

const Body = ({ onClickEdit, role }) => {
  const userBtns = {
    Admin: ["SHOW", "ARCHIVE"],
    Radiologist: ["REPORT", "DONE"],
    Physician: ["REPORT", "EDIT"],
    HeadOfDepart: ["VIEW", "ASSIGN"],
  };
  const userID = window.sessionStorage.getItem("ricomUserID");
  const [recordsData, setRecordsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("");
  const { refresh } = useSelector((state) => state.record)

  const record = useSelector((state) => state.record)

  const dispatch = useDispatch();
  

  const limit = 7;

  const fetchRecords = async (currentPage = 0) => {
    // console.log(currentPage)
    // console.log(userID)
    let url = '';
    if(role === "ADMIN"){
      url = `/api/users/getUsers/${userID}/${currentPage}/${limit}/${role}`;
    } else {
      url = `/api/orders/getOrders/${userID}/${currentPage}/${limit}/${role}`;
    }
    await axios
      .get(url, { 
        header : {
          'Content-Type' : 'application/json'
        },
        withCredentials: true 
      })
      .then((resp) => {
        // console.log(resp.data.data[0].id);
        // console.log(resp.data.data);
        // console.log(resp.data.recordsTotal);

        setRecordsData(resp.data.data);
        setLoading(false);
        let total = parseInt(resp.data.recordsTotal);
        // console.log(total)
        setPageCount(Math.ceil(total / limit));
      }).catch(e => console.log(e));
      // return total;
  };

  const changeRecordState = async (record) => {
    // console.log(status)
    await axios
        .post(
          `/api/orders/changeOrderState/`,
          {
            orderID : record.id,
            newState: "DONE",
          },
          { withCredentials: true }
        )
        .then((resp) => {
          // console.log(resp.data)
          if (resp.data.msg == "State changed successfully") {
          } else {
            alert("Failed to change state");
          }
          // window.location.reload();
        });
  }



  useEffect(() => {
      fetchRecords();
      // console.log(refresh)
      // console.log(record.order_id)
  }, [userID, status, refresh]);



  const getRecord = (record) => {
    const onClickEdit_ = (e) => {
      if(role !== "ADMIN" && role !== "RADIOLOGIST"){
       
        onClickEdit(e)
      } else {       
          console.log("test")
          setStatus("DONE");
          changeRecordState(record);
      }
    }
      return (
        <>
          {role == "PHYSICIAN" && (
            <> 
              <Record
                key={record.id}
                btnsLabel={userBtns.Physician}
                role={role}
                onClickEdit={onClickEdit_}
                data={record}

              />
            </>
          )}
          {role == "ADMIN" && (
            // <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Admin}
                role={role}
                onClickEdit={onClickEdit_}
                data={record}

              />
            // </>
          )}
          {role == "RADIOLOGIST" && (
            // <>
              <Record
                key={record.id}
                btnsLabel={userBtns.Radiologist}
                role={role}
                onClickEdit={onClickEdit_}
                data={record}

              />
            // </>
          )}
          {role == "HEADOFDEPART" && (
            // <>
              <Record
                key={record.id}
                btnsLabel={userBtns.HeadOfDepart}
                role={role}
                onClickEdit={onClickEdit_}
                data={record}

              />
            // </>
          )}
        </>
      )
  };
  
  const getTableHeadings = () => {
    // console.log(role)
    if(role !== "ADMIN"){
      return (
        <>
            <th className="p-2 text-left ">Patient REF</th>
            <th className="p-2">Order</th>
            <th className="p-2">Added At</th>
            <th className="p-2">Status</th>
            <th className="p-2">
              {((role === "PHYSICIAN" && role !== "HEADOFDEPART") && role !== "RADIOLOGIST") ? "Radiologist" : "Physician"}
            </th>
            <th className="p-2"></th>
        </>
      )
      
    } else {
      
      return (
      <>
            <th className="p-2 text-left ">User ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Email</th>
            <th className="p-2">Created At</th>
            <th className="p-2"></th>
      </>
      )
    }
  }

  return (
    <>
      <div className={`overflow-auto no-scrollbar w-full h-[550px]`}>
        <table className="w-full table-auto border-separate border-spacing-responsive md:border-spacing">
          {/* <thead class="flex w-full items-center justify-between mb-7"> */}
          <tr className="bg-white sticky top-0 text-center py-1 h-4 w-5/6">
            {getTableHeadings()}
          </tr>
          {/* </thead> */}
          {/* <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full"> */}

          {!loading ? (
            recordsData.map((record) => getRecord(record))
          ) : (
            // <em>Loading</em>
            "Loading"
          )}
          {/* </tbody> */}
        </table>
      </div>
      <Pagination fetchRecords={fetchRecords} pageCount={pageCount}/>
    </>
  );
};

export default Body;

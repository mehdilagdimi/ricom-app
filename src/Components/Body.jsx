import { useState, useEffect } from "react";
import Button from "./Button";
import Pagination from "./Pagination";
import Record from "./Record";
import Report from "./Report";

const Body = ( {onClickEdit, role}) => {
  const userBtns = {
   Admin : ["UPDATE", "ARCHIVE"],
   Radiologist : ["REPORT", "DONE"],
   Physician : ["REPORT", "EDIT"],
   HeadOfDepart : ["ASSIGN", "VIEW"],
  }

  useEffect(() => {
    // setUser(userToCommWith.get(user))
  },[role])
  
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
            <th className="p-2">{role == "PHYSICIAN" ? "Radiologist" : "Physician"}</th>
            <th className="p-2"></th>
          </tr>
          {/* </thead> */}
          {/* <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full"> */}
          {role == 'ADMIN' &&
          <>
            <Record btnsLabel={userBtns.Admin} onClickEdit={onClickEdit} />
            <Record btnsLabel={userBtns.Admin} onClickEdit={onClickEdit} />
            </>
          }
          {role == 'PHYSICIAN' &&
          <>
            <Record btnsLabel={userBtns.Physician} onClickEdit={onClickEdit} />
            <Record btnsLabel={userBtns.Physician} onClickEdit={onClickEdit} />
            </>
          }
          {role == 'Radiologist' &&
          <>
            <Record btnsLabel={userBtns.Radiologist} onClickEdit={onClickEdit} />
            <Record btnsLabel={userBtns.Radiologist} onClickEdit={onClickEdit} />
            </>
          }
          {role == 'HEADOFDEPART' &&
          <>
            <Record btnsLabel={userBtns.HeadOfDepart} onClickEdit={onClickEdit} />
            <Record btnsLabel={userBtns.HeadOfDepart} onClickEdit={onClickEdit} />
            </>
          }
          
        
          {/* </tbody> */}
        </table>
      </div>
    </>
  );
};

export default Body;

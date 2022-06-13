import axios from "axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOrdID, updatePhysicianName } from "../redux/recordSlice";

import Button from "./Button";
import Report from "./Report";

const Record = ({ onClickEdit, btnsLabel, role, data }) => {
  const [value, setValue] = useState();
  const [showReport, setShowReport] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selected, setSelected] = useState(false);
  // const [status, setStatus] = useState("")

  const dispatch = useDispatch();


  const selectReport = (e) => {
    dispatch(updateOrdID({ order_id: data.id }))
    dispatch(updatePhysicianName({ physician_lname : data.physician_lname }))
    onClickEdit(e)
  };

  const getReport = (report) => {
    // console.log(report);
  };
  
  const getTableData = () => {
    if (role !== "ADMIN"){
      return (
        <>
            <tr className={`${selected ? "bg-pink-100" : "bg-navGray"} text-center`}>
        <td className="py-2 px-6 text-left rounded-l-lg">{data.patient_id} </td>
        <td className="py-2 px-6"> {data.physician_order}</td>
        <td className="py-2 px-6">{data.addedat}</td>
        <td className="py-2 px-6">{data.status}</td>
        <td className="py-2 px-6">{data.radiologist_id ? (data.radiologist_fname, " ", data.radiologist_lname) : "TO BE ASSIGNED"}</td>
        <td className="h-full w-40 py-2 px-1 text-right">
          <div className="flex justify-end  p-0 m-0">
            <div className="mx-2 inline-block">
              <Button
                label={btnsLabel[0]}
                onClick={() => (
                  setShowReport(!showReport), setSelected(!selected)
                )}
              />
            </div>
            <div className="mx-2 inline-block">
              <Button label={btnsLabel[1]} onClick={selectReport} />
            </div>
          </div>
        </td>
      </tr>
      {showReport && <Report role={role} getReport={getReport} orderID={data.id}/>}
        </>
      )
      
    } else {
      return (
      <>
                  <tr className={`${selected ? "bg-pink-100" : "bg-navGray"} text-center`}>
      <td className="py-2 px-6 text-left rounded-l-lg">{data.id} </td>
      <td className="py-2 px-6"> {(data.fname.concat(" ", data.lname))}</td>
      <td className="py-2 px-6">{data.role}</td>
      <td className="py-2 px-6">{data.email}</td>
      <td className="py-2 px-6">{data.createdat}</td>
      <td className="h-full w-40 py-2 px-1 text-right">
          <div className="flex justify-end  p-0 m-0">
            <div className="mx-2 inline-block">
              <Button
                label={btnsLabel[0]}
                onClick={() => (
                  setShowReport(!showReport), setSelected(!selected)
                )}
              />
            </div>
            <div className="mx-2 inline-block">
              <Button label={btnsLabel[1]} onClick={selectReport} />
            </div>
          </div>
        </td>
      </tr>
      </>
      )
    }
  }

  useEffect(() => {}, [selected]);

  return (
    <>
     {getTableData()}
    </>
  );
};

export default Record;

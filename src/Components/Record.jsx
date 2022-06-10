import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateRadID } from "../redux/recordSlice";

import AddForm from "./AddForm";
import Button from "./Button";
import Report from "./Report";

const Record = ({ onClickEdit, btnsLabel, role, data }) => {
  const [value, setValue] = useState();
  const [showReport, setShowReport] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selected, setSelected] = useState(false);
  const record = useSelector ((state) => state.record)

  const dispatch = useDispatch();


  const selectReport = (e) => {
    let order_id =  data.id;
    dispatch(updateRadID({ order_id}))
    onClickEdit(e)
    // console.log(report);
  };
  const getReport = (report) => {
    // console.log(report);
  };
  // console.log(btnsLabel[0]);
  //   const onClick = (e) => {
  //     onClickEdit(e)
  // console.log(e)
  //   }
  useEffect(() => {}, [selected]);

  return (
    <>
      <tr className={`${selected ? "bg-gray-300" : "bg-navGray"} text-center`}>
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
      {showReport && <Report user={role} getReport={getReport} />}
    </>
  );
};

export default Record;

import axios from "axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateRecordID, updatePhysicianName} from "../redux/recordSlice";

import Button from "./Button";
import Report from "./Report";

const Record = ({ onClickEdit, btnsLabel, role, data }) => {
  const [value, setValue] = useState();
  const [showReport, setShowReport] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selected, setSelected] = useState(false);
  // const { selected } = useSelector((state) => state.record)

  const [archived, setArchived] = useState(false);
  // const [status, setStatus] = useState("")

  const dispatch = useDispatch();

  const selectReport = (e, label) => {
    // archive();
    dispatch(updateRecordID({ record_id: data.id }));
    if(label){
      dispatch(updatePhysicianName({ physician_lname: data.physician_lname }));
      onClickEdit(e);
    } else {
      setSelected(!selected)
    }
    
  };


  useEffect(() => {
    setArchived(data.archive);
    // console.log(data.archive)
    // console.log(archived)
  }, [selected])
  
  useEffect(() => {
    console.log(archived)
  }, [archived])

  const archive = async () => {
    let userID = data.id
    await axios
    .get(`/api/users/archiveUser/${userID}`, { withCredentials: true })
    .then((resp) => {
      console.log(resp.data)
      if (resp.data.response == "User archived successfully") {
        setArchived(true)
      } else {
        alert("Failed to archive user");
      }
    });
  };

  const getTableData = () => {
    if (role !== "ADMIN") {
      return (
        <>
          <tr
            className={`${selected ? "bg-pink-100" : "bg-navGray"} text-center cursor-pointer`}
            onClick = {(e) => selectReport(e)}
          >
            <td className="py-2 px-6 text-left rounded-l-lg">
              {data.patient_id}{" "}
            </td>
            <td className="py-2 px-6"> {data.physician_order}</td>
            <td className="py-2 px-6">{data.addedat}</td>
            <td className="py-2 px-6">{data.status}</td>
            <td className="py-2 px-6">
              {data.radiologist_id
                ? (data.radiologist_fname, " ", data.radiologist_lname)
                : "TO BE ASSIGNED"}
            </td>
            <td className="h-full w-40 py-2 px-1 text-right">
              <div className="flex justify-end  p-0 m-0">
                <div className="mx-2 inline-block">
                  <Button
                    label={btnsLabel[0]}
                    onClick={() => (
                      setShowReport(!showReport), setSelected(!selected)
                      // setShowReport(!showReport), setSelected(!selected)
                    )}
                  />
                </div>
                <div className="mx-2 inline-block">
                  <Button label={btnsLabel[1]} archived={data.status === "DONE" ? true : false} onClick={(e) => selectReport(e, btnsLabel[1])} />
                </div>
              </div>
            </td>
          </tr>
          {showReport && (
            <Report role={role} orderID={data.id} />
            // <Report role={role} getReport={getReport} orderID={data.id} />
          )}
        </>
      );
    } else {
      return (
        <>
          <tr
            className={`${archived ? "bg-gray-50" : "bg-navGray"} text-center cursor-pointer`}
          >
            <td className="py-2 px-6 text-left rounded-l-lg">{data.id} </td>
            <td className="py-2 px-6"> {data.fname.concat(" ", data.lname)}</td>
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
                  <Button
                    label={btnsLabel[1]}
                    onClick={archive}
                    archived={archived}
                  />
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    }
  };

;

  return <>
         {getTableData()}
      </>;
};

export default Record;

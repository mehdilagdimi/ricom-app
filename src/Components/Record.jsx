import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { updateRecordID, updatePhysicianName } from "../redux/recordSlice";

import Button from "./Button";
import Report from "./Report";

const Record = ({ onClickEdit, btnsLabel, role, data }) => {
  const [value, setValue] = useState();
  const [showReport, setShowReport] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selected, setSelected] = useState(false);
  const [serieID, setSerieID] = useState(null);
  const [archived, setArchived] = useState(false);

  const record = useSelector((state) => state.record);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectReport = (e, label) => {
    // archive();
    // dispatch(updateRecordID({ record_id: data.id }));
    dispatch(updateRecordID(data.id));
    // console.log(data.id)
    // console.log(record.record_id);
    if (label) {
      dispatch(updatePhysicianName({ physician_lname: data.physician_lname }));
      onClickEdit(e);
    } else {
      setSelected(!selected);
    }
  };

  useEffect(() => {
    setArchived(data.archive);
  }, [selected, data]);

  useEffect(() => {
    // console.log(archived)
  }, [archived]);

  const archive = async () => {
    let userID = data.id;
    await axios
      .get(`/api/users/archiveUser/${userID}`, { withCredentials: true })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.response == "User archived successfully") {
          setArchived(true);
        } else {
          alert("Failed to archive user");
        }
      });
  };

  const storeStudyID = async (orderID) => {
    console.log(orderID);
    // return;
    if (orderID) {
      await axios
        .get(`/api/studies/setOrderIDStudy/${orderID}`, {
          withCredentials: true,
        })
        .then((resp) => {
          if (resp.data.msg === "Linked Order with Study successfully") {
            console.log("Linked Order with Study successfully");
            console.log(resp.data.serieID.id);
            setSerieID(orderID);
            // dispatch(updateStudyID(resp.data.serieID.id))
          } else {
            alert("Failed linking order with study");
          }
        });
    } else {
      console.log("LOADING");
    }
  };

  useEffect(() => {
    // console.log(serieID)
    if (serieID) {
      navigate(`/study/${serieID}`);
    }
    return () => {
      setSerieID(null);
    };
  }, [serieID]);

  const linkOrderToStudy = async () => {
    await storeStudyID(data.id);
  };

  const getTableData = () => {
    if (role !== "ADMIN") {
      return (
        <>
          <tr
            className={`${
              selected ? "bg-pink-100" : "bg-navGray"
            } text-center cursor-pointer`}
            onClick={(e) => selectReport(e)}
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
                      setShowReport(!showReport),
                      setSelected(!selected)
                      // setShowReport(!showReport), setSelected(!selected)
                    )}
                  />
                </div>

                {role === "RADIOLOGIST" && (
                  <>
                    <div className="mx-2 inline-block">
                      <Button
                        label={"UPLOAD"}
                        onClick={linkOrderToStudy}
                        archived={archived}
                      />
                    </div>
                  </>
                )}

                <div className="mx-2 inline-block">
                  <Button
                    label={btnsLabel[1]}
                    archived={data.status === "DONE" ? true : false}
                    onClick={(e) => selectReport(e, btnsLabel[1])}
                  />
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
            className={`${
              archived ? "bg-gray-50" : "bg-navGray"
            } text-center cursor-pointer`}
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

  return <>{getTableData()}</>;
};

export default Record;

import axios from "axios";
import store from "../redux/store.js"

import { useState, useEffect } from "react"; 

import { useSelector } from "react-redux";

import Button from "./Button";

const Report = ({ role, getReport, orderID }) => {
  const [physReport, setPhysReport] = useState("Insert your report here ...");
  const [radReport, setRadReport] = useState("Insert your report here ...");
  const [label, setLabel] = useState("SAVE")
  const [disabled, setDisabled] = useState(true)
  const [showSave, setShowSave] = useState(false);
  // const record = useSelector ((state) => state.record)
  // const state = store.getState();

  useEffect(() => {
    
  }, [physReport, radReport])
  useEffect(() => {
    const fetchReports = async () => {
      // console.log(orderID)
      await axios
        .get(
          `/api/reports/getReports/${orderID}`,
          { withCredentials: true }
        )
        .then((resp) => {
          // console.log(resp.data)
          if (resp.data.msg == "Reports fetched successfully") {
            // console.log(resp.data.data.reportphysician)
            // console.log(resp.data.data.reportradiologist)
            setPhysReport(resp.data.data.reportphysician)
            setRadReport(resp.data.data.reportradiologist)
          } else {
            console.log("No reports exist")
            // alert("No reports exist");
          }
        });
    };
    fetchReports();
  }, [(role === "RADIOLOGIST" ? physReport :  (role === "PHYSICIAN" ? radReport : physReport, radReport))]);

  const activateArea= (e) => {
    // setDisabled(!disabled);
    // label == "EDIT" ? setLabel("CANCEL") : setLabel("EDIT")
    setLabel("SAVE")
  };
  // console.log(role)
  const showSaveButton = () => {
    setShowSave(true);
  };

  // const hideSaveButton = () => {
  //   setShowSave(false);
  // };

  const storeReport = async () => {
      const userID = window.sessionStorage.getItem("ricomUserID");
      let report = null;

      if(role === "RADIOLOGIST" ){
        report = radReport;
      } else if (role === "PHYSICIAN") { 
        report = physReport;
      }
      
      await axios
        .post(
          `/api/reports/storeReport/${role}`,
          {
            userID: userID,
            orderID: orderID,
            report: report,
            
          },
          { withCredentials: true }
        )
        .then((resp) => {
          // console.log(resp.data)
          if (resp.data.msg == "Report added successfully") {
          } else {
            alert("Failed to add report");
          }
          // window.location.reload();
        });
    };

  const reportHandler = async (e) => {
    e.preventDefault();
    // console.log("test")
    await storeReport();
  }

  return (
    // <div className="w-full flex justify-between items-center">

    <>
      <tr className="text-center h-full">
        <td colSpan="3" className="pb-5 h-96 2xl:pr-16">
          {/* <div className="h-full bg-navGray"></div> */}
          <h3 className="my-1">Radiologist Report</h3>
          <div className="flex flex-col justify-between min-h-full h-5/6 bg-navGray border border-gray-300 rounded-md p-3">
          <form className="h-full w-full" onSubmit={reportHandler}>
              <textarea
                disabled={(role == "RADIOLOGIST" ? false : true)}
                className="h-5/6 w-full p-3 border border-gray-300"
                value={radReport}
                onFocus={showSaveButton}
                // onBlur={hideSaveButton}
                onChange={(e) => setRadReport(e.currentTarget.value)}
              >
                
              </textarea>
              {role == "RADIOLOGIST" && (
                <>
                  <div className="flex justify-end">
                    {/* {!showSave && (
                      <div className="inline-block px-1" onClick={activateArea}>
                        <Button label={label} />
                      </div>
                    )} */}
                    {showSave && (
                      <div className="inline-block px-1"  >
                        <Button onClick={(e) => e.preventDefault} label="SAVE" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </td>
        <td colSpan="3" className="pb-5 h-96 pl-10">
          <h3 className="my-1 w-full">Physician Report</h3>
          <div className="flex flex-col justify-between min-h-full h-full bg-navGray border border-gray-300 rounded-md p-3">
            <form className="h-full w-full" onSubmit={reportHandler}>
              <textarea
                disabled={(role == "PHYSICIAN" ? false : true)}
                className="h-5/6 w-full p-3 border border-gray-300"
                value={physReport}
                onFocus={showSaveButton}
                // onBlur={hideSaveButton}
                onChange={(e) => setPhysReport(e.currentTarget.value)}
              >
                TEXTkkk
              </textarea>
              {role == "PHYSICIAN" && (
                <>
                  <div className="flex justify-end">
                    {!showSave && (
                      <div className="inline-block px-1" onClick={activateArea}>
                        <Button label={label} />
                      </div>
                    )}
                    {showSave && (
                      <div className="inline-block px-1">
                        <Button onClick={(e) => e.preventDefault} label="SAVE" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </td>
      </tr>
    </>

    // </div>
  );
};

export default Report;

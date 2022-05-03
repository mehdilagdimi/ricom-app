import { useState } from "react";
import Button from "./Button";

const Report = ({ user }) => {
  const [value, setValue] = useState("");
  const [showSave, setShowSave] = useState(false);
  const showSaveButton = () => {
    setShowSave(true);
  };
  const hideSaveButton = () => {
    setShowSave(false);
  };
  return (
    // <div className="w-full flex justify-between items-center">

    <>
      <tr className="text-center h-96">
        <td colSpan="3" className="pb-5 h-96">
          {/* <div className="h-full bg-navGray"></div> */}
          <h3 className="bg-white my-1">Radiologist Report</h3>
          <div className="min-h-full h-full bg-navGray py-3 border border-gray-300 rounded-md">
            TEXT
          </div>
        </td>
        <td colSpan="2" className="pb-5 h-96">
          <h3 className="bg-white my-1 ml-20">Physician Report</h3>
          <div className="flex flex-col justify-between min-h-full h-full bg-navGray py-3 border border-gray-300 rounded-md ml-20 p-3">
            <form className="h-full w-full">
              <textarea
                className="h-5/6 w-full p-3"
                value={value}
                onFocus={showSaveButton}
                onBlur={hideSaveButton}
              >
                TEXT
              </textarea>
              <div className="flex justify-end">
                {!showSave && (
                  <div className="inline-block px-1">
                    <Button label="EDIT" />
                  </div>
                )}
                {showSave && (
                  <div className="inline-block px-1">
                    <Button label="SAVE" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </td>
      </tr>
    </>

    // </div>
  );
};

export default Report;

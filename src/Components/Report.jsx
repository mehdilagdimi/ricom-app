import { useState, useEffect } from "react";
import Button from "./Button";

const Report = ({ user, getReport }) => {
  const [value, setValue] = useState("TEXT");
  const [label, setLabel] = useState("EDIT")
  const [disabled, setDisabled] = useState(true)
  const [showSave, setShowSave] = useState(false);
  useEffect(() => {
    getReport(value)
  }, [value])

  const activateArea= (e) => {
    setDisabled(!disabled);
    label == "EDIT" ? setLabel("CANCEL") : setLabel("EDIT")
  };
  console.log(user)
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
        <td colSpan="3" className="pb-5 h-96 2xl:pr-16">
          {/* <div className="h-full bg-navGray"></div> */}
          <h3 className="bg-white my-1">Radiologist Report</h3>
          <div className="flex flex-col justify-between min-h-full h-full bg-navGray border border-gray-300 rounded-md p-3">
          <form className="h-full w-full" onSubmit={(e) => e.preventDefault()}>
              <textarea
                disabled={(user == "radiologist" ? false : true)}
                className="h-5/6 w-full p-3 border border-gray-300"
                value={value}
                onFocus={showSaveButton}
                onBlur={hideSaveButton}
                onChange={(e) => setValue(e.currentTarget.value)}
              >
                
              </textarea>
              {user == "radiologist" && (
                <>
                  <div className="flex justify-end">
                    {!showSave && (
                      <div className="inline-block px-1" onClick={activateArea}>
                        <Button label={label} />
                      </div>
                    )}
                    {showSave && (
                      <div className="inline-block px-1">
                        <Button label="SAVE" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </td>
        <td colSpan="3" className="pb-5 h-96 pl-10">
          <h3 className="bg-white my-1 ml-20">Physician Report</h3>
          <div className="flex flex-col justify-between min-h-full h-full bg-navGray border border-gray-300 rounded-md p-3">
            <form className="h-full w-full" onSubmit={(e) => e.preventDefault()}>
              <textarea
                disabled={disabled}
                className="h-5/6 w-full p-3 border border-gray-300"
                value={value}
                onFocus={showSaveButton}
                onBlur={hideSaveButton}
                onChange={(e) => setValue(e.currentTarget.value)}
              >
                TEXTkkk
              </textarea>
              {user == "physician" && (
                <>
                  <div className="flex justify-end">
                    {!showSave && (
                      <div className="inline-block px-1" onClick={activateArea}>
                        <Button label={label} />
                      </div>
                    )}
                    {showSave && (
                      <div className="inline-block px-1">
                        <Button label="SAVE" />
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

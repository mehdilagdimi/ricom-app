import { useState, useEffect } from "react";
import Button from "./Button";
const AddForm = ({ getInput }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    getInput(value);
  }, [value]);

  return (
    <div className="relative flex justify-center items-center mx-3">
      <div className="bg-navGray rounded-md p-4 xl:w-3/6 lg:w-4/6 sm:w-5/6 w-full">
        <form className="w-full flex flex-col">
          <div className="flex flex-col xl:w-3/6 lg:w-4/6 sm:w-5/6 w-full justify-end">
            <label htmlFor="name">Patient Ref</label>
            <input
              className="m-4 rounded-md p-4 "
              type="text"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <textarea className="m-4 rounded-md p-4 w-full"></textarea>
          </div>
          <div className="flex justify-end w-3/4">
            <Button label="SAVE" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;

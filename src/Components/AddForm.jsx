import { useState, useEffect } from "react";
import Button from "./Button";
const AddForm = ({ getInput }) => {
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  useEffect(() => {
    getInput(value);
  }, [value]);

  return (
    <div className="fixed top-1/4 flex justify-center w-full items-center font-bahnschrift">
      <div className="bg-navGray rounded-md border-gray-400 border p-4 xl:w-2/6 lg:w-3/6 sm:w-4/6 w-full m-4">
        <form className="w-full flex flex-col">
          <div className="flex flex-col xl:w-3/6 lg:w-4/6 sm:w-5/6 w-full justify-end">
            <label htmlFor="name" className="mx-4">
              Patient Ref
            </label>
            <input
              className="m-4 rounded-md p-4 border-gray-300 border"
              id="name"
              type="text"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <label htmlFor="name" className="mx-4">
              Order{" "}
            </label>

            <textarea className="m-4 rounded-md p-4 border-gray-300 border">{value2}</textarea>
          </div>
          <div className="flex justify-end w-full px-4">
            <Button label="SAVE" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;

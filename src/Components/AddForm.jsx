import { useState, useEffect } from "react";
import Button from "./Button";
const AddForm = ({ getInput }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    getInput(value);
  }, [value]);

  return (
    <div className="fixed z-10 top-1/4 flex w-full justify-center items-center mx-3">
      <div className="bg-navGray rounded-md border-gray-400 border p-4 xl:w-3/6 lg:w-4/6 sm:w-5/6 w-full">
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

            <textarea className="m-4 rounded-md p-4 border-gray-300 border"></textarea>
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

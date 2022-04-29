import Button from "./Button"

const Record = () => {
  return (
    <>
      <div className="flex bg-navGray items-center my-3 py-1 px-5 rounded-lg ">
        <div className="flex flex-1 justify-between mx-6 py-4">
          <div>
            <p>Patient</p>
          </div>
          <div>
            <p>Patient</p>
          </div>
          <div>
            <p>Patient</p>
          </div>
          <div>
            <p>Patient</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mx-1">
            <Button label="REPORT" />
          </div>
          <div className="mx-1 ">
            <Button label="EDIT" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Record;

import Button from "./Button";
import Pagination from "./Pagination";
import Record from "./Record";
import Report from "./Report";

const Body = () => {
  return (
    <>
      <div className="overflow-auto no-scrollbar w-full h-[550px]">
        <table className="w-full table-auto border-separate border-spacing-responsive md:border-spacing">
          {/* <thead class="flex w-full items-center justify-between mb-7"> */}
          <tr className="bg-white sticky top-0 text-center py-1 h-4 w-5/6">
            <th className="p-2 text-left ">Patient REF</th>
            <th className="p-2">Order</th>
            <th className="p-2">Added At</th>
            <th className="p-2">Status</th>
            <th className="p-2"></th>
          </tr>
          {/* </thead> */}
          {/* <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full"> */}
          <Record />
          <Report />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          {/* </tbody> */}
        </table>
      </div>
      {/* <div className="flex flex-wrap bg-navGray items-center my-3 py-1 w-5/6 rounded-lg ">
        <div className="flex flex-wrap flex-1 justify-between mx-5 py-4">
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
      </div>
      <Record />
      <Record />
      <Record /> */}
    </>
  );
};

export default Body;

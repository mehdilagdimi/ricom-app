import Button from "./Button";
import Pagination from "./Pagination";
import Record from "./Record";

const Body = () => {
  return (
    <>
      <div className="overflow-auto">
        <table className="w-full table-auto border-separate border-spacing-responsive md:border-spacing ">
          <tr className="bg-white text-center py-1 h-4 w-5/6">
            <th className="p-4 text-left ">Patient REF</th>
            <th className="p-4">Order</th>
            <th className="p-4">Added At</th>
            <th className="p-4">Status</th>
            <th className="p-4"></th>
          </tr>
          <Record />
          <Record />
          <Record />
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

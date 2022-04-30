import Button from "./Button";
import Record from "./Record";

const Body = () => {
  return (
    <>
      <table className="w-full table-fixed border-separate border-spacing">
        <tr className="bg-white text-center py-1 h-4 w-5/6">
          <th className="p-4">Company</th>
          <th>Contact</th>
          <th>Country</th>
          <th>Country</th>
          <th></th>
        </tr>
       <Record />
       <Record />
       <Record />
      </table>

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

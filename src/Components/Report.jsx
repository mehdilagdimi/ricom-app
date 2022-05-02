const Report = () => {
  return (
    // <div className="w-full flex justify-between items-center">
    <>
      <tr className="text-center h-96">
        <td colspan="3" className="py-3 h-96">
          {/* <div className="h-full bg-navGray"></div> */}
          <h3 className="bg-white my-1">Radiologist Report</h3>
          <div className="min-h-full h-full bg-navGray py-3 border border-gray-300 rounded-md">
            TEXT
          </div>
        </td>
        <td colspan="2" className="py-3 h-96">
          <h3 className="bg-white my-1 ml-20">Physician Report</h3>
          <div className="min-h-full h-full bg-navGray py-3 border border-gray-300 rounded-md ml-20">
            TEXT
          </div>
        </td>
      </tr>
    </>

    // </div>
  );
};

export default Report;

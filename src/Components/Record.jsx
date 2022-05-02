import { useState } from 'react'
import Button from "./Button"
import Report from './Report';



const Record = ( ) => {
  const [showReport, setShowReport] =  useState(false); 
  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="py-2 px-6 text-left rounded-l-lg"> Patient</td>
          <td className="py-2 px-6"> Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="h-full py-2 px-6 text-right">
            <div className="m-2 inline-block">
              <Button label="REPORT" onClick={() => setShowReport(true)} />
            </div>
            <div className="m-2 inline-block">
              <Button label="EDIT" />
            </div>
          </td>
        </tr>
        {showReport && <Report /> }
    </>
  );
};

export default Record;

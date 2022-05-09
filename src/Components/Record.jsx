import { useState } from 'react'
import AddForm from './AddForm';
import Button from "./Button"
import Report from './Report';



const Record = ({onClickEdit, btnsLabel}) => {
  const [value, setValue] = useState()
  const [showReport, setShowReport] =  useState(false); 
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const getReport = (report) => {
    console.log(report)
  }
  console.log(btnsLabel[0])
//   const onClick = (e) => {
//     onClickEdit(e)
// console.log(e)
//   }

  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="py-2 px-6 text-left rounded-l-lg"> Patient</td>
          <td className="py-2 px-6"> Order Order Order</td>
          <td className="py-2 px-6">Patient</td>
          <td className="py-2 px-6">Pending</td>
          <td className="py-2 px-6">Radiologist</td>
          <td className="h-full w-40 py-2 px-1 text-right">
            <div className="flex justify-end  p-0 m-0">
            <div className="mx-2 inline-block">
              <Button label={btnsLabel[0]} onClick={() => setShowReport(!showReport)} />
            </div>
            <div className="mx-2 inline-block">
              <Button label={btnsLabel[1]} onClick={onClickEdit}/>
            </div>
            </div>
          </td>
        </tr>
        {showReport && <Report user={"physician"} getReport={getReport}/> }
    </> 
  );
};

export default Record;

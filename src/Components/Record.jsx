import { useState } from 'react'
import AddForm from './AddForm';
import Button from "./Button"
import Report from './Report';



const Record = ({onClickEdit}) => {
  const [value, setValue] = useState()
  const [showReport, setShowReport] =  useState(false); 
  const [showUpdateForm, setShowUpdateForm] = useState(false)
//   const onClick = (e) => {
//     onClickEdit(e)
// console.log(e)
//   }
  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="py-2 px-6 text-left rounded-l-lg"> Patient</td>
          <td className="py-2 px-6"> Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="h-full py-2 px-6 text-right">
            <div className="m-2 inline-block">
              <Button label="REPORT" onClick={() => setShowReport(!showReport)} />
            </div>
            <div className="m-2 inline-block">
              <Button label="EDIT" onClick={onClickEdit}/>
            </div>
          </td>
        </tr>
        {showReport && <Report /> }
    </> 
  );
};

export default Record;

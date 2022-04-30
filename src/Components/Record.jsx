import Button from "./Button"

const Record = () => {
  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="p-4 rounded-lg"> Patient</td>
          <td> Patient</td>
          <td>Patient</td>
          <td>Patient</td>
          <td className="flex justify-end p-4">
            <div className="mx-1">
              <Button label="REPORT" />
            </div>
            <div className="mx-1">
              <Button label="EDIT" />
            </div>
          </td>
        </tr>
    </>
  );
};

export default Record;

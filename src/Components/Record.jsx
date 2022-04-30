import Button from "./Button"

const Record = () => {
  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="p-2 rounded-lg"> Patient</td>
          <td> Patient</td>
          <td>Patient</td>
          <td>Patient</td>
          <td className="flex h-full p-2 justify-center items-center">
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

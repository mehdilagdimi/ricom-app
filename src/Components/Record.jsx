import Button from "./Button"

const Record = () => {
  return (
    <>
       <tr className="bg-navGray text-center">
          <td className="py-2 px-6 rounded-lg text-left"> Patient</td>
          <td className="py-2 px-6"> Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="py-2 px-6">Patient</td>
          <td className="h-full py-2 px-6 text-right">
            <div className="m-2 inline-block">
              <Button label="REPORT" />
            </div>
            <div className="m-2 inline-block">
              <Button label="EDIT" />
            </div>
          </td>
        </tr>
    </>
  );
};

export default Record;

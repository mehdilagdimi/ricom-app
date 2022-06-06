import axios from "axios";
import { useState, useEffect } from "react";
import useLocalStorage from "../Custom hooks/useLocalStorage";
import Button from "./Button";

const AddForm = ({role }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [patients_id, setPatientsId] = useLocalStorage("patientsId", []);
// console.log(window.sessionStorage.getItem("ricomUserID"));
  const fetchPatientsIds = async () => {
    await axios
      .get("/api/users/getPatientById/", {
        withCredentials: true,
      })
      .then((resp) => {
        let patients = resp.data.patients_id;
        let ids = [];
        patients.forEach((p_obj) => {
          let id = Object.values(p_obj)[0];

          ids.push(id.toString());
        });
        setPatientsId(ids);
      });
  };

  const storeOrder = async (e) =>{
    const userID = window.sessionStorage.getItem("ricomUserID");
    // await axios.post("http://localhost/ricom%20api/api/orders/storeOrder/", {
    await axios.post("/api/orders/storeOrder/", {
      userID : userID,
      patientID : value,
      order : value2
    },
    {withCredentials : true}
    ).then((resp)=> {
      // console.log(resp.data)
      if(resp.data.msg == "Order added successfully"){
      } else {
        alert("Failed to add order");
      }
      window.location.reload();
    })
  }

  const searchFor = async (text) => {
    await fetchPatientsIds();
    let matches = [];
    if (text.length > 0) {
      matches = patients_id.filter((id) => {
        const regex = new RegExp(`${text}`, "gi");
        return id.match(regex);
      });
    }
    setSuggestions(matches);
    setValue(text);
  };

  
  const addHandler =  async (e) => {
    e.preventDefault();
    await storeOrder(e);

  }
  // useEffect(() => {
  //   getInput(value);
  //   console.log(patients_id);
  // }, []);

  return (
    <div className="fixed top-1/4 flex justify-center w-full items-center font-bahnschrift">
      <div className="bg-navGray rounded-md border-gray-400 border p-4 xl:w-2/6 lg:w-3/6 sm:w-4/6 w-full m-4">
        <form className="w-full flex flex-col" onSubmit={addHandler}>
          <div className="relative flex flex-col xl:w-3/6 lg:w-4/6 sm:w-5/6 w-full justify">
            <label htmlFor="name" className="mx-4">
              Patient Ref
            </label>
            <input
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              id="name"
              type="text"
              value={value}
              onChange={(e) => searchFor(e.currentTarget.value)}
              onBlur={() => {
                setTimeout(()=> {setSuggestions([])}, 100)
              }}
            />
            {suggestions &&
              suggestions.map((sug, i) => (
                <div
                  className="z-40 mx-4 w-11/12 top-1/3 mt-12 absolute py-1 pl-4 bg-white md:rounded border-gray-300 border"
                  key={i}
                  onClick={() => (setValue(sug), setSuggestions([]))}
                >
                  {sug}
                </div>
              ))}
          </div>
          <div className="z-0 w-full flex flex-col justify-center">
            <label htmlFor="name" className="mx-4">
              Order{" "}
            </label>

            <textarea
              className="m-4 rounded-md p-4 border-gray-300 border"
              defaultValue={value2}
              onChange={(e) => setValue2(e.currentTarget.value)}
            ></textarea>
          </div>
          <div className="flex justify-end w-full px-4">
            <Button onClick={(e) => e.preventDefault} label="SAVE" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;

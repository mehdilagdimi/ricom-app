import axios from "axios";
import { useState, useEffect } from "react";
import useLocalStorage from "../Custom hooks/useLocalStorage";
import Button from "./Button";

const AddForm = ({ role }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [patients_id, setPatientsId] = useLocalStorage("patientsId", []);
  const [radiologists, setRadiologists] = useLocalStorage("radiologists", []);
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

  const fetchRadiologists = async () => {
    await axios
      .get("/api/users/getRadiologists/", {
        withCredentials: true,
      })
      .then((resp) => {
        let radiologists = resp.data.radiologists;
        let names = [];
        radiologists.forEach((r_obj) => {
          // names.push(r_obj.fname.concat(" ", r_obj.lname));
          names.push(r_obj.lname);
        });

        setRadiologists(names);
      });
  };

  const storeOrder = async (e) => {
    const userID = window.sessionStorage.getItem("ricomUserID");
    // await axios.post("http://localhost/ricom%20api/api/orders/storeOrder/", {
    await axios
      .post(
        "/api/orders/storeOrder/",
        {
          userID: userID,
          patientID: value,
          order: value2,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(resp.data)
        if (resp.data.msg == "Order added successfully") {
        } else {
          alert("Failed to add order");
        }
        window.location.reload();
      });
  };
  const assignRadiologist = async (e) => {
    const userID = window.sessionStorage.getItem("ricomUserID");
    await axios
      .post(
        "/api/orders/setRadiologist/",
        {
          radID: radID,
          orderID: value,
          order: value2,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(resp.data)
        if (resp.data.msg == "Order added successfully") {
        } else {
          alert("Failed to add order");
        }
        window.location.reload();
      });
  };
  //adaptible fetching data for autocomplet search functionality
  const fetchData = async (role) => {
    if (role === "PHYSICIAN") {
      return await fetchPatientsIds();
    } else if (role === "HEADOFDEPART") {
      return await fetchRadiologists();
    }
  };
  const regexFunc = (text, data_arr) => {
    let matches = [];
    // console.log(data_arr);
    if (text.length > 0) {
      matches = data_arr.filter((elem) => {
        const regex = new RegExp(`${text}`, "gi");
        return elem.match(regex);
      });
    }
    console.log(matches)
    setSuggestions(matches);
  };

  const searchFor = async (text) => {
    // await fetchPatientsIds();
    await fetchData(role);
    if (role === "HEADOFDEPART") {
      regexFunc(text, radiologists);
      setValue3(text);
      // return;
    } else {
      regexFunc(text, patients_id);
      // console.log(text)
      setValue(text);
    }
  };

  const addHandler = async (e) => {
    e.preventDefault();
    if (role === "PHYSICIAN") {
      await storeOrder(e);
    } else if (role === "HEADOFDEPART") {
      await assignRadiologist(e);
    };
  }
  // useEffect(() => {
  //   // getInput(value);
  //   // console.log(patients_id);
  //   console.log(suggestions);
  // }, [suggestions]);

  return (
    <div className="fixed top-1/4 flex justify-center w-full items-center font-bahnschrift">
      <div className="bg-navGray rounded-md border-gray-400 border p-4 xl:w-2/6 lg:w-3/6 sm:w-4/6 w-full m-4">
        <form className="w-full flex flex-col justify-center items-center" onSubmit={addHandler}>
          <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full justify-center">
            <label htmlFor="name" className="mx-4">
              {role !== "HEADOFDEPART" ? "Patient Ref" : "Physician :"}
            </label>
            <input
              disabled={role !== "HEADOFDEPART" ? false : true}
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              id="name"
              type="text"
              value={value}
              onChange={
                role !== "HEADOFDEPART" ?
                ((e) => searchFor(e.currentTarget.value))
                : null
              }
              onBlur={
                role !== "HEADOFDEPART" ?
                (() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }) : null
              }
            />
            {suggestions &&
              role !== "HEADOFDEPART" &&
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
          {role !== "HEADOFDEPART" ? (
            <>
              <div className="z-0 w-full flex flex-col justify-center">
                <label htmlFor="name" className="mx-4">
                  Order :
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
            </>
          ) : (
            <div className="relative flex flex-col  xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full justify-center">
              <label htmlFor="name" className="mx-4">
                Radiologist :
              </label>
              <input
                className="mx-4 m-4 rounded-md p-4 border-gray-300 border"
                id="name"
                type="text"
                value={value3}
                onChange={(e) => searchFor(e.currentTarget.value)}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }}
              />
              {suggestions.length ?
              (<div
                className="z-40 mx-4 w-11/12 top-1/3 mt-12 absolute md:rounded border-gray-300 border">
                {suggestions.map((sug, i) => (
                  <div
                    className="relative py-1 pl-2 bg-white md:rounded"
                    key={i}
                    onClick={() => (setValue3(sug), setSuggestions([]))}
                  >
                    {sug} 
                  </div>
                ))}
                </div>
              ): null}
              <div className="flex justify-end w-full px-4">
                <Button onClick={(e) => e.preventDefault} label="ASSIGN" />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddForm;

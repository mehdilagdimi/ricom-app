import axios from "axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { triggerRefresh } from "../redux/recordSlice";

import useLocalStorage from "../Custom hooks/useLocalStorage";

import Button from "./Button";

const AddForm = ({ role, setShowForm }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userfName, setfName] = useState("");
  const [userlName, setlName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassw, setUserPassw] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [patients_id, setPatientsId] = useLocalStorage("patientsId", []);
  const [radiologists, setRadiologists] = useLocalStorage("radiologists", []);
  const [radIDs, setRadiologistsID] = useLocalStorage("radiologists_id", []);
  // console.log(window.sessionStorage.getItem("ricomUserID"));
  const record = useSelector((state) => state.record);
  // const { record_id, } = record
  // const dispatch = useDispatch();

  useEffect(() => {
    if (role === "HEADOFDEPART") {
      if (record.physician_lname !== undefined) {
        setValue(record.physician_lname);
      }
    }

    console.log(record.record_id)
  }, [role]);

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
        let ids = [];
        radiologists.forEach((r_obj) => {
          // names.push(r_obj.fname.concat(" ", r_obj.lname));
          names.push(r_obj.lname);
          ids.push(r_obj.id);
        });

        setRadiologists(names);
        setRadiologistsID(ids);
      });
  };

  const storeOrder = async () => {
    const userID = window.sessionStorage.getItem("ricomUserID");
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

  const storeUser = async () => {
    const userID = window.sessionStorage.getItem("ricomUserID");
    await axios
      .post(
        "/api/users/storeUser/",
        {
          // id of admin
          userID: userID,
          // new user info
          fName: userfName,
          lName: userlName,
          role: userRole,
          phone: userPhone,
          email: userEmail,
          passw: userPassw,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp.data)
        if (resp.data.msg === "User added successfully") {
          window.location.reload();
        } else if (resp.data.msg === "User already exists"){
          alert("User already exists !");
        } else {
          alert("Failed to add user");
        }      
      });
  };

  const assignRadiologist = async (radID) => {
    const userID = window.sessionStorage.getItem("ricomUserID");
    await axios
      .post(
        "/api/orders/assignRadiologist/",
        {
          radID: radID,
          orderID: record.record_id,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(resp.data)
        if (resp.data.msg == "Assigned Radiologist successfully") {
        } else {
          alert("Failed to assign radiologist");
        }
        // window.location.reload();
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
    console.log(matches);
    setSuggestions(matches);
  };

  const searchFor = async (text) => {
    // await fetchPatientsIds();
    await fetchData(role);
    if (role === "HEADOFDEPART") {
      regexFunc(text, radiologists);
      setValue3(text);
      // return;
    } else if (role === "ADMIN"){
      // setUserPhone(text)

    } else {
      regexFunc(text, patients_id);
      // console.log(text)
      setValue(text);
    }
  };

  const addHandler = async (e) => {
    e.preventDefault();
    if (role === "PHYSICIAN") {
      await storeOrder();
      // dispatch(triggerRefresh())

    } else if (role === "HEADOFDEPART") {
      // let rad = radiologists.find(obj => obj.lname === value3)
      let idx = radiologists.indexOf(value3);
      // console.log(idx)
      let radID = radIDs[idx];
      console.log(radIDs[idx]);
      await assignRadiologist(radID);

    } else if (role === "ADMIN"){
      await storeUser();
    }
  };
  // useEffect(() => {
  //   // getInput(value);
  //   // console.log(patients_id);
  //   console.log(suggestions);
  // }, [suggestions]);
  const getForm = () => {
    if (role !== "ADMIN") {
      return (
        <>
          <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full justify-center">
            <label htmlFor="name" className="mx-4">
              {role !== "HEADOFDEPART" ? "Patient Ref" : "Physician :"}
            </label>
            <input
              autoComplete="none"
              disabled={role !== "HEADOFDEPART" ? false : true}
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              id="name"
              type="text"
              value={value}
              onChange={
                role !== "HEADOFDEPART"
                  ? (e) => searchFor(e.currentTarget.value)
                  : null
              }
              onBlur={
                role !== "HEADOFDEPART"
                  ? () => {
                      setTimeout(() => {
                        setSuggestions([]);
                      }, 100);
                    }
                  : null
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
                autoComplete="none"
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
              {suggestions.length ? (
                <div className="z-40 mx-4 w-11/12 top-1/3 mt-12 absolute md:rounded border-gray-300 border">
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
              ) : null}
              <div className="flex justify-end w-full px-4">
                <Button onClick={(e) => e.preventDefault} label="ASSIGN" />
              </div>
            </div>
          )}
        </>
      );

    } else {

      return (
        <>
          <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center">
            <label htmlFor="name" className="mx-4">
              First Name
            </label>
            <input
              autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="text"
              value={userfName}
              onChange={(e) => setfName(e.currentTarget.value)}
              />

            <label htmlFor="name" className="mx-4">
              Last Name
            </label>
            <input
            autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="text"
              value={userlName}
              onChange={(e) => setlName(e.currentTarget.value)}
              />

            <label htmlFor="name" className="mx-4">
              Role
            </label>
            <input
            autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="text"
              value={userRole}
              onChange={
                  (e) => setUserRole(e.currentTarget.value)
                  // (e) => searchFor(e.currentTarget.value)
              }
              // onBlur={
              //   role !== "HEADOFDEPART"
              //     ? () => {
              //         setTimeout(() => {
              //           setSuggestions([]);
              //         }, 100);
              //       }
              //     : null
              // }
            />
            {/* {suggestions &&
              role !== "HEADOFDEPART" &&
              suggestions.map((sug, i) => (
                <div
                  className="z-40 mx-4 w-11/12 top-1/3 mt-12 absolute py-1 pl-4 bg-white md:rounded border-gray-300 border"
                  key={i}
                  onClick={() => (setUserRole(sug), setSuggestions([]))}
                >
                  {sug}
                </div>
              ))} */}

              {/* //phone number */}
            <label htmlFor="name" className="mx-4">
              Phone Number
            </label>
            <input
            autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="tel"
              value={userPhone}
              placeholder = {"0600000000"}
              pattern = {"[0-0]{1}[5-8]{1}[0-9]{8}"}
              onChange={
                  (e) => setUserPhone(e.currentTarget.value)
              }
            
            />
           

              {/* //email */}
            <label htmlFor="name" className="mx-4">
              Email
            </label>
            <input
            autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="email"
              value={userEmail}
              placeholder = {"name@domain.com"}
              onChange={
                (e) => setUserEmail(e.currentTarget.value)                 
              }
             
            />
           

            <label htmlFor="name" className="mx-4">
              Password
            </label>
            <input
            autoComplete="on"
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              required
              type="password"
              value={userPassw}
              onChange={(e) => setUserPassw(e.currentTarget.value)}
              />

              <div className="flex justify-end w-full px-4">
                <Button onClick={(e) => e.preventDefault} label="SUBMIT" />
              </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className={`fixed ${role !== 'ADMIN' ? 'top-1/4' : 'top-20' } flex justify-center w-full items-center font-bahnschrift`}>
      <div className="bg-navGray rounded-md border-gray-400 border p-4 xl:w-2/6 lg:w-3/6 sm:w-4/6 w-full m-4">
        <form
        //  onBlur={() => setShowForm(false)}
          className="w-full flex flex-col justify-center items-center"
          onSubmit={addHandler}
        >
          {getForm()}
        </form>
      </div>
    </div>
  );
};

export default AddForm;

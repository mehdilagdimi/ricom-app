import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import useSessionStorage from "./Custom hooks/useSessionStorage.js";
import useLocalStorage from "./Custom hooks/useLocalStorage.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from "./Components/Button";
import Search from "./Components/Search";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
// import Pagination from "./Components/Pagination";
import AddForm from "./Components/AddForm";
import Authenticate from "./Components/Authenticate";
// import axiosConfig from "./lib/axios.config";
import axios from "axios";
import Delay from "./Components/helpers/Delay";

function App() {
  // axiosConfig();
  const pages = new Map([
    ["physician", ["Examination Orders"]],
    ["radiologist", ["Examination Order"]],
    ["headDepart", ["Examination Order"]],
    ["admin", ["Users", "DICOM"]],
  ]);
  const userBtns = {
    Radiologist: ["Done", "Show Study"],
    Physician: ["Add Order"],
    Admin: ["Add User"],
  };

  const [loggedIn, setLogin] = useState(false);
  const [role, setRole] = useSessionStorage("role", "");
  const [navPages, setNavPages] = useState(pages);
  const [showForm, setShowForm] = useState(false);
  const [blurClass, setBlur] = useState("");

 
 
  useEffect(() => {
    if(loggedIn == false){
      const persistlogin = async () => {
        await axios
          // .get(`/api/authenticate/validate_jwt/${role}/`,  
          .get(`/api/authenticate/validate_jwt/${role}/`,  
          {
            withCredentials : true
          })
          .then((response) => {
            // console.log(response.data.json);     
            if (response.data.response == "Failed authentication") {
              console.log(response.data.response)
              setLogin(false);
              setRole("");
              // setUserID("");
            } else if (response.data.response == "Successfully authenticated") {
              console.log(response.data.response);
              setRole(response.data.role);
              setLogin(true);
              // if(window.sessionStorage.getItem("ricomUserID") === null || window.sessionStorage.getItem("ricomUserID") !== response.data.userID){
              //   setUserID(response.data.userID);
              // }
            }
          })
          .catch((e) => {
            if(e.message){
              console.log(e.message)
            }
             else if(e.request){
              console.log(e.request)
            }
             else if(e.response){
              console.log(e.response)
            }
          });
      };
      persistlogin();
    }
    // console.log(userID)
  }, [])
  
  const displayDashboardButtons = () => {

  }
  
  const showPopup = async () => {
    setShowForm(true);
    setBlur("blur-sm");
  };


  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className={`w-full flex flex-col justify-between items-center relative min-h-screen  ${(!loggedIn ? `bg-navGray` : 'bg-white')} font-bahnschrift`}
                  onClick={() => showForm && (setShowForm(false), setBlur(""))}
                >
                  <Delay delay={1}>
                  {!loggedIn ? (
                    <Authenticate toggleLogin={setLogin} setRole={setRole} />
                  ) : (
                    <>
                      <Navbar setLogin={setLogin} pages={navPages.get("physician")} />

                      <div
                        className={`container relative ${blurClass} mx-auto my-auto flex-col w-5/6 pb-2`}
                      >
                        <div className="flex flex-wrap justify-between mx-6 my-1">
                          <div className="flex justify-start">
                            {userBtns.Physician.map((label, idx) => (
                              <div key={idx} className="my-2 mx-1">
                                <Button
                                  toggle={false}
                                  onClick={showPopup}
                                  label={label}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="my-2">
                            <Search />
                          </div>
                        </div>
                        <Body onClickEdit={showPopup} role={role} />
                        {/* <Pagination /> */}
                      </div>
                    </>
                  )}
                  {loggedIn && <Footer /> }
                  </Delay>
                </div>
                {showForm && <AddForm role={role} />}
                {/* {showForm && <AddForm getInput={(value) => setValue(value)} role={role} />} */}
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

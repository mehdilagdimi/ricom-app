import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

import useSessionStorage from "./Custom hooks/useSessionStorage.js";
import useLocalStorage from "./Custom hooks/useLocalStorage.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateStudyID } from "./redux/serieSlice"

import store from "./redux/store.js"

import "./App.css";
import Button from "./Components/Button";
import Search from "./Components/Search";
import Body from "./Components/Body";
import DicomPath from "./Components/DicomPath"
import Serie from "./Components/Serie"
import Footer from "./Components/Footer";
// import Pagination from "./Components/Pagination";
import AddForm from "./Components/AddForm";
import Authenticate from "./Components/Authenticate";
// import axiosConfig from "./lib/axios.config";
import axios from "axios";
import Delay from "./Components/helpers/Delay";
// import { updateSerieID } from "./redux/serieSlice";

function App() {
  // axiosConfig();
  const pages = new Map([
    ["PHYSICIAN", ["Examination Orders"]],
    ["RADIOLOGIST", ["Examination Orders"]],
    ["HEADOFDEPART", ["Examination Orders"]],
    ["ADMIN", ["Users", "DICOM"]],
  ]);
  const userBtns = {
    Radiologist: ["All Studies"],
    Physician: ["Add Order"],
    Admin: ["Add User"],
    HeadOfDepart: ["Show Study"],
  };

  const [loggedIn, setLogin] = useState(false);
  const [role, setRole] = useSessionStorage("role", "");
  const [navPages, setNavPages] = useState(pages);
  const [showForm, setShowForm] = useState(false);
  const [blurClass, setBlur] = useState("");
  const [orderID, setOrderID] = useState(null)
  const [studyID, setStudyID] = useState(null)
  const dispatch = useDispatch();
  const record = useSelector((state)=> state.record)
  const serie = useSelector((state)=> state.serie)

 
  useEffect(() => {
    if(loggedIn == false){
      const persistlogin = async () => {
        await axios
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
  }, [showForm])
  


  // const displayDashboardButtons = () => {

  // }
  
  const showPopup = async () => {
    if (role !== "HEADOFDEAPRT"){
      setShowForm(true);
    } else {
      alert ("Navigating to study")
    }
    setBlur("blur-sm");
  };

  
  // const storeStudyID = async (orderID) => {
  //   console.log(orderID)
  //   // return;
  //   if(orderID){
  //     await axios
  //     .get(`/api/studies/setOrderIDStudy/${orderID}`, {withCredentials : true})
  //     .then((resp) => {
  //       if(resp.data.msg === "Linked Order with Study successfully"){
  //         console.log("Linked Order with Study successfully")
  //         // console.log(resp.data.serieID.id)
  //         // setStudyID(resp.data.serieID.id);
  //         setOrderID(orderID);
  //         // dispatch(updateStudyID(resp.data.serieID.id))

  //       } else {
  //         alert("Failed linking order with study")
  //       }
  //     })
  //   } else {
  //     return
  //   }
  // }

  useEffect(()=> {
    // console.log(studyID)

    // const getSerieID = async() => {
    //     await axios
    //     .get(`/api/studies/getStudyID/${orderID}`, {withCredentials : true})
    //     .then((resp) => {
    //       if(resp.data.msg === "Fetched Study ID successfully"){
    //         console.log("Fetched Study ID successfully")
    //         // console.log(resp.data.serieID.id)
    //         setStudyID(resp.data.serieID.id);
    //         dispatch(updateStudyID(resp.data.serieID.id))
  
    //       } else {
    //         alert("Failed Fetching Study ID")
    //       }
    //     })     
    //   }

    //   if(orderID){
    //     getSerieID();
    //     // console.log(studyID)
    //   } 
    // console.log(serie.study_id)
  
  }, [orderID])
  
  useEffect(()=>{
    console.log("app", studyID)
  }, [studyID])

  // function timeout(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // const linkOrderToStudy = async () =>{
  //   await timeout(100);
  //   // setOrderID(record.record_id)
  //   storeStudyID(record.record_id);
    
  // }
  // const getStudyID = async() =>{
  //   await timeout(100)
  //   return studyID
  // }


  const showDashboardBtns = () => {
    // let greyOut = false;

    const btn = (label, idx, actionMethod) => (
      <> 
        <div key={idx} className="my-2 mx-1">
          {
          // studyID ? 
          <Button  
            toggle={false}
            onClick={actionMethod}
            label={label}
            // getStudyID={getStudyID}
            // data={() => (setTimeout(function() {return (studyID)}, 1000))}                        
            data={studyID}
            // data={studyID}
            // data={record.record_id}
          />
          // :
          //   ""
          }
        </div>
      </>
      );
    
    if(role === "PHYSICIAN"){
      return userBtns.Physician.map((label, idx) => (btn(label, idx, showPopup)));
    } else if (role === "RADIOLOGIST"){
      // return userBtns.Radiologist.map((label, idx) => (btn(label, idx, linkOrderToStudy)))
    } else if (role === "HEADOFDEPART"){
      return userBtns.HeadOfDepart.map((label, idx) => (btn(label, idx, (e)=> e.preventdefault)));
    } else if (role === "ADMIN"){
      return userBtns.Admin.map((label, idx) => (btn(label, idx, showPopup)));
    }

  }

  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        {/* <Switch> */}
        <Routes>
          <Route
            exact path="/"
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
                      <Navbar setLogin={setLogin} pages={navPages.get(role)} />

                      <div
                        className={`container relative ${blurClass} mx-auto my-auto flex-col w-5/6 pb-2`}
                      >
                        <div className="flex flex-wrap justify-between mx-6 my-1">
                          <div className="flex justify-start">
                            {
                            showDashboardBtns()
                            }
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

          <Route path="/DICOM" element={
            <>
            <div
                  className={`w-full flex flex-col justify-between items-center relative min-h-screen  ${(!loggedIn ? `bg-navGray` : 'bg-white')} font-bahnschrift`}
                  onClick={() => showForm && (setShowForm(false), setBlur(""))}
                >
            {!loggedIn ? (
                    <Authenticate toggleLogin={setLogin} setRole={setRole} />
                  ) : (
                    <>
                <Navbar setLogin={setLogin} pages={navPages.get(role)} />    
                <DicomPath ></DicomPath>
              </>
              )}

            {loggedIn && <Footer /> }
            </div>
            </>
          }
          ></Route>

          <Route exact path="/study/:idstudy" element={
            <>
              <div
                    className={`w-full flex flex-col justify-between items-center relative min-h-screen  ${(!loggedIn ? `bg-navGray` : 'bg-white')} font-bahnschrift`}
                    onClick={() => showForm && (setShowForm(false), setBlur(""))}
                  >
              {!loggedIn ? (
                      <Authenticate toggleLogin={setLogin} setRole={setRole} />
                    ) : (
                      <>
                  <Navbar setLogin={setLogin} pages={navPages.get(role)} />    
                  <Serie role={role} />
                </>
                )}

              {loggedIn && <Footer /> }
              </div>
            </>
          }
          ></Route>

        </Routes>
        {/* </Switch> */}
      </Router>
    </>
  );
}

export default App;

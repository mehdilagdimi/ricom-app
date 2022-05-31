import axios from "axios";
// import axiosConfig from "../lib/axios.config";


import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../logo.svg";
import illustration from "../illustration.svg";
import logoRDA from "../logoRDA.svg";
import useSessionStorage from "../Custom hooks/useSessionStorage";

const Authenticate = ({ toggleLogin, setRole}) => {
  const navigate = useNavigate();
  const [userID, setUserID] = useSessionStorage("ricomUserID", "");
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  
  const login = async (e) => {
    e.preventDefault();
    console.log(email);
    if (!email) {
      alert("Please enter your login credentials");
    }

    await axios
      .post("/api/authenticate/", {
        email: email,
        passw: passw,
      },  
      {
        withCredentials : true
      })
      .then((response) => {
        console.log(response.data.response);     
        if (response.data.response == "Invalid credentials") {
          toggleLogin(false);
        } else if (response.data.response == "Access allowed") {
          toggleLogin(true);
          setRole(response.data.role);
          
          // console.log(response.data.userID)
          if(!window.sessionStorage["ricomUserID"]){
          // if(!window.sessionStorage["ricomUserID"]){
            setUserID(response.data.userID);
          }
        }
        // navigate('/')
      });
  };
  return (
    <div className="flex flex-col flex-wrap justify-center container items-between mx-auto w-full h-full sm:w-5/6 p-6 sm:p-4 sm:mb-5">
      <div className="flex flex-wrap justify-center sm:justify-between items-center">
        <div className="">
          <Link to="/">
            <img
              className="h-10 sm:h-16 w-28 sm:w-30 md:w-36 ml-5 sm:ml-16"
              src={logo}
              alt="parent company logo"
            />
          </Link>
        </div>
        <div>
          <Link to="/">
            <img
              className="h-18 sm:h-28  md:h-44 w-40 sm:w-80 sm:mr-4"
              src={logoRDA}
              alt="parent company logo"
            />
          </Link>
        </div>
      </div>
      <div className="bg-footerGray w-11/12 flex flex-wrap mx-auto justify-center items-center rounded-xl h-[580px] mt-10 sm:mt-4 sm:h-[550px]">
        <div className="flex-1 flex flex-col  sm:h-full justify-center items-center p-2">
          <p className="text-center text-white text-lg sm:text-2xl m-1">
            RICOM <br></br> is your effective daily workflow management platform
          </p>
          <img
            src={illustration}
            alt="illustration"
            className="h-24 sm:h-5/6 w-22 sm:w-5/6 m-1 "
          />
        </div>
        <div className="h-3/5 sm:h-4/5 w-5/6 sm:w-2/6">
          <form
            className="h-full flex flex-col items-center justify-center"
            onSubmit={login}
          >
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl pb-4 mb-8">
              Authenticate{" "}
            </h3>
            <div className="flex flex-col w-full items-center justify-center">
              <label htmlFor="id" className="text-white w-9/12">
                E-Mail
              </label>
              <input
                className="bg-footerGray text-white rounded-md border-2 border-appPink h-16 sm:h-12 w-full sm:w-4/5 p-4 m-4"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <label htmlFor="id" className="text-white w-9/12">
                Password
              </label>
              <input
                className="bg-footerGray text-white  rounded-md border-2 border-appPink h-16 sm:h-12 w-full sm:w-4/5 p-4 m-4"
                type="password"
                value={passw}
                onChange={(e) => setPassw(e.currentTarget.value)}
              />
              <div className="m-4">
                <button type="submit" className="py-2 px-6 bg-white text-black font-bold text-md rounded shadow-md">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

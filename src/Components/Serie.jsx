import React from 'react'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Navigate, useParams } from 'react-router-dom';

const Serie = ({ role }) => {
    // const navigate = useNavigate();
    const [ctPath, setCtPath] = useState("");
    const [studyID, setStudyID] = useState("");
    const { idstudy } = useParams();


    useEffect(() => {
        setStudyID(idstudy)
        console.log(idstudy)
    }, [])

    // const redirect = () => {
    //     navigate('/DICOM', {replace : true})
    // }


  return (
    role === "ADMIN" || role === "PATIENT" ? (<Navigate to="/" replace />, alert("no")): 
    <>
        <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center">
            <label htmlFor="name" className="mx-4">
              Upload Study
            </label>
            <input
              autoComplete="on"
              className="mx-4 my-8  rounded-md p-4 border-gray-300 border"
              required
              type="file"
              directory="" 
              webkitdirectory=""
              value={ctPath}
              onChange={(e) => setCtPath(e.currentTarget.value)}
              />

            
        </div>
    </>
  )
}

export default Serie
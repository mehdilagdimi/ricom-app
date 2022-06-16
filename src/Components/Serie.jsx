import axios from 'axios';
import React from 'react'

import Button from "./Button"

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { Navigate, useParams } from 'react-router-dom';

const Serie = ({ role }) => {
    // const navigate = useNavigate();
    const [ctPath, setCtPath] = useState("");
    const [studyID, setStudyID] = useState("");
    const { idstudy } = useParams();
    const [images, setImages] = useState("")
    const record = useSelector((state) => state.record)

    useEffect(() => {
        // setStudyID(idstudy)
        // console.log(idstudy)
        console.log(record.record_id)
    }, [])

    // const redirect = () => {
    //     navigate('/DICOM', {replace : true})
    // }

    const readFileAsync = file => new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = evt => resolve(evt.target.result)
        reader.readAsDataURL(file)
    })

    const onFilesChange = async (e) => {
        let files = e.target.files;
        const uploadList = []
    //    console.log(files)
        for (let i = 0; i < files.length; i++) {
            uploadList.push(await readFileAsync(files[i]))
          }

        Object.entries(files).forEach(file => {
            if(file){
                fileReader.readAsDataURL(file)
            }
        })
        // for(const file in files) {
        //     // fileReader.readAsDataURL(file[0]), console.log(file)
        //     console.log(file)
        // } 
    
        fileReader.onload = (event) => {
            setImages(event.target.result)
        }
    }

    const onSubmit = async () => {
        const study = { study : images }
        let serieID = idstudy;
        console.log(serieID)
        // return;
        await axios
        .post(`/api/studies/storeStudy/${serieID}`, 
        {
            studyData : study
        },
        {withCredentials : true})
        .then((resp) => {
            console.log((resp.data))
        })      
    }


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
            //   value={ctPath}
              onChange={onFilesChange}
              />
              <div className="flex flex-row justify-end">
                <Button
                label={"SUBMIT"}
                type="submit"
                onClick={onSubmit}
             />
              </div>

            
        </div>
    </>
  )
}

export default Serie
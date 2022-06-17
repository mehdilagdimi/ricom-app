import axios from "axios";
import React from "react";

import Button from "./Button";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { Navigate, useParams } from "react-router-dom";
import { data } from "autoprefixer";

const Serie = ({ role }) => {
  // const navigate = useNavigate();
  const [ctPath, setCtPath] = useState("");
  const [studyID, setStudyID] = useState("");
  const {idstudy } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [fetchedSlices, setFetchedSlices] = useState([])
  const record = useSelector((state) => state.record);
  const uploadList = [];

  useEffect(() => {
    const fetchSlices = async () => {
      await axios
      .get(
        `/api/studies/getStudy/${idstudy}`, 
        {withCredentials : true})
      .then((resp) => {
        console.log(resp.data.data[0])
        setFetchedSlices(resp.data.data)
        setLoading(false)
      })
    }

    fetchSlices();
  }, [idstudy, loading]);

  // const redirect = () => {
  //     navigate('/DICOM', {replace : true})
  // }

  const readFileAsync = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (evt) => resolve(evt.target.result);
      reader.readAsDataURL(file);
    });

  const onFilesChange = async (e) => {
    let files = e.target.files;
    //    console.log(files)
    for (let i = 0; i < files.length; i++) {
      uploadList.push(await readFileAsync(files[i]));
    }

    console.log(uploadList);
    setImages(uploadList);
    // fileReader.onload = (event) => {
    //     setImages(event.target.result)
    // }
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const onSubmit = async () => {
    await timeout(100);
    const study = { study: images };
    let serieID = idstudy;
    console.log(serieID);
    // console.log(images);
    // return;
    await axios
      .post(
        `/api/studies/storeStudy/${serieID}`,
        {
          studyData: study,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp.data);
        setLoading(false)
      });
  };

  return role === "ADMIN" || role === "PATIENT" ? (
    ((<Navigate to="/" replace />), alert("no"))
  ) : (
    <>
      <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center ">
        <label htmlFor="name" className="mx-4">
          Upload Study
        </label>
        <input
          autoComplete="on"
          className="mx-4 my-8  rounded-md p-4 border-gray-300 border"
          required
          type="file"
          accept=".png, .jpeg"
          name="slices"
          directory=""
          webkitdirectory=""
          //   value={ctPath}
          onChange={onFilesChange}
        />
        <div className="flex flex-row justify-end">
          <Button label={"SUBMIT"} type="submit" onClick={onSubmit} />
        </div>

        {!loading? <div className="carousel rounded-box mt-9">
            {fetchedSlices.map((image) => (
            <>
              <div className="carousel-item">
                <h3>{image.name}</h3>
                <img
                  src={image.name}
                  // src={"https://api.lorem.space/image/burger?w=400&h=300&hash=8B7BCDC2"}
                  alt="Burger"
                />

              </div>           
            </>
            ))}        
        </div> 
         :
        <em>
          Loading Images
        </em>
        }

      </div>
    </>
  );
};

export default Serie;

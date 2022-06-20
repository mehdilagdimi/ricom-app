import axios from "axios";
import React from "react";

import closeIcon from "../close_icon.png";
import Button from "./Button";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Navigate, useParams } from "react-router-dom";
import { data } from "autoprefixer";
import { updateSelectedSlice } from "../redux/serieSlice";

const Serie = ({ role }) => {
  // const navigate = useNavigate();
  const [ctPath, setCtPath] = useState("");
  const [studyID, setStudyID] = useState("");
  const { idstudy } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [fetchedSlices, setFetchedSlices] = useState([]);
  const record = useSelector((state) => state.record);
  // const dispatch = useDispatch()
  const uploadList = [];

  useEffect(() => {
    const fetchSlices = async () => {
      await axios
        .get(`/api/studies/getStudy/${idstudy}`, { withCredentials: true })
        .then((resp) => {
          // console.log(resp.data.data[0])
          console.log(resp.data.msg);
          if (resp.data.msg === "Fetched Study successfully") {
            setFetchedSlices(resp.data.data);
          } else {
            setFetchedSlices([]);
          }
          setLoading(false);
        });
    };

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
        setLoading(false);
      });
  };

  useEffect(() => {}, [selected]);

  const highlightImg = (img) => {
    // dispatch(updateSelectedSlice(true))
    setSelected(true);
    setSelectedImage(img);
  };
  const closeImg = () => {
    setSelected(false);
    setSelectedImage("");
    console.log(selected);
  };

  return role === "ADMIN" || role === "PATIENT" ? (
    ((<Navigate to="/" replace />), alert("no"))
  ) : (
    <>
      <div
        className={`relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center z-0 ${selected &&
          "blur-lg"}`}
      >
        {(!loading && fetchedSlices.length !== 0) || role === "HEADOFDEPART" ? (
          <></>
        ) : (
          <>
            <label htmlFor="name" className="mx-4 mt-4 mb-0">
              Upload Study :
            </label>
            <input
              autoComplete="on"
              className="mx-4 my-4 rounded-md p-4 border-gray-300 border"
              required
              type="file"
              accept=".png, .jpeg"
              name="slices"
              directory=""
              webkitdirectory=""
              //   value={ctPath}
              onChange={onFilesChange}
            />
            <div className="flex flex-row justify-end m-4">
              <Button label={"SUBMIT"} type="submit" onClick={onSubmit} />
            </div>
          </>
        )}

        <h1 className="mx-4">
          <strong>PATIENT STUDY :</strong>
        </h1>
        {!loading ? (
          <div className="m-4 carousel rounded-box mt-9">
            {fetchedSlices.length != 0 ? (
              fetchedSlices.map((image) => (
                <>
                  <div className="carousel-item mx-2">
                    <img
                      className="h-[500px] w-[500px]"
                      key={image.id}
                      src={"data:image/png;base64," + image.img}
                      alt={"slice" + image.id}
                      onClick={() => highlightImg(image.img)}
                    />
                  </div>
                </>
              ))
            ) : (
              <em> No Image was found</em>
            )}
          </div>
        ) : (
          <em>Loading Images</em>
        )}
      </div>
      {selected && (
        <>
          <div
            className={`absolute h-screen w-screen max-h-screen max-w-screen z-50`}
            onClick={closeImg}
          ></div>

          <div className="absolute h-full w-full mx-auto my-auto p-11 flex flex-row justify-center items-center max-h-screen max-w-screen">
            <div className="fixed  blur-none">
              {/* <img
                className="mx-auto my-auto h-[40px] w-[40px] cursor-pointer blur-none z-0"
                src={closeIcon}
                onClick={closeImg}
              /> */}
              <img
                className="border-solid border-2 border-black relative h-[700px] blur-none object-contain"
                src={"data:image/png;base64," + selectedImage}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Serie;

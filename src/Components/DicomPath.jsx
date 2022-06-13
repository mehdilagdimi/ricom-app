import React from 'react'
import { useState } from 'react';

const DicomPath = () => {
    const [ctPath, setCtPath] = useState("");
    const [crPath, setCrPath] = useState("");
    const [mriPath, setMriPath] = useState("");

  return (
    <>
        <div className="relative flex flex-col xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center">
            <label htmlFor="name" className="mx-4">
              CR
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

            <label htmlFor="name" className="mx-4">
             CT
            </label>
            <input
            autoComplete="on"
              className="mx-4 my-8  rounded-md p-4 border-gray-300 border"
              required
              type="file"
              directory="" 
              webkitdirectory=""
              value={mriPath}
              onChange={(e) => setMriPath(e.currentTarget.value)}
              />

            <label htmlFor="name" className="mx-4">
              MRI
            </label>
            <input
            autoComplete="on"
              className="mx-4 my-8  rounded-md p-4 border-gray-300 border"
              required
              type="file"
              directory="" 
              webkitdirectory=""
              value={crPath}
              onChange={
                  (e) => setCrPath(e.currentTarget.value)
              }
            />
        </div>
    </>
  )
}

export default DicomPath
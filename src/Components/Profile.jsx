import doctorAvatar from "../medical-team.png"
import { useState } from "react";


const Profile = () => {
    const [userName, setUserName] = useState("Name")
    const [identity, setIdentity] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")

  return (
    <div
      className={`relative flex flex-col items-center xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center z-0`}
    >

      <div className="mx-4 my-12 px-2 w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row h-[600px] bg-white border border-gray-300 rounded-xl items-center justify-start cursor-auto">
            <div className="absolute left-0 px-8 pt-2 pb-10 top-0 w-full flex items-center justify-center">
              <img
                alt="User Avatar"
                className="relative left-0 top-0  w-[100px]  h-[100px] object-contain object-center transition duration-50"
                loading="lazy"
                src={doctorAvatar}
              />
            </div>
          <div className="relative w-full h-full flex flex-shrink-0 items-center justify-center">
          <div className="relative p-4 flex flex-col w-full h-full">
            {/* <p className="text-lg line-clamp-1 text-center">PROFILE</p> */}

            <p className="text-2xl text-gray-500 m-4 line-clamp-2">
              {userName}
            </p>
            <label htmlFor="name" className="mx-4">
              IDENTITY
            </label>
            <input
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              disabled
              type="text"
              value={identity}
            //   placeholder = {""}
            //   pattern = {}
              onChange={
                  (e) => setIdentity(e.currentTarget.value)
              }
            
            />
            
            <label htmlFor="name" className="mx-4">
              PHONE NUMBER
            </label>
            <input
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              disabled
              type="tel"
              value={identity}
            //   placeholder = {""}
            //   pattern = {}
              onChange={
                  (e) => setIdentity(e.currentTarget.value)
              }
            
            />

            <label htmlFor="name" className="mx-4">
              EMAIL
            </label>
            <input
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              disabled
              type="email"
              value={email}
              onChange={
                  (e) => setEmail(e.currentTarget.value)
              }
            
            />

            <label htmlFor="name" className="mx-4">
              CREATION DATE 
            </label>
            <input
              className="mx-4 m-4  rounded-md p-4 border-gray-300 border"
              disabled
              type="text"
              value={date}
              onChange={
                  (e) => setDate(e.currentTarget.value)
              }
            
            />

            
            <span className="flex items-center justify-start text-gray-500">
            <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              socialmedia.com
            </span>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;

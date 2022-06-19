import doctorAvatar from "../medical-team.png"


const Profile = () => {
  return (
    <div
      className={`relative flex flex-col items-center xl:w-5/6 lg:w-4/6 sm:w-5/6 w-full h-2/6 justify-center z-0`}
    >
      {/* <div class="max-w-5xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            class="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div> */}
      <div className="mx-auto px-2 w-full  max-w-5xl">
        <div className="flex h-[600px] bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start cursor-auto">
          <div className="relative w-1/2 h-full flex-shrink-0">
            <div className="absolute left-0 px-8 pt-8 pb-10 top-0 w-full h-full flex items-center justify-center">
              <img
                alt="User Avatar"
                className="relative left-0 top-0 w-full h-full object-contain object-center transition duration-50"
                loading="lazy"
                src={doctorAvatar}
              />
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm line-clamp-1">New tweet title</p>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              Description of what you are sharing
            </p>

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
              stackdiary.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

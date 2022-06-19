import { Link } from "react-router-dom";
import axios from "axios";
import useSessionStorage from "../Custom hooks/useSessionStorage.js";
import logo from "../logo.svg";
import logoutIcon from "../logout.png";

export const Navbar = ({ pages, setLogin }) => {
  // const [logoutState, setLogoutState]  = useSessionStorage(true, true);
  const logout = async () => {
    await axios
      .get(`/api/authenticate/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        setLogin(false);
        if (window.sessionStorage.getItem("ricomUserId")) {
          window.sessionStorage.setItem("ricomUserId", "");
        }
        window.location.reload();
        // console.log(response.data);
      });
  };

  const getPath = (page) => {
    // console.log(page)
    if(page === "Users" || page === "Examination Orders"){
      // console.log(page)
      return "/";
    } else if (page === "DICOM"){
      return "/DICOM";
    } else if (page === "Profile"){
      return "/profile/:iduser";
    }
  };

  return (
    <>
      <div className="w-full bg-navGray">
        <div className="container mx-auto flex flex-wrap justify-center sm:justify-between w-5/6 p-4">
          <div className="">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex justify-center items-center mx-2">
            <div className="mx-2 inline-flex ">
              {pages.map((page, index) => (
                // console.log(page),
                <Link to={getPath(page)} key={index}>
                  <h3 className="text-black mx-6" key={index}>
                    {page}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="mx-2">
              <Link to="/">
                <img onClick={logout} src={logoutIcon} alt="logout" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

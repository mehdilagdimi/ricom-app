import { Link } from "react-router-dom";

import logo from "../logo.svg";
import logoRDA from '../logoRDA.svg'
import logout from "../logout.png";


export const Navbar = ({ pages, loggedIn }) => {
  return (
    <>
      <div className="w-full bg-navGray">
        <div className="container mx-auto flex flex-wrap justify-between w-5/6 p-4">
          <div className="">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex justify-center items-center mx-2">
            {loggedIn && <div className="mx-2">
              {pages.map(
                (page, index) => (
                  console.log(page),
                  (
                    <h3 className="text-black" key={index}>
                      {page}
                    </h3>
                  )
                )
              )}
            </div> }

            <div className="mx-2">
              <Link to="/logout">
                {loggedIn ? (
                  <img src={logout} alt="logout" />
                ) : (
                  <img src={logoRDA} className="h-16 w-46" alt="parent company logo" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

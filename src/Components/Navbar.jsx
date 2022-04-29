import { Link } from "react-router-dom";

import logo from "../logo.svg";
import logout from "../logout.png";

export const Navbar = ({ pages }) => {
  return (
    <>
      <div className="w-full bg-navGray">
        <div className="container mx-auto flex justify-between w-5/6 p-4">
          <div className="">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {/* <div className="flex justify-evenly mx-2">
            {pages.forEach((value, key) => (
              <h3 key={key}>{value}</h3>
            ))}
            <div>
              <Link to="/logout">
                <img src={logout} alt="logout" />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;

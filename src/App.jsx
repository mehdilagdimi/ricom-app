import Navbar from "./Components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from "./Components/Button";
import Search from "./Components/Search";

function App() {
  const pages = new Map([
    ["physician", "Examination Orders"],
    ["radiologist", "Examination Order"],
    ["headDepart", "Examination Order"],
    ["admin", ["users", "DICOM"]],
  ]);

  const [loggedIn, setLoggin] = useState(false);

  const [navPages, setNavPages] = useState([]);

  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="w-full bg-white">
                  <Navbar pages={navPages} />
                  <div className="container  mx-auto flex-col w-5/6">
                    <div className="flex justify-between m-6">
                      <div>
                        <Button label="Add User" />
                      </div>
                      <div>
                        <Search />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

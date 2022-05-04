import Navbar from "./Components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from "./Components/Button";
import Search from "./Components/Search";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Pagination from "./Components/Pagination";
import AddForm from "./Components/AddForm";
import Authenticate from "./Components/Authenticate";

function App() {
  const pages = new Map([
    ["physician", ["Examination Orders"]],
    ["radiologist", ["Examination Order"]],
    ["headDepart", ["Examination Order"]],
    ["admin", ["users", "DICOM"]],
  ]);
  const userBtns = {
    Radiologist: ["Done", "Show Study"],
    Physician: ["Add User"],
  };

  const [loggedIn, setLoggin] = useState(false);

  const [navPages, setNavPages] = useState(pages);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState();
  const [blurClass, setBlur] = useState("");
  const showPopup = () => {
    setShowForm(true);
    setBlur("blur-sm");
  };
  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className="w-full h-full min-h-screen bg-white font-bahnschrift"
                  onClick={() => showForm && (setShowForm(false), setBlur(""))}
                >
                  <Navbar loggedIn={loggedIn} pages={navPages.get("physician")} />
                  {!loggedIn ? (
                    <Authenticate />
                  ) : (
                    <>
                      <div
                        className={`container relative ${blurClass} mx-auto flex-col w-5/6 pb-2`}
                      >
                        <div className="flex flex-wrap justify-between mx-6 my-1">
                          <div className="flex justify-start">
                            {userBtns.Physician.map((label) => (
                              <div className="my-2 mx-1">
                                <Button
                                  toggle={false}
                                  onClick={showPopup}
                                  label={label}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="my-2">
                            <Search />
                          </div>
                        </div>
                        <Body onClickEdit={showPopup} user={"Physician"} />
                        <Pagination />
                      </div>
                    </>
                  )}
                  <Footer />
                  {/* <Pagination /> */}
                </div>
                {showForm && <AddForm getInput={(value) => setValue(value)} />}
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

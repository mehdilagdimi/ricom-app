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

function App() {
  const pages = new Map([
    ["physician", ["Examination Orders"]],
    ["radiologist", ["Examination Order"]],
    ["headDepart", ["Examination Order"]],
    ["admin", ["users", "DICOM"]],
  ]);

  const [loggedIn, setLoggin] = useState(false);

  const [navPages, setNavPages] = useState(pages);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState();
  const [blurClass, setBlur] = useState("");
  const showPopup = () => {
    setShowForm(true);
    setBlur("blur-sm")
  }
  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="w-full min-h-screen bg-white font-bahnschrift">
                  <Navbar pages={navPages.get("physician")} />
                  <div className={`container relative ${blurClass} mx-auto flex-col w-5/6 pb-2`}>
                    <div className="flex flex-wrap justify-between m-6">
                      <div className="my-2">
                        <Button onClick={showPopup} label="Add User" />
                      </div>
                      <div className="my-2">
                        <Search />
                      </div>
                    </div>
                    <Body />
                    <Pagination />
                  </div>
                  <Footer />
                  {/* <Pagination /> */}
                  {showForm && <AddForm getInput={(value) => setValue(value)}/>}
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

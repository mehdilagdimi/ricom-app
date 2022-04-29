import Navbar from "./Components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Button from "./Components/Button";
import Search from "./Components/Search";
import Body from "./Components/Body";
import Footer from "./Components/Footer";

function App() {
  const pages = new Map([
    ["physician", ["Examination Orders"]],
    ["radiologist", ["Examination Order"]],
    ["headDepart", ["Examination Order"]],
    ["admin", ["users", "DICOM"]],
  ]);

  const [loggedIn, setLoggin] = useState(false);

  const [navPages, setNavPages] = useState(pages);

  return (
    <>
      {/* <Link to="/"><button></button></Link> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="w-full min-h-screen bg-white">
                  <Navbar pages={navPages.get("physician")} />
                  <div className="container relative mx-auto flex-col w-5/6 pb-2">
                    <div className="flex justify-between m-6">
                      <div>
                        <Button label="Add User" />
                      </div>
                      <div>
                        <Search />
                      </div>
                    </div>
                    <Body />
                  </div>
                  <Footer />
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

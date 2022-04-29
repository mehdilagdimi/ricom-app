import Navbar from "./Components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

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
          <Route path="/" element={<Navbar pages={navPages} />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

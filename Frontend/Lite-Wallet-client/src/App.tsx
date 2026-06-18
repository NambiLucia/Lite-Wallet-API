import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import './App.css'


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>



      </Router>
    </div>
  )
}

export default App
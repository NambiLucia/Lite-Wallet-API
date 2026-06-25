import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";

import './App.css'


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/deposit" element={<Deposit/>} />

        </Routes>



      </Router>
    </div>
  )
}

export default App
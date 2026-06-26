import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";

import './App.css'


function App() {
  return (
    <div>
      <Router>
        
        <Toaster position="top-right" />

        <Routes>

          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/transfer" element={<Transfer/>} />


        </Routes>



      </Router>
    </div>
  )
}

export default App
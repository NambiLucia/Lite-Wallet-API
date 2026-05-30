import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

import './App.css'


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<SignUp/>} />
          
        </Routes>



      </Router>
    </div>
  )
}

export default App
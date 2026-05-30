import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/SignUp";

import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Dashboard/>} />
          
        </Routes>



      </Router>
    </div>
  )
}

export default App
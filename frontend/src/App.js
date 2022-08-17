import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Router>
        <Routes>
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

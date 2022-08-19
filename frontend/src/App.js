import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="admin">
              <Route index element={<AdminLogin />} />
              <Route path="adminHome" element={<AdminHome />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

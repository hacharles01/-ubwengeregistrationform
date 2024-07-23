import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer } from "react-toastify";
import Appheader from "./Appheader";
import Customer from "./Customer";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {/* <Appheader /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    if (id === "" || password === "") {
      toast.warning("Please Enter Both Id And Password");
      return;
    }

    try {
      const { data: users } = await axios.get("http://localhost:8000/user");
      const user = users.find((user) => user.id === id);

      if (!user) {
        toast.error("ID not found");
      } else if (user.password !== password) {
        toast.error("Invalid password");
      } else {
        // Simulate JWT creation
        const token = btoa(
          JSON.stringify({ id: user.id, exp: Date.now() + 3600000 })
        ); // Simple base64 encoded JWT
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("userId", id); // Fix this line
        sessionStorage.setItem("userrole", user.role); // Fix this line
        toast.success("Welcome To The Home Page!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={ProceedLogin}>
        <div className="card">
          <div className="card-header">
            <h1>Login Form</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name:<span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Password:<span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            |
            <Link className="btn btn-success" to="/register">
              New User
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "Please Enter The Value in ";

    if (id === null || id === "") {
      isProceed = false;
      errorMessage += "Username ";
    }
    if (password === null || password === "") {
      isProceed = false;
      errorMessage += "Password ";
    }
    if (fullname === null || fullname === "") {
      isProceed = false;
      errorMessage += "Full Name ";
    }
    if (email === null || email === "") {
      isProceed = false;
      errorMessage += "Email ";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isProceed = false;
      errorMessage += "Email (Invalid format) ";
    }
    if (password &&
        password.length > 7 &&
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) &&
        /\d/.test(password) &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password)) {
    } else if (password) {
      isProceed = false;
      toast.warning('Please enter a strong password');
    }
    if (!isProceed) {
      toast.warning(errorMessage.trim());
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id,
      password,
      fullname,
      email,
      phone,
      country,
      address,
      gender,
    };

    if (isValidate()) {
      axios
        .post("http://localhost:8000/user", newData)
        .then((response) => {
          toast.success("Data Added Successfully!!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("There was an error posting the data.");
        });
    }
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <h1>User Registration Form</h1>
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
                <div className="form-group">
                  <label>
                    Full Name:<span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Email:<span className="errmsg">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Phone:<span className="errmsg">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Country:<span className="errmsg">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="rwanda">Rwanda</option>
                    <option value="singapore">Singapore</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="app-check"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="app-check"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            |
            <button type="button" className="btn btn-danger">
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;

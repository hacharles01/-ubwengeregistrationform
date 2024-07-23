import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Appheader from "./Appheader"; // Adjust the path as needed

const Home = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [displayId, setDisplayId] = useState("");

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");

    if (!jwtToken) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8000/user?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (userResponse.data.length > 0) {
          setDisplayId(userResponse.data[0].id);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    const fetchUserList = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserList(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserData();
    fetchUserList();
  }, [navigate]);

  return (
    <div>
      <Appheader />
      <h1 className="text-center">Welcome To The Home Page</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Full Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Country</td>
            <td>Address</td>
            <td>Role</td>
            <td>Gender</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.country}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/user/${user.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

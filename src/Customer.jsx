import axios from "axios";
import React, { useEffect, useState } from "react";
import Appheader from "./Appheader";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [custlist, setCustList] = useState([]);
  const [haveadd, setHaveAdd] = useState(false);
  const [haveview, setHaveView] = useState(false);
  const [haveedit, setHaveEdit] = useState(false);
  const [havedelete, setHaveDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserAccess();
    loadCustomer();

    // if (haveview) {

    // } else {
    //   navigate("/");
    //   toast.warning("You are not authorized to access");
    // }
  }, []); // Dependency array to call the effect only once on mount

  const loadCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customer");
      setCustList(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  const GetUserAccess = () => {
    const userrole = sessionStorage.getItem("userrole")
      ? sessionStorage.getItem("userrole").toString()
      : "";
    axios
      .get(`http://localhost:8000/roleaccess?role=${userrole}&menu=customer`)
      .then((res) => {
        if (res.status !== 200) {
          navigate("/");
          toast.warning('You are not authorized to access');

          throw new Error("Network response was not ok");
        }
        return res.data; // Use res.data for Axios
      })
      .then((data) => {
        if (data.length > 0) {
          setHaveView(true);
          let userobject = data[0];
          setHaveEdit(userobject.haveedit);
          setHaveAdd(userobject.haveadd);
          setHaveDelete(userobject.havedelete);
          // Do something with userobject
          console.log(userobject); // Example action
        }else{
       navigate('/');
       toast.warning('You are not authorized to access');     
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleAdd = () => {
    if (haveadd) {
      toast.success("Data Added");
    } else {
      toast.warning("You are not having access for add");
    }
  };

  const handleEdit = () => {
    if (haveedit) {
      toast.success("Data Updated");
    } else {
      toast.warning("You are not having access for edit");
    }
  };

  const handleDelete = () => {
    if (havedelete) {
      toast.success("Data Removed");
    } else {
      toast.warning("You are not having access for delete");
    }
  };

  return (
    <div>
      <Appheader />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Customer Listing</h1>
          </div>
          <div className="card-body">
            <button onClick={handleAdd} className="btn btn-success">
              Add (+)
            </button>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {custlist.length > 0 ? (
                  custlist.map((item) => (
                    <tr key={item.code}>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          onClick={handleEdit}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        |
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Customer;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [credentials, setCredentials] = useState({
    Name: "",
    Email: "",
    Location: "",
    Password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Invalid Credentials");
      } else {
        alert("User Created Successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "100px", textAlign: "left" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputName">Name</label>
          <input
            aria-describedby="emailHelp"
            className="form-control"
            id="exampleInputName"
            placeholder="Enter Name"
            type="text"
            onChange={onChange}
            name="Name"
            value={credentials.Name}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            aria-describedby="emailHelp"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            type="email"
            onChange={onChange}
            name="Email"
            value={credentials.Email}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            type="password"
            onChange={onChange}
            name="Password"
            value={credentials.Password}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputLocation1">Location</label>
          <input
            className="form-control"
            id="exampleInputLocation1"
            placeholder="Location"
            type="text"
            onChange={onChange}
            name="Location"
            value={credentials.Location}
          />
        </div>
        <button className="btn btn-primary mb-2 my-2" type="submit">
          Submit
        </button>
        <Link
          to="/login"
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default SignUp;

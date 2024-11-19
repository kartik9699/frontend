import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate=useNavigate()
    const [Login, setLogin] = useState({
        Email: '',
        Password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-pearl-tau.vercel.app/api/Loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Login)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Invalid Credentials");
            } else {
              localStorage.setItem('userEmail', Login.Email);
              localStorage.setItem('authToken', json.authToken);
              //console.log(localStorage.getItem("authToken"))
                navigate('/')
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

   
  return (
    <>
    <div className="container" style={{
        marginTop: "100px",
        textAlign:"left",
       
    }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            aria-describedby="emailHelp"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            type="email"
            onChange={(e)=>setLogin({...Login,Email:e.target.value})}
            name="Email"
            value={Login.Email}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            type="password"
            onChange={(e)=>setLogin({...Login,Password:e.target.value})}
            name="Password"
            value={Login.Password}
          />
        </div>
        <button className="btn btn-primary" type="submit mb-3">
          Submit
        </button>
        <Link to="/signup" className='btn btn-danger' style={{ marginLeft: '10px' }}>signup</Link>
      </form>
      </div>
    </>
  );
}

export default Login;

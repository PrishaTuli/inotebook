import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
const Login = (props) => {
    let navigate=useNavigate()
    const[credential,setcred]=useState({email:"",password:""});
    const handlesubmit=async (e)=>{
        e.preventDefault();//prevents from navigating uselessly
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            props.showalert("Logged in successfully","success");
            navigate("/");
              
            // props.showalert("Logged in successfully","success");
          }
          else{
            props.showalert("invalid credentials","danger");
          }
    }
    const onchange=(e)=>{

        setcred({...credential,[e.target.name]:e.target.value})
      }
  return (
    <div className="mt-3">
      <h2>Login to continue to inotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credential.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;

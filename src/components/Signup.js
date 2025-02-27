import React ,{useState}from "react";
import {useNavigate} from "react-router-dom";
const Signup = (props) => {
    let navigate=useNavigate()
    const[credential,setcred]=useState({email:"",name:"",password:"",cpassword:""});
    const handlesubmit=async (e)=>{
        e.preventDefault();
       const {name,email,password}=credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showalert("Account created successfully","success");
          }
          else{
            props.showalert("invalid credentials","danger");
          }
    }
    const onchange=(e)=>{

        setcred({...credential,[e.target.name]:e.target.value})
      }
  return (
    <div className="container mt-3">
      <h2>Create an account to continue</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onchange}
             name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
             name="password"
             required
             minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onchange}
             name="cpassword"
             required
             minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Logo from "../assets/logo.png";
import Add from "../assets/download.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ 
        name: "", 
        email: "", 
        password: "" ,
        confirmPassword: "",
        pic:"",
    });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setData({ ...data, pic: e.target.files[0] });
  };

  const handleValidation = () =>{
    if(data.password !== data.confirmPassword){
      toast.error("Password and confirm password must be same");
      return false;
    } else if (data.name.length<2){
      toast.error("Display name should be minimum 2 characters");
      return false;
    } else if(data.password.length < 8){
      toast.error("Password should be minimum 8 characters");
      return false;
    } 
    return true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      
      try {
        setLoading(true);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        const formdata = new FormData();
        formdata.append("file", data.pic);
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        const response = await axios.post("http://localhost:5000/api/user/register", formdata, config);
        if (response.data.msg === "") {
          toast.success("Registration successful");
          const user = response.data.user;
          const id = user._id;
          const pic = user.pic;
          const name = user.name;
          const email= user.email;
          localStorage.setItem("userInfo", JSON.stringify({id, email, pic, name}));
          setLoading(false);
          navigate('/chat');
        }
        else{
          toast.error(response.data.msg);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="formContainer">
          <div className="formWrapper">
            <div className="brand">
              <img src={Logo} alt="Logo" />
              <h1>ChatOut</h1>
            </div>
            <span className="title">Register</span>
            <form encType="multipart/form-data" >
              <input name="name" onChange={changeHandler} type="text" placeholder="Display Name" />
              <input name="email" onChange={changeHandler} type="email" placeholder="Email" />
              <input name="password" onChange={changeHandler} type="password" placeholder="Password" />
              <input name="confirmPassword" onChange={changeHandler} type="password" placeholder="Confirm Password" />
              <input
                onChange={handleImage}
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept="image/*"
              />
              <label htmlFor="file">
                <img alt="" src={Add}></img>
                <span>Add an Avatar</span>
              </label>
              <button onClick={submitHandler} >Sign Up</button>
            </form>
            <p>
              You do have an account? <a href="/login">Login</a>{" "}
            </p>
          </div>
        </div>
      </FormContainer>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const FormContainer = styled.div`
  .formContainer {
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .formWrapper {
      background-color: white;
      padding: 45px 60px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 4rem;
        }
        h1 {
          color: #5d5b8d;
        }
      }
      .title {
        color: #5d5b8d;
        font-size: 15px;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        input {
          padding: 15px;
          border: none;
          width: 300px;
          border-bottom: 1px solid #a7bcff;
          &::placeholder {
            color: rgb(175, 175, 175);
          }
        }
        button {
          background-color: #7b96ec;
          color: white;
          padding: 10px;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }
        label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #8da4f1;
          font-size: 15px;
          cursor: pointer;
          img {
            height: 2rem;
          }
        }
      }
      p {
        color: #5d5b8d;
        font-size: 12px;
        margin-top: 10px;
        a {
          text-decoration: none;
        }
      }
    }
  }
`;

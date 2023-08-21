import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
        toast.error("All the fields are required");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password },
          config
        );
        if (response.data.msg === "") {
          toast.success("Login successful");
          setLoading(false);
          const user = response.data.user1;
          const id = user._id;
          const pic = user.pic;
          const name = user.name;
          localStorage.setItem("userInfo", JSON.stringify({email, id, pic, name}));
          navigate("/chat");
        } else {
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
            <span className="title">Login</span>
            <form encType="multipart/form-data">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
              <button onClick={submitHandler} type="submit">
                Log In
              </button>
            </form>
            <p>
              Don't have an account? <a href="/register">Register</a>{" "}
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
          margin-top: 15px;
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

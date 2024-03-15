import React, { useState } from "react";
import "./StudentProfile.css";
import background1 from "../images/background1.jpg";

const Student = () => {
  const [schoolCode, setSchoolCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          school_code: schoolCode,
          stud_username: username,
          stud_password: password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Redirect to profile page upon successful login
      window.location.href = '/profile_login.html';
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img className="my-logo" src={background1} alt="" />
      </div>
      
      {/* Rest of the JSX code */}
      <div className="content-info">
        <div className="left-div">
          <button className="student-button btn" type="submit">
            Student
          </button>
        </div>
        <div className="mid-div">
          <button
            className="parent-button btn"
            type="submit"
            onClick={() => setShowParent(!showParent)}
          >
            Parent
          </button>
        </div>
        <div className="right-div">
          <button className="teacher-button btn" type="submit"
          // onClick={() => setShowTeacher(!showTeacher)}
          >
            Teacher
          </button>
        </div>
      </div>

      {showParent && <Parent />}
        {/* {showTeacher && <Teacher /> } */}


      
      <form onSubmit={handleLogin}>
        <div className="login-form">
          <div className="input">
            <label htmlFor="schoolcode">School code / Domain</label>
            <input
              type="text"
              name="schoolcode"
              id="schoolcode"
              placeholder="School code / Domain"
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="email/mobile">Username(Mobile/Email)</label>
            <input
              type="text"
              name="email/mobile"
              id="email/mobile"
              placeholder="Username(Mobile/Email)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password / OTP</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password / OTP"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error-message">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <div className="forget-password">
            <a href="#">No Password ? Try OTP</a>
            <i className="ri-information-2-line"></i>
            <a href="/forget_pass">Forget Password ?</a>
          </div>
        </div>
        {/* <button className="signIn-button" type="submit">
          SIGN IN
        </button> */}
      </form>
      <div className="user-login">
        <button className="signIn-button" type="submit">
          SIGN IN
        </button>
        <a className="goggle-link" href="#">
          Login with Google
          <i class="ri-google-fill"></i>
        </a>
      </div>

      <div className="query">
        <a href="#">HOW TO LOGIN?</a>
      </div>
     
      <div className="footer">
        <h1>Powered by</h1>
        <h2>DreamsGuider.com</h2>
        <h3>Software | Education | Advertising</h3>
      </div>
      {/* Rest of the JSX code */}
    </div>
  );
};

export default Student;

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import loginImg from "../../image/log.svg";
import registerImg from "../../image/register.svg";
import loader from "../../image/Tag-For-Transparent-Spinner-Icon-Pehliseedhi-Suitable-.gif";
import "./LoginAndRegister.css";
import { useNavigate } from "react-router-dom";

const LoginAndRegister = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  //check token
  useEffect(() => {
    fetch("https://login-system-ecommerce.herokuapp.com/verifyAccess", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          navigate("/");
          alert("You are already logged in");
        }
      });
  });

  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const email = useRef();
  const password = useRef();

  //forget password refs
  const userNameForget = useRef();
  const otpForget = useRef();
  const newPassword = useRef();

  const signUpTakeInformation = (e) => {
    e.preventDefault();
    let valid = /\S+@\S+\.\S+/;
    let emailStatus = valid.test(email.current.value);

    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordStatus = pass.test(password.current.value);
    if (
      !firstName.current.value ||
      !lastName.current.value ||
      !userName.current.value ||
      !email.current.value ||
      !password.current.value
    ) {
      alert("Field cannot be empty");
    } else if (!emailStatus) {
      alert("Email is not valid");
    } else if (!passwordStatus) {
      alert(
        "Password must be 8 character and password must have uppercase letter lowercase letter special character and number"
      );
    } else {
      document.querySelector(".loader").style.display = "flex";
      fetch("https://login-system-ecommerce.herokuapp.com/singUp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          userName: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success == null) {
            document.querySelector(".loader").style.display = "none";
            alert("UserName already taken.");
          } else if (data.success === false) {
            document.querySelector(".loader").style.display = "none";
            alert("Something went wrong please try again later");
          } else {
            document.querySelector(".loader").style.display = "none";
            const signUp = document.querySelectorAll(".signUpI");
            for (let i = 0; i < signUp.length; i++) {
              signUp[i].classList.add("removeSignUp");
            }
            const otp = document.querySelectorAll(".otp");
            for (let i = 0; i < otp.length; i++) {
              otp[i].style.display = "block";
            }
            document.querySelector(".otpInput").classList.add("addOtp");
          }
        })
        .catch((err) => {
          document.querySelector(".loader").style.display = "none";
          alert("Something went wrong please try again later.");
        });
    }
  };

  const confirmEmail = (e) => {
    e.preventDefault();
    document.querySelector(".loader").style.display = "flex";
    const otp = document.querySelector(".otp").value;
    if (otp) {
      fetch("https://login-system-ecommerce.herokuapp.com/verifyEmail", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ otp: otp, userName: userName.current.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            document.querySelector(".loader").style.display = "none";
            document
              .querySelector(".container")
              .classList.remove("sign-up-mode");
            document.querySelector(".alert").style.display = "block";
            setTimeout(() => {
              document.querySelector(".alert").style.display = "none";
            }, 3000);
          } else {
            alert("Otp is not valid");
            document.querySelector(".loader").style.display = "none";
          }
        });
    } else {
      alert("Field can't be empty");
    }
  };

  const loginUsername = useRef();
  const loginPassword = useRef();

  const Login = (e) => {
    e.preventDefault();
    if (loginUsername.current.value && loginPassword.current.value) {
      document.querySelector(".loginLoader").style.display = "flex";
      fetch("https://login-system-ecommerce.herokuapp.com/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userName: loginUsername.current.value,
          password: loginPassword.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          document.querySelector(".loginLoader").style.display = "none";
          if (data.loginStatus) {
            navigate('/')
          } else {
            alert("Username or Password is incorrect");
          }
        })
        .catch((err) => {
          document.querySelector(".loginLoader").style.display = "none";
          alert("Something went wrong. Try again later");
        });
    } else {
      alert("Field can't be empty");
    }
  };

  const forgetPassword = (e) => {
    e.preventDefault();
    const loginInput = document.querySelectorAll(".loginInput");
    e.target.style.display = "none";
    document.querySelector(".loginSocial").style.display = "none";
    document.querySelectorAll(".loginSocial")[1].style.display = "none";
    for (let i = 0; i < loginInput.length; i++) {
      loginInput[i].classList.add("hiddenLoginInput");
    }
    const forgetInput = document.querySelectorAll(".forgetPassword");
    for (let i = 0; i < forgetInput.length; i++) {
      forgetInput[i].classList.add("addForgetField");
    }
  };

  const checkAccount = (e) => {
    e.preventDefault();
    document.querySelector(".loginLoader").style.display = "flex";
    fetch("https://login-system-ecommerce.herokuapp.com/searchUser", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ userName: userNameForget.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Don't have any account with this username");
          document.querySelector(".loginLoader").style.display = "none";
        } else {
          document.querySelector(".loginLoader").style.display = "none";
          const forgetInput = document.querySelectorAll(".forgetPassword");
          for (let i = 0; i < forgetInput.length; i++) {
            forgetInput[i].classList.remove("addForgetField");
          }

          const forgetPasswordOtp =
            document.querySelectorAll(".forgetPasswordOtp");
          for (let i = 0; i < forgetPasswordOtp.length; i++) {
            forgetPasswordOtp[i].classList.add("addForgetField");
          }
          setUserData(data.data);
        }
      });
  };

  const confirmForgetPasswordOtp = (e) => {
    e.preventDefault();
    document.querySelector(".loginLoader").style.display = "flex";

    fetch("https://login-system-ecommerce.herokuapp.com/verifyForgottenOtp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ otp: otpForget.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          document.querySelector(".loginLoader").style.display = "none";
          const forgetPasswordOtp =
            document.querySelectorAll(".forgetPasswordOtp");
          for (let i = 0; i < forgetPasswordOtp.length; i++) {
            forgetPasswordOtp[i].classList.remove("addForgetField");
          }

          const newPassword = document.querySelectorAll(".newPassword");
          for (let i = 0; i < newPassword.length; i++) {
            newPassword[i].classList.add("addForgetField");
          }
        } else {
          alert("Otp is not valid");
          document.querySelector(".loginLoader").style.display = "none";
        }
      });
  };

  const changePassword = (e) => {
    e.preventDefault();

    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordStatus = pass.test(newPassword.current.value);

    if (passwordStatus) {
      document.querySelector(".changePasswordLoder").style.display = "flex";
      fetch("https://login-system-ecommerce.herokuapp.com/changePassword", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          password: newPassword.current.value,
          userName: userData[0].userName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            document.querySelector(".changePasswordLoder").style.display =
              "none";
            const newPassword = document.querySelectorAll(".newPassword");
            for (let i = 0; i < newPassword.length; i++) {
              newPassword[i].classList.remove("addForgetField");
            }

            const loginInput = document.querySelectorAll(".loginInput");
            document.querySelector(".forgetPassword").display = "block";
            document.querySelector(".loginSocial").style.display = "block";
            document.querySelectorAll(".loginSocial")[1].style.display = "flex";
            for (let i = 0; i < loginInput.length; i++) {
              loginInput[i].classList.remove("hiddenLoginInput");
            }
          } else {
            alert("Something went wrong please try again");
            document.querySelector(".changePasswordLoder").style.display =
              "none";
          }
        });
    } else {
      alert(
        "Password must be 8 character and password must have uppercase letter lowercase letter special character and number"
      );
    }
  };
  return (
    <>
      <div
        className="alert hidden bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Successfully signed up.</p>
            <p className="text-sm">Please login to continue to this site.</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title loginInput">Sign in</h2>
              <h2
                style={{ textAlign: "center" }}
                className="hidden title forgetPassword"
              >
                Enter your user name for search your account.
              </h2>
              <h2
                style={{ textAlign: "center" }}
                className="hidden title forgetPasswordOtp"
              >
                Enter OTP.
              </h2>
              <h2
                style={{ textAlign: "center" }}
                className="hidden title newPassword"
              >
                Enter New Password.
              </h2>
              <p
                style={{ textAlign: "center" }}
                className="hidden forgetPasswordOtp"
              >
                {userData.length != 0 &&
                  `We have sent a mail in ${userData[0].email}`}
              </p>
              <div className="input-field loginInput">
                <i className="fas fa-user"></i>
                <input ref={loginUsername} type="text" placeholder="Username" />
              </div>
              <div className="loginInput input-field">
                <i className="fas fa-lock"></i>
                <input
                  ref={loginPassword}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="forgetPassword forgetUserInput input-field">
                <i className="fas fa-user"></i>
                <input
                  ref={userNameForget}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div
                style={{ paddingLeft: "20px" }}
                className="forgetPasswordOtp input-field"
              >
                <i className="fas fa-lock"></i>
                <input ref={otpForget} type="number" placeholder="OTP" />
              </div>
              <div className="forgetUserInput newPassword input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  ref={newPassword}
                  placeholder="New Password"
                />
              </div>
              <a className="forget" onClick={forgetPassword} href=" ">
                Forget Password
              </a>
              <input
                type="submit"
                value="Login"
                onClick={Login}
                className="btn solid loginInput"
              />
              <input
                type="submit"
                value="Search"
                className="btn solid forgetPassword hidden"
                onClick={checkAccount}
              />
              <input
                type="submit"
                value="Confirm Otp"
                className="btn solid forgetPasswordOtp hidden"
                onClick={confirmForgetPasswordOtp}
              />
              <input
                type="submit"
                value="Confirm"
                className="btn solid newPassword hidden"
                onClick={changePassword}
              />
              <p className="loginSocial social-text">
                Or Sign in with social platforms
              </p>
              <div className="loginSocial social-media">
                <a href=" " className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title signUpI">Sign up</h2>
              <div className="input-field signUpI inInput">
                <i className="fas fa-user"></i>
                <input ref={firstName} type="text" placeholder="First Name" />
              </div>
              <div className="input-field signUpI inInput">
                <i className="fas fa-user"></i>
                <input ref={lastName} type="text" placeholder="Last Name" />
              </div>
              <div className="input-field signUpI inInput">
                <i className="fas fa-user"></i>
                <input ref={userName} type="text" placeholder="Username" />
              </div>
              <div className="input-field signUpI inInput">
                <i className="fas fa-envelope"></i>
                <input ref={email} type="email" placeholder="Email" />
              </div>
              <div className="input-field signUpI inInput">
                <i className="fas fa-lock"></i>
                <input ref={password} type="password" placeholder="Password" />
              </div>
              <div
                className="input-field otpInput inInput"
                style={{ paddingLeft: "25px" }}
              >
                <input type="number" className="otp" placeholder="OTP" />
              </div>
              <input
                type="submit"
                onClick={signUpTakeInformation}
                className="btn signUpI"
                value="Sign up"
              />
              <input
                type="submit"
                onClick={confirmEmail}
                className="btn otp"
                value="Confirm Email"
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href=" " className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href=" " className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Sign Up</h3>
              <p>If you do not have account. Please create a account.</p>
              <button
                className="btn transparent"
                onClick={() =>
                  document
                    .querySelector(".container")
                    .classList.add("sign-up-mode")
                }
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src={loginImg} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 className="signUpI">Sign in</h3>
              <h3 className="otp">Confirm Email</h3>
              <p className="signUpI">
                If you Already have an account.You can go to sign in page.
              </p>
              <p className="otp">
                We have sent you a otp to your email.Please enter the otp to
                confirm your email.
              </p>
              <button
                className="btn signUpI transparent"
                onClick={() =>
                  document
                    .querySelector(".container")
                    .classList.remove("sign-up-mode")
                }
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img src={registerImg} className="image" alt="" />
          </div>
        </div>
      </div>
      <div className="hidden w-screen flex fixed top-0 left-0 flex-col justify-center items-center h-screen loader">
        <img className="w-1/12" src={loader} alt="" />
        <p className="signUpI">Data is sending to database...</p>
        <p className="otp">Checking...</p>
      </div>
      <div className="hidden w-screen flex fixed top-0 left-0 flex-col justify-center items-center h-screen loader loginLoader">
        <img className="w-1/12" src={loader} alt="" />
        <p>Checking...</p>
      </div>
      <div className="hidden w-screen flex fixed top-0 left-0 flex-col justify-center items-center h-screen loader changePasswordLoder">
        <img className="w-1/12" src={loader} alt="" />
        <p>Changing...</p>
      </div>
    </>
  );
};

export default LoginAndRegister;

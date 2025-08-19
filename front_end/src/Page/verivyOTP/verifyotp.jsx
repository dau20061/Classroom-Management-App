import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import {
  sendEmailOTP,
  verifyEmailOTP,
  setUserPassword,
} from "../../component/setupaccount"; 

export default function EmailAuth() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await sendEmailOTP(email);
      alert("OTP has been sent to your email!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await verifyEmailOTP(email, otp);
      alert("Verification successful!");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Incorrect OTP");
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      await setUserPassword(email, password);
      alert("Password has been set successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to set password");
    }
  };

  const BackButton = () => (
    <div className="back">
      <a
        href="#"
        className="back-link"
        onClick={(e) => {
          e.preventDefault();
          setStep(1); 
        }}
      >
        <GoArrowLeft className="icon" /> Back
      </a>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="logincontainer">
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <BackButton />
            <h1 className="h1">Sign In</h1>
            <p className="text_please">Please enter your email to sign in</p>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="input_phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn_next" type="submit">Next</button>
            <p className="text_passwordless">
              Passwordless authentication methods
            </p>
            <p className="text_dont_have_account">
                Don't have an account?
              <a href="#" className="link_sign_up">
                Sign Up
              </a>
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <BackButton />
            <h1 className="h1">Email verification</h1>
            <p className="text_please">Please enter the code sent to your email</p>
            <p className="text_please " style={{ marginTop: "5px" }}>to your email address</p>
            <div>
              <input
                type="text"
                placeholder="Enter Your OTP"
                className="input_phone"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button className="btn_next" type="submit">Submit</button>
            <p className="text_dont_have_account">
              Code not received?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendOTP(e);
                }}
                className="link_sign_up"
              >
                {" "}Send again
              </a>
            </p>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSetPassword}>
            <BackButton />
            <h1 className="h1">Setup Password</h1>
            <p className="text_please">Create your password for login</p>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                className="input_phone"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn_next" type="submit">Save Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { createAccessCode, validateAccessCode } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { GoArrowLeft } from "react-icons/go";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();
    if (!phone) return alert("Please enter phone number");
    try {
      await createAccessCode(phone);
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send code. Please try again.");
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    if (!code) return alert("Please enter code");

    try {
      const res = await validateAccessCode(phone, code);
      if (res.data.success) {
        const role = res.data.role;
        localStorage.setItem("phone", phone);
        localStorage.setItem("role", role);
        navigate("/teacher");
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="logincontainer">
        {step === 1 && (
          <form>
            <div className="back">
              <a href="/" className="back-link">
                <GoArrowLeft className="icon" /> Back
              </a>
            </div>
            <h1 className="h1">Sign In</h1>
            <p className="text_please">Please enter your phone to sign in</p>
            <div>
              <input
                type="text"
                placeholder="Your Phone Number"
                className="input_phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button className="btn_next" onClick={sendCode}>
              Next
            </button>
            {error && <p className="error">{error}</p>}
            <p className="text_passwordless">
              Passwordless authentication methods
            </p>
            <p className="text_dont_have_account">
              Don't having account?
              <a href="/signup" className="link_sign_up"> Sign Up</a>
            </p>
          </form>
        )}

        {step === 2 && (
          <form>
            <div className="back">
              <a href="/" className="back-link">
                <GoArrowLeft className="icon" /> Back
              </a>
            </div>
            <h1 className="h1">Phone verification</h1>
            <p className="text_please">
              Please enter your code that sent to your phone
            </p>
            <div>
              <input
                type="text"
                placeholder="Enter Your Code"
                className="input_phone"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button className="btn_next" onClick={verifyCode}>
              Submit
            </button>
            {error && <p className="error">{error}</p>}
            <p className="text_dont_have_account">
              Code not receive?
              <a href="#" onClick={sendCode} className="link_sign_up">
                {" "}Send again
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

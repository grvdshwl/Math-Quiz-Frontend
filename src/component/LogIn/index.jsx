import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailStep, PasswordStep } from "../ReuseableComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword } from "../../utils";
import { useUser } from "../../context/authProvider.context";
import { config } from "../../../config";

const Login = () => {
  const { loginUser } = useUser();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nextStep = () => {
    if (step === 1 && !validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (step === 2 && !validatePassword(password)) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    fetch(`${config.API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Welcome " + data.user.name);
          loginUser(data.user);
        } else {
          toast.error("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>
      {step === 1 && (
        <EmailStep
          stepCount={step}
          email={email}
          setEmail={setEmail}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <PasswordStep
          stepCount={step}
          password={password}
          setPassword={setPassword}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      <p className="signup-prompt">
        Do not have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;

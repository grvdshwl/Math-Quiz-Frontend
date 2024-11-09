import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { EmailStep, PasswordStep, ProfileStep } from "../ReuseableComponents";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/authProvider.context";
import { config } from "../../../config";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useUser();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  const validateName = (name) => name.trim().length > 1;

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
    if (!validateName(name)) {
      toast.error("Please enter your  name.");
      return;
    }
    fetch(`${config.API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Signup complete! Welcome, " + name + "!");
          console.log(data, "ata 1");
          signupUser(data.user);
          navigate("/");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <ToastContainer />
      <h2>Signup</h2>
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
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ProfileStep
          stepCount={step}
          name={name}
          setName={setName}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      <p className="signup-prompt">
        I already have a account? <Link to="/login">Login </Link>
      </p>
    </div>
  );
};

export default Signup;

import PropTypes from "prop-types";

const StepContainer = ({
  stepCount,
  title,
  children,
  nextStep,
  prevStep,
  submitText,
  handleSubmit,
}) => (
  <div style={styles.container}>
    <p style={styles.title}>
      Step {stepCount}: {title}
    </p>
    <div style={styles.content}>{children}</div>
    <div style={styles.buttonContainer}>
      {prevStep && (
        <button style={styles.button} onClick={prevStep}>
          Back
        </button>
      )}
      {nextStep && (
        <button style={styles.button} onClick={nextStep}>
          Next
        </button>
      )}
      {handleSubmit && (
        <button style={styles.button} onClick={handleSubmit}>
          {submitText || "Submit"}
        </button>
      )}
    </div>
  </div>
);

StepContainer.propTypes = {
  stepCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  submitText: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export const EmailStep = ({ stepCount, email, setEmail, nextStep }) => (
  <StepContainer stepCount={stepCount} title="Email" nextStep={nextStep}>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={styles.input}
    />
  </StepContainer>
);

EmailStep.propTypes = {
  stepCount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export const PasswordStep = ({
  stepCount,
  password,
  setPassword,
  nextStep,
  prevStep,
  handleSubmit,
}) => (
  <StepContainer
    stepCount={stepCount}
    title="Password"
    nextStep={nextStep}
    prevStep={prevStep}
    handleSubmit={handleSubmit}
  >
    <input
      type="password"
      placeholder="Create a password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={styles.input}
    />
  </StepContainer>
);

PasswordStep.propTypes = {
  stepCount: PropTypes.number.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export const ProfileStep = ({
  stepCount,
  name,
  setName,
  prevStep,
  handleSubmit,
}) => (
  <StepContainer
    stepCount={stepCount}
    title="Name"
    prevStep={prevStep}
    handleSubmit={handleSubmit}
    submitText="Submit"
  >
    <input
      type="text"
      placeholder="Enter your  name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={styles.input}
    />
  </StepContainer>
);

ProfileStep.propTypes = {
  stepCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "280px",
    margin: "auto",
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.2em",
    textAlign: "center",
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

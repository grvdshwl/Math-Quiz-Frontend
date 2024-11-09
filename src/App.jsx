import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Component/SignUp";
import Login from "./Component/LogIn";
import Gameplay from "./component/Gameplay";
import { useUser } from "./context/authProvider.context";
import PropTypes from "prop-types";

function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Login />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element,
  isAuthenticated: PropTypes.bool,
};

function App() {
  const { isAuthenticated } = useUser();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={<Gameplay />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

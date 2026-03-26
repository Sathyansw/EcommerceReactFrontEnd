import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);

      navigate("/");

    } catch (error) {

      console.error(error);
      alert("Login failed");

    }
  };

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow-lg p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4">🔐 Login</h3>

        <div className="mb-3">

          <label className="form-label">Email address</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <hr />

        <p className="text-center mb-0">
          Don’t have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

      </div>

    </div>

  );

}

export default Login;
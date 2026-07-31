import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        formData,
      );
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        if (response.data.user.role === "admin") {
          navigate("/admin/post");
        } else {
          navigate("/");
        }
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setIsError(error.response.data.message);
      toast.error(error.response.data.message);
      console.log("error", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isError && <p>{isError}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading.." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

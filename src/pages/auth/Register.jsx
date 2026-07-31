import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        formData,
      );
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
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
    <div className="container" style={{padding: 2}}>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
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

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter your confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {isError && <p>{isError}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading.." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;

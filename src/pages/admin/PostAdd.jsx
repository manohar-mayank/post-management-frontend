import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const PostAdd = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token")
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setPreview(imgUrl);
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("desc", formData.desc);
    formdata.append("category", formData.category);
    formdata.append("image", formData.image);
    console.log("data", formdata);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/post`,
        formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
      );
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          desc: "",
          category: "",
          image: null,
        });
        setPreview(null);
        navigate("/admin/post");
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
        <h2>Product Add Form</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          type="text"
          name="desc"
          placeholder="Enter product desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter product category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Image</label>
        <input type="file" onChange={handleChange} required />
        {preview && (
          <img src={preview} style={{ width: "50px", height: "50px" }} />
        )}

        {isError && <p>{isError}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading.." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default PostAdd;

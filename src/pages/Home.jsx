import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/post`);
        // console.log("response", response);
        setPost(response.data.data);
      } catch (error) {
        setIsError(error.response.data.message);
        toast.error(error.response.data.message);
        console.log("error", error.response);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, []);

  console.log("post", posts);
  return (
    <div>
      <h1>Post List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {isLoading && <p>loading...</p>}
        {isError && <p>{isError}</p>}
        {posts?.map((post) => (
          <div
            key={post._id}
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: "1px solid black",
              padding: 2,
            }}
          >
            <img
              src={post.image.url}
              alt=""
              style={{ width: "150px", height: "150px" }}
            />
            <h2>{post.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

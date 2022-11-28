import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://ebay-cars-server.vercel.app/blogs").then((data) => {
      setBlogs(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-10 px-7">
      <div className="container xl:w-1/2 mx-auto">
        <div className="grid lg:grid-cols-2 justify-center gap-10">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{blog.question}</h2>
                <p className="text-gray-600">{blog.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

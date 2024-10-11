import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import headerVideo from "../../assets/logo/header.mp4"; // Adjusted import for the header video

export default function TourismBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestBlogs, setLatestBlogs] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get("http://localhost:8000/blog");
        setBlogs(blogResponse.data);
        setLatestBlogs(blogResponse.data.slice(0, 5)); // Get the latest 5 blogs
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set interval for the slideshow of latest blogs
  useEffect(() => {
    if (latestBlogs.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % latestBlogs.length);
      }, 3000); // Change slides every 3 seconds
      return () => clearInterval(interval);
    }
  }, [latestBlogs]);

  return (
    <div>
      <Navbar />

      {/* Header Video Section */}
      <div className="relative">
        <video
          src={headerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center p-4">
            Welcome To Our Blog!
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white text-center px-4 max-w-md mx-auto">
            Dive into the world of sustainable farming, fresh produce, and rural living. Whether you're a seasoned farmer or just curious about farm life, we invite you to explore, learn, and grow with us. Happy reading!
          </p>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="py-1 bg-gradient-to-r from-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">Trending Blogs!</h2>
          <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg">
            {latestBlogs.length > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {latestBlogs.map((blog) => (
                  <Link
                    to={`/blog/${blog._id}`}
                    key={blog._id}
                    className="w-full flex-shrink-0"
                    style={{ width: "100%" }}
                  >
                    <div className="relative w-full h-25">
                      {blog.image && (
                        <img
                          src={`http://localhost:8000/BlogImages/${blog.image}`}
                          alt={blog.title}
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                          <h3 className="text-xl font-semibold">{blog.title}</h3>
                          <p className="mt-1">{blog.excerpt || blog.content.substring(0, 100) + '...'}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 mt-6 md:mt-10 md:mx-10 pt-20">
        <nav className="bg-sky-500 text-white py-6 sticky top-0 z-10 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center ml-20">
              <div className="relative w-full max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search Blogs...
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Blogs..."
                  className="w-full py-2 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-600"
                  size={20}
                />
              </div>
              <Link to="/speechgenerator">
                <button className="ml-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-800 transition duration-300">
                  Speech Generator
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Blog Section */}
        <div className="container mx-auto px-4 py-8">
          {loading && <p className="text-center text-gray-600">Loading data...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  {blog.image && (
                    <img
                      src={`http://localhost:8000/BlogImages/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-sky-700 mb-2">
                      {blog.title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span>{blog.author}</span>
                      <span className="ml-4">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {blog.excerpt || blog.content.substring(0, 100) + '...'}
                    </p>
                    <Link to={`/blog/${blog._id}`}>
                      <span className="inline-block bg-sky-500 text-white py-2 px-4 rounded-full hover:bg-sky-600 transition duration-300 transform hover:translate-y-1">
                        Read More
                      </span>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

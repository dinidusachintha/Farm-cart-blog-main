import React, { useState, useEffect } from "react";  // Ensure useState and useEffect are imported
import axios from "axios";
import AddBlog from "../blog manage/AddBlog";
import BlogList from "../blog manage/BlogList";
import Spinner from "../../components/spinner/spinner";
import CommentList from "../blog manage/CommentList"; // Update the path as needed

const Admin = () => {
  const [activeTab, setActiveTab] = useState('Manage Blogs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0); 

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen bg-green-100">
      <aside className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold bg-green-900">Admin Dashboard</div>
        <nav className="flex-1 px-2 py-4">
          {['Manage Blogs', 'Add Blogs', 'Manage Comments'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`block w-full text-left px-4 py-2 rounded ${activeTab === tab ? 'bg-green-700' : ''}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner /> 
          </div>
        ) : (
          <>
            {activeTab === 'Manage Blogs' && <BlogList />}
            {activeTab === 'Add Blogs' && <AddBlog />}
            {activeTab === 'Manage Comments' && <CommentList />} 
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;

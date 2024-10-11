import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(); // Fetch all comments on component mount
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/comments"); // Fetch all comments
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const deleteComment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/comments/delete/${id}`);
        alert("Comment deleted successfully!");
        fetchComments(); // Refresh comment list after deletion
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Comment deletion failed.");
      }
    }
  };

  return (
    <section className="max-w-7xl p-6 mx-auto bg-green-700 rounded-md shadow-md dark:bg-green-800 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-white capitalize dark:text-white">Comments List</h1>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start p-4 bg-white rounded-md shadow-md dark:bg-green-800">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Comment by: {comment.name}</h2>
              <p className="text-gray-600 dark:text-green-300">{comment.comment}</p>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentList;

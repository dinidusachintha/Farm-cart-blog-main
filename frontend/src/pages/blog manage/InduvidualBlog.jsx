import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/logo/logo.png"; // Your logo path

export default function IndividualBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', comment: '' });

    useEffect(() => {
        if (!id) return;

        // Fetch blog data
        axios.get(`http://localhost:8000/blog/get/${id}`)
            .then((res) => {
                setBlog(res.data);
            })
            .catch((err) => console.log(err));

        // Fetch comments for this blog post
        axios.get(`http://localhost:8000/comments/${id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    // Handle form input change
    const handleInputChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    // Handle comment form submit
    const handleSubmitComment = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/comments/add', {
            blogId: id,
            ...newComment
        })
        .then((res) => {
            setComments([res.data, ...comments]);
            setNewComment({ name: '', comment: '' }); // Clear the form after submission
        })
        .catch((err) => console.log(err));
    };

    // Function to download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Load the logo image
        const logoImg = new Image();
        logoImg.src = logo;

        // Ensure the logo is loaded before generating the PDF
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 10, 10, 40, 5); // Add logo
            doc.setFontSize(22);
            doc.text(blog.title, 10, 60); // Blog title
            doc.setFontSize(12);
            doc.text(`By: ${blog.author}`, 10, 70); // Author
            doc.text(`Date: ${new Date(blog.createdAt).toLocaleDateString()}`, 10, 80); // Date

            // Adding blog image if it exists
            if (blog.image) {
                const imageUrl = `http://localhost:8000/BlogImages/${blog.image}`;
                const blogImg = new Image();
                blogImg.src = imageUrl;

                blogImg.onload = () => {
                    doc.addImage(blogImg, 'JPEG', 10, 90, 180, 100); // Blog image
                    addContentToPDF(doc, blog.content, blog.title); // Add content
                };

                blogImg.onerror = () => {
                    console.error("Failed to load blog image");
                    addContentToPDF(doc, blog.content, blog.title); // Save PDF without image
                };
            } else {
                addContentToPDF(doc, blog.content, blog.title); // Add content without image
            }
        };

        logoImg.onerror = () => {
            console.error("Failed to load logo image");
        };
    };

    const addContentToPDF = (doc, content, title) => {
        let yPosition = 200; // Starting position for content
        doc.setFontSize(10);
        doc.text("Content:", 10, yPosition);
        yPosition += 10; // Move down after header

        // Split content into lines that fit within the page width
        const contentLines = doc.splitTextToSize(content, 180);

        // Loop through content lines and add them to the PDF
        contentLines.forEach((line) => {
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 10; // Reset Y position for new page
                doc.text(title, 10, 10); // Title on new page
                doc.text("Content:", 10, 20); // Content header on new page
                yPosition = 30; // Reset position for content
            }
            doc.text(line, 10, yPosition); // Add line to PDF
            yPosition += 10; // Move down for next line
        });

        doc.save(`${title}.pdf`); // Save the PDF
    };

    // Function to handle document download
    const handleDownloadDocument = () => {
        const downloadUrl = `http://localhost:8000/BlogDocuments/${blog.document}`; // Assuming document field holds the filename
        window.open(downloadUrl, '_blank'); // Open the document URL
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-6 md:mt-10 pt-20 px-4">
                <h1 className="text-4xl font-bold text-center mb-8">{blog.title}</h1>
                
                <div className="mb-8 text-center">
                    <p className="text-lg text-gray-600">
                        By <span className="font-semibold">{blog.author}</span> | 
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                </div>
                
                {blog.image && (
                    <img
                        src={`http://localhost:8000/BlogImages/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-auto object-cover rounded-lg mb-8 shadow-lg"
                    />
                )}
                
                <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </p>
                </div>
                
                {/* Document Download Button */}
                {blog.document && (
                    <div className="text-center mb-4">
                        <button 
                            onClick={handleDownloadDocument} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Download Document
                        </button>
                    </div>
                )}

                <div className="text-center mb-4">
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={downloadPDF}
                    >
                        Download Blog as PDF
                    </button>
                </div>

                {/* Comment Form */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
                    <form onSubmit={handleSubmitComment}>
                        <input 
                            type="text" 
                            name="name" 
                            value={newComment.name} 
                            onChange={handleInputChange} 
                            placeholder="Your Name" 
                            className="w-full p-2 mb-4 border rounded" 
                            required 
                        />
                        <textarea 
                            name="comment" 
                            value={newComment.comment} 
                            onChange={handleInputChange} 
                            placeholder="Your Comment" 
                            className="w-full p-2 mb-4 border rounded" 
                            required 
                        />
                        <button 
                            type="submit" 
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Comments Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="mb-4 p-4 bg-gray-200 rounded-lg">
                                <p><strong>{comment.name}</strong> said:</p>
                                <p>{comment.comment}</p>
                                <p className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

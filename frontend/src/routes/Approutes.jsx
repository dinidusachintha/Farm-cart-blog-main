
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import Blog from "../pages/blog manage/AddBlog"
import BlogList from "../pages/blog manage/BlogList"
import TourismBlog from "../pages/blog manage/UserBlog"
import IndividualBlog from "../pages/blog manage/InduvidualBlog";
import Admin from "../pages/dashboard/Admin";
import UpdateBlogDashboard from "../pages/dashboard/Ishanka dahsbaord/UpdateBlogDashbaord";
import SpeechGenerator from "../pages/common/speech/SpeechGenerator"
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-blog" element={<Blog />} />
                <Route path="/blog-list" element={<BlogList />} />
                <Route path="/update-blog/:id" element={<UpdateBlogDashboard />} />
                <Route path="/user-blog" element={<TourismBlog />} />
                <Route path ="/blog/:id" element = {<IndividualBlog />} />
                <Route path="/speechgenerator" element={<SpeechGenerator />} />
                <Route 
                    path="/dashboard" 
                    element={
                        
                            <Admin />
                        
                    } 
                />

                
            </Routes>
        </Router>
    );
}

export default AppRoutes;

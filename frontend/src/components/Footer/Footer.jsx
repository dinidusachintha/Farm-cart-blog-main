

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        

      
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-400">© 2024 Ceylon Odyssey. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

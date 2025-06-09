import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" alt="Boostmysites Logo" className="h-8 w-8 object-contain" loading="lazy" />
              <span className="text-xl font-bold">Boostmysites</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building innovative AI-powered software solutions that transform businesses and drive digital success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">AI Solutions</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">SaaS Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Digital Marketing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              
              
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>chairman@boostmysites.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+919632953355</span>
              </div>
              
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Boostmysites. All rights reserved. Built with passion for innovation.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
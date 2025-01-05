import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { useNavigate, NavLink } from 'react-router-dom';
import '../Dashboard.css';

export const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true     // Whether animation should happen only once
    });
  }, []);

  // On initial load, check if the user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem('userEmail'));  // Get the stored user email
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signUp');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('isLoggedIn');  // Remove login status from localStorage
    localStorage.removeItem('userEmail');  // Remove stored user email
    localStorage.removeItem('userPassword');  // Remove stored user password
    navigate('/login');  // Navigate to login page
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navigation">
        <h1>HobbyHub</h1>

        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <ul id="ul1" className={menuOpen ? 'open' : ''}>
          <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/explore" activeClassName="active">Explore Groups</NavLink></li>
          <li><a href="#about">About</a></li>
          <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>

          <ul id="ul2" className={menuOpen ? 'open' : ''}>
            {isLoggedIn ? (
              <li>
                <span>Welcome, {userEmail}</span>
                <button id="button2" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li><button id="button2" onClick={handleLoginClick}>Login</button></li>
                <li><button id="button2" onClick={handleSignUpClick}>Sign Up</button></li>
              </>
            )}
          </ul>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Discover, Share and Explore Your Hobbies!</h1>
      </div>
      <div id="about" data-aos="fade-up">
        <h2>About</h2>
        <h5>
        Welcome to Collaborative Hobby Hub, a platform designed to bring hobby enthusiasts together!

At Hobby Hub, we believe that hobbies are more than just pastimes—they are gateways to creativity, self-expression, and meaningful connections. Whether you're passionate about painting, coding, gardening, or exploring new skills, Hobby Hub is your go-to space to share, learn, and grow with like-minded individuals.

What We Offer:

Connect & Collaborate: Meet people who share your interests and collaborate on exciting projects.
Showcase Your Talents: Share your creations, receive feedback, and inspire others.
Learn Together: Discover resources, join workshops, and expand your skillset through collaborative learning.
Community for All: From beginners to experts, Hobby Hub welcomes everyone with open arms.
Join us on a journey to make hobbies more meaningful, collaborative, and fun. Let’s turn passions into partnerships and ideas into actions!
          {/* About content */}
        </h5>
      </div>
      <div className="footer">
        <h5> &copy; All rights reserved, CIRCUIT BREAKERS </h5>
      </div>
    </div>
  );
};

export default Dashboard;

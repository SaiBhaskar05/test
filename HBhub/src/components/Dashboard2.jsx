import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useNavigate } from 'react-router-dom';
import '../Dashboard2.css';

export const Dashboard2 = ({ setIsLoggedIn }) => {
  const [isLoggedIn, setLocalLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userLogo, setUserLogo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setLocalLoggedIn(true);
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, []);

  const handleLogout = () => {
    setLocalLoggedIn(false);
    setUserEmail('');
    setUserLogo('');
    localStorage.clear();
    setIsLoggedIn(false);
    alert('Successfully logged out');
    navigate('/');

    setTimeout(() => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href);
      };
    }, 0);
  };

  const handleExploreGroups = () => {
    navigate('/explore-groups');
  }
  const handleBlogs = () => {
    navigate('/blogs');
  }
  const handleCreateGroup = () => {
    navigate('/create-group')
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navigation1">
        <h1>HobbyHub</h1>
        <ul id="ul3">
          <li>
            <button id="button3" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        
      </nav>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="card" data-aos="fade-up">
        <img src="https://cdn-icons-png.freepik.com/256/1967/1967199.png?ga=GA1.1.1414198285.1727840973&semt=ais_hybrid" alt="Icon" />
          <h3>Join Groups</h3>
          <p>Find and join groups of people who share your interests.</p>
          <button onClick={handleExploreGroups}>Explore Groups</button>
        </div>
        <div className="card" data-aos="fade-up">
        <img src="https://cdn-icons-png.freepik.com/256/16321/16321833.png?ga=GA1.1.1414198285.1727840973&semt=ais_hybrid" alt="Icon" />
          <h3>Create Groups</h3>
          <p>Start a new group and invite others to join and collaborate.</p>
          <button onClick={handleCreateGroup}>Create a Group</button>
        </div>
        <div className="card" data-aos="fade-up">
        <img src="https://cdn-icons-png.freepik.com/256/9623/9623631.png?ga=GA1.1.1414198285.1727840973&semt=ais_hybrid" alt="Icon" />
          <h3>Blogs</h3>
          <p>Share your experiences and learn from others through blogs.</p>
          <button onClick={handleBlogs}>View Blogs</button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer2">
        <h6>&copy;All rights reserved, CIRCUIT BREAKERS</h6>
      </div>
    </div>
  );
};

export default Dashboard2;

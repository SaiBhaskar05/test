import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import Signup from './components/signUp';
import Login from './components/login';
import Dashboard2 from './components/Dashboard2';
import ExploreGroups from './components/ExploreGroups';
import Blog from './components/Blog';
import CreateGroup from './components/CreateGroup';
import ChatBox from './components/ChatBox';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, setGroups }) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      {/* Protected route */}
      <Route
        path="/dashboard2"
        element={isLoggedIn ? <Dashboard2 setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
      />
      <Route path="/create-group" element={<CreateGroup setGroups={setGroups} />} />
      <Route path="/explore-groups" element={<ExploreGroups />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/explore-groups/chat/:groupName" element={<ChatBox />} />
    </Routes>
  );
};

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setGroups={setGroups} />
    </Router>
  );
};

export default App;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ExploreGroups.css"; // Optional, for styling

const ExploreGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);

    const storedJoinedGroups = JSON.parse(localStorage.getItem("joinedGroups")) || [];
    setJoinedGroups(storedJoinedGroups);
  }, []);

  const addMember = (groupName) => {
    if (!joinedGroups.includes(groupName)) {
      const updatedJoinedGroups = [...joinedGroups, groupName];
      setJoinedGroups(updatedJoinedGroups);
      localStorage.setItem("joinedGroups", JSON.stringify(updatedJoinedGroups));
      alert(`You have been added to the ${groupName} group!`);
    } else {
      alert(`You are already a member of ${groupName} group.`);
    }
  };

  const removeMember = (groupName) => {
    if (joinedGroups.includes(groupName)) {
      const updatedJoinedGroups = joinedGroups.filter(group => group !== groupName);
      setJoinedGroups(updatedJoinedGroups);
      localStorage.setItem("joinedGroups", JSON.stringify(updatedJoinedGroups));
      alert(`You have exited the ${groupName} group!`);
    } else {
      alert(`You are not a member of the ${groupName} group.`);
    }
  };

  return (
    <div>
      <nav className="navigation2">
        <h1>HobbyHub</h1>
        <ul id="ul3">
          <li>
            <button className="nav-button" onClick={() => navigate("/dashboard2")}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigate("/create-group")}>
              Create One
            </button>
          </li>
        </ul>
      </nav>

      <center>
        <h2>Explore Hobby Groups</h2>
      </center>

      <section id="explore-groups" className="groups-container">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <div key={index} className="group-card">
              <h3>{group.name}</h3>
              <p>{group.description}</p>

              <button
                className="add-member-button"
                onClick={() => addMember(group.name)}
                disabled={joinedGroups.includes(group.name)}
              >
                {joinedGroups.includes(group.name) ? "Joined" : "Join"}
              </button>

              {/* Conditionally display the Chat button */}
              {joinedGroups.includes(group.name) && (
                <button
                  className="chat-button"
                  onClick={() => navigate(`/explore-groups/chat/${group.name}`)}
                >
                  Chat
                </button>
              )}

              {group.creator === user && (
                <button
                  className="delete-group-button"
                   onClick={() => deleteGroup(group.name)}
                >
                  Delete Group
                </button>
              )}

              {joinedGroups.includes(group.name) && group.creator !== user && (
                <button
                  className="exit-group-button"
                  onClick={() => removeMember(group.name)}
                >
                  Exit Group
                </button>
              )}
            </div>
          ))
        ) : (
          <h3>No groups available.</h3>
        )}
      </section>

      <footer className="footer4">© 2025 HobbyHub. All rights reserved.</footer>
    </div>
  );
};

export default ExploreGroups;
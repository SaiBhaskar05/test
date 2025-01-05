import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CreateGroup.css"; // Optional, for styling

const CreateGroup = ({ setGroups, user }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  // Use useEffect to check if the user is already in localStorage
  useEffect(() => {
    if (user) {
      // Save the user details to localStorage if not already saved
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [user]); // Run when user changes

  // Handle group creation
  const handleCreateGroup = () => {
    if (groupName && groupDescription) {
      // Retrieve stored groups or initialize an empty array
      const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
      console.log('Stored groups:', storedGroups); // Check stored groups

      // Check if group name already exists
      const isGroupNameExists = storedGroups.some(group => group.name === groupName);
      console.log('Group name exists:', isGroupNameExists); // Check if group name exists

      if (isGroupNameExists) {
        // If group name exists, show an alert and don't create the group
        alert("Please choose a different group name. A group with this name already exists.");
      } else {
        // If group name is unique, create the new group with the 'creator' field
        const newGroup = {
          name: groupName,
          description: groupDescription,
          creator: user,  // Set the creator as the logged-in user
        };
        
        // Add the new group to the existing groups array
        storedGroups.push(newGroup);

        // Save the updated groups list to localStorage
        localStorage.setItem("groups", JSON.stringify(storedGroups));

        // Update the state in the parent component (optional)
        setGroups(storedGroups);

        // Show success alert
        alert(`Group "${groupName}" has been created successfully!`);

        // Redirect to the explore groups page
        navigate("/explore-groups");
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="create-group-container">
      <h2>Create a New Group</h2>
      <div>
        <label>Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="Enter group description"
        />
      </div>
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default CreateGroup;
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, where } from 'firebase/firestore'; // Firestore functions
import { firestore } from '../firebase_setup/firebase'; // Your Firestore setup

// Teacher Landing Page Component
const TeacherLandingPage = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isGeneralClicked, setIsGeneralClicked] = useState(false); // State to manage if "General" is clicked
  const [isMessagesClicked, setIsMessagesClicked] = useState(false); // State to manage if "Messages" is clicked
  const [currentTab, setCurrentTab] = useState('chat'); // State to track current tab (chat or group)
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [teacherData, setTeacherData] = useState([]); // State for storing teacher data from Firestore



// Fetch data from Firestore
const fetchTeacherData = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users')); // Fetching all documents in "teachers" collection
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTeacherData(data); // Set fetched data to state
  } catch (error) {
    console.error("Error fetching teacher data: ", error);
  }
};

// UseEffect to fetch data on component mount
useEffect(() => {
  fetchTeacherData();
}, []);




  // Handler for image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a local URL for the image
      setProfileImage(imageUrl); // Set the uploaded image
    }
  };

  // Toggle "General" section display
  const handleGeneralClick = () => {
    setIsGeneralClicked(!isGeneralClicked);
    setIsMessagesClicked(false); // Close messages when General is clicked
  };

  // Toggle "Messages" section display
  const handleMessagesClick = () => {
    setIsMessagesClicked(!isMessagesClicked);
    setIsGeneralClicked(false); // Close general when Messages is clicked
  };

  // Handle tab switch between Chat and Group
  const handleTabSwitch = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar (Profile Section) */}
      <div style={styles.sidebar}>
        {/* Profile Photo Centered */}
        <img
          src={profileImage || '/path/to/profile/photo.jpg'} // Replace with actual image source
          alt="Teacher Profile"
          style={styles.profilePhotoCentered}
        />

        {/* Teacher Name */}
        <h2 style={styles.teacherName}>{teacherData.map(teacher=>teacher.name)}</h2>

        {/* General Information Section */}
        <div
          style={styles.generalSection}
          onClick={handleGeneralClick} // Clickable "General" section
        >
          <h3 style={styles.generalTitle}>General</h3>
        </div>

        {/* Messages Section */}
        <div
          style={styles.messagesSection}
          onClick={handleMessagesClick} // Clickable "Messages" section
        >
          <h3 style={styles.messagesTitle}>Messages</h3>
        </div>
      </div>

      {/* Main Section */}
      <div style={styles.mainContent}>
        {/* Create Group Button */}
        <Link
          to="/create-group"
          style={{
            ...styles.createGroupButton,
            backgroundColor: isHovered ? '#0077cc' : '#00aaff', // Change color based on hover state
          }}
          onMouseEnter={() => setIsHovered(true)} // Trigger hover
          onMouseLeave={() => setIsHovered(false)} // Remove hover
        >
          Create Group
        </Link>

        {/* Display "General" Details if clicked */}
        {isGeneralClicked && (
          <div style={styles.generalDetails}>
            {/* Edit Button */}
            <button style={styles.editButton}>Edit</button>

            <h3>General Information</h3>
            <ul style={styles.generalList}>
              {teacherData.map(teacher => (
                <li key={teacher.id}>
                  <strong>Name:</strong> {teacher.name}<br />
                  <strong>Age:</strong> {teacher.age??'N/A'}<br />
                  <strong>Email:</strong> {teacher.email}<br />
                  <strong>Department:</strong> {teacher.extraField??'N/A'}<br />
                  <strong>Contact:</strong> {teacher.contact??'N/A'}<br />
                </li>
              ))}
            </ul>

            {/* Profile Photo Upload in the General Section */}
            <h4>Upload Profile Photo</h4>
            <input type="file" onChange={handleImageUpload} />
          </div>
        )}

        {/* Display "Messages" section if clicked */}
        {isMessagesClicked && (
          <div style={styles.messagesDetails}>
            {/* Tabs for Chat and Group */}
            <div style={styles.tabContainer}>
              <button
                style={{
                  ...styles.tabButton,
                  backgroundColor: currentTab === 'chat' ? '#0077cc' : '#f0f0f0',
                  color: currentTab === 'chat' ? '#fff' : '#000',
                }}
                onClick={() => handleTabSwitch('chat')}
              >
                Chat
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  backgroundColor: currentTab === 'group' ? '#0077cc' : '#f0f0f0',
                  color: currentTab === 'group' ? '#fff' : '#000',
                }}
                onClick={() => handleTabSwitch('group')}
              >
                Group
              </button>
            </div>

            {/* Display Chat or Group messages based on the selected tab */}
            {currentTab === 'chat' ? (
              <div style={styles.messageList}>
                <h3>Chat Messages</h3>
                <ul style={styles.messagesList}>
                  <li>John: Hey, can we meet tomorrow?</li>
                  <li>Student: Yes, let’s schedule at 3 PM.</li>
                </ul>
              </div>
            ) : (
              <div style={styles.messageList}>
                <h3>Group Messages</h3>
                <ul style={styles.messagesList}>
                  <li>Group Message 1: Project meeting tomorrow at 2 PM.</li>
                  <li>Group Message 2: Don’t forget to submit the assignments!</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// CSS Styles as JS objects
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align items in the sidebar
  },
  profilePhotoCentered: {
    width: '150px', // Set the square dimension
    height: '150px',
    borderRadius: '50%', // Circular photo
    objectFit: 'cover',
    marginBottom: '20px',
  },
  teacherName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center', // Center the name
  },
  generalSection: {
    cursor: 'pointer',
    padding: '15px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)', // Popping out effect
    transition: 'all 0.3s ease', // Smooth transition
    width: '80%', // Centered section width
    marginBottom: '20px', // Space below for Messages
  },
  generalTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  messagesSection: {
    cursor: 'pointer',
    padding: '15px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)', // Popping out effect
    transition: 'all 0.3s ease', // Smooth transition
    width: '80%',
  },
  messagesTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  generalDetails: {
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    width: '60%',
    marginTop: '10px', // Reduced margin to move it up
    position: 'relative',
  },
  messagesDetails: {
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    width: '60%',
    marginTop: '10px',
    position: 'relative',
  },
  messagesList: {
    listStyle: 'none',
    padding: 0,
    fontSize: '16px',
    lineHeight: '1.6',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tabButton: {
    padding: '10px 30px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  messageList: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    position: 'absolute',
    top: '10px',
    right: '10px', // Move to top-right
    padding: '8px 12px',
    backgroundColor: '#00aaff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    flexDirection: 'column',
  },
  createGroupButton: {
    position: 'absolute',
    top: '20px', // Place the button at the top of the page
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '45px 80px', // Triple padding for top/bottom, double padding for left/right
    backgroundColor: '#00aaff', // Sky blue color (default)
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
};

export default TeacherLandingPage;

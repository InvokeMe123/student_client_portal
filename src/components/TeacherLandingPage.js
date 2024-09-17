import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage methods
import { collection, getDocs,query ,setDoc,where} from 'firebase/firestore'; // Firestore functions
import { getDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore functions to fetch teacher data
import { firestore,storage } from '../firebase_setup/firebase'; // Your Firestore setup
import { getAuth,onAuthStateChanged  } from 'firebase/auth'; // Import Firebase Auth to get current user
import GroupCard from '../utils/groupCard';

// Teacher Landing Page Component
const TeacherLandingPage = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isGeneralClicked, setIsGeneralClicked] = useState(false); // State to manage if "General" is clicked
  const [isMessagesClicked, setIsMessagesClicked] = useState(false); // State to manage if "Messages" is clicked
  const [currentTab, setCurrentTab] = useState('chat'); // State to track current tab (chat or group)
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [teacherData, setTeacherData] = useState([]); // State for storing teacher data from Firestore
  const [uploading, setUploading] = useState(false); // To show upload progress
  const [loading, setLoading] = useState(true); // Loading state to track when data is being fetched



// Fetch data from Firestore
  // Function to fetch teacher data from Firestore

  const groupInfo = {
    groupName: 'AI Research Group',
    projectTitle: 'Exploring Neural Networks',
    studentEmails: ['student1@example.com', 'student2@example.com'],
    description: 'This project involves deep exploration into the workings of neural networks and their applications.',
    fileUrl: 'https://example.com/path/to/document.pdf' // Example URL, replace with actual URL to the document
  };
  const fetchTeacherData = async (currentUser) => {
    try {
      // Query the 'users' collection for the current user with the role 'teacher'
      const userQuery = query(
        collection(firestore, 'users'),
        where('uid', '==', currentUser.uid),
        where('role', '==', 'teacher')
      );
        console.log(query.toString)
      const querySnapshot = await getDocs(userQuery);
      

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); // Get user data
        setTeacherData([userData]); // Set the teacher data in state

        if (userData.profileImage) {
          setProfileImage(userData.profileImage); // Set the profile image in state
        } else {
          console.log('No profile image found');
        }
      } else {
        console.log('No matching user document found for the current teacher.');
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

// UseEffect to fetch data on component mount
useEffect(() => {
  const auth = getAuth(); // Initialize Firebase Auth

  // Wait for Firebase Auth to confirm user authentication state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in, fetch the teacher data from Firestore
      fetchTeacherData(user);
    } else {
      console.log('No user is currently logged in');
      setLoading(false); // Stop loading if no user is logged in
    }
  });

  // Cleanup the subscription to avoid memory leaks
  return () => unsubscribe();
}, []);

if (loading) {
  return <p>Loading...</p>; // Show a loading message while data is being fetched
}

 // Handler for image upload
 const handleImageUpload = async (event) => {
  const file = event.target.files[0]; // Get the file from the input
  if (file) {
    const auth = getAuth(); // Initialize Firebase Auth
    const currentUser = auth.currentUser; // Get the current authenticated user

    if (!currentUser) {
      console.log('No user is currently logged in');
      return;
    }

    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `profile_images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded to Firebase Storage. Download URL:", downloadURL);

      // Query the 'users' collection for the current user with the role 'teacher'
      const userQuery = query(
        collection(firestore, 'users'),
        where('uid', '==', currentUser.uid),
        where('role', '==', 'teacher') // Ensure we're targeting only teachers
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Assuming there's only one matching document for this user
        const userDocRef = querySnapshot.docs[0].ref; // Get the document reference

        console.log("User document found:", querySnapshot.docs[0].data());

        // Update the Firestore document with the profileImage field
        await updateDoc(userDocRef, { profileImage: downloadURL });

        // Optionally set the profile image in the state to display it immediately
        setProfileImage(downloadURL);

        console.log('Profile image updated successfully in Firestore!');
      } else {
        console.log('No matching user document found for the current teacher.');
      }
    } catch (error) {
      console.error('Error uploading and updating profile image:', error);
    }
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
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
      <GroupCard
        groupName={groupInfo.groupName}
        projectTitle={groupInfo.projectTitle}
        studentEmails={groupInfo.studentEmails}
        description={groupInfo.description}
        fileUrl={groupInfo.fileUrl}
      />
    </div>
    </div>



        {/* Display "General" Details if clicked */}
        {isGeneralClicked && (
          <div style={styles.generalDetails}>
            {/* Edit Button */}
            <button style={styles.editButton}>Edit</button>

            <h3>General Information</h3>
            <ul style={styles.generalList}>
            {teacherData && teacherData.length > 0 ? (
    teacherData.map((teacher, index) => (
    <li key={teacher.uid || index}> {/* Using teacher.uid or index as fallback for key */}
      <strong>Name:</strong> {teacher.name || 'N/A'}<br />
      <strong>Age:</strong> {teacher.age ?? 'N/A'}<br />
      <strong>Email:</strong> {teacher.email || 'N/A'}<br />
      <strong>Department:</strong> {teacher.extraField || 'N/A'}<br />
      <strong>Contact:</strong> {teacher.contact || 'N/A'}<br />
    </li>
  ))
) : (
  <p>No teacher data available</p> // Show message if no data is available
)}
            </ul>

            {/* Profile Photo Upload in the General Section */}
            <h4>Upload Profile Photo</h4>
            <input type="file" onChange={handleImageUpload} />
        {uploading && <p>Uploading...</p>} {/* Show uploading progress */}
        {profileImage && <img src={profileImage} alt="Profile" width="150px" />}
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

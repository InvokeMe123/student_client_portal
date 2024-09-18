import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage methods
import { collection, getDocs,query ,where} from 'firebase/firestore'; // Firestore functions
import { updateDoc,doc } from 'firebase/firestore'; // Firestore functions to fetch teacher data
import { firestore,storage } from '../firebase_setup/firebase'; // Your Firestore setup
import { getAuth,onAuthStateChanged,signOut } from 'firebase/auth'; // Import Firebase Auth to get current user
import { useHistory } from 'react-router-dom';
import GroupCard from '../utils/groupCard';

const ProfileComponent = ({ studentData, profileImage, setProfileImage, fetchStudentData}) => {
  const [editMode, setEditMode] = useState(false);
const [editedData, setEditedData] = useState({});

const handleChange = (event) => {
  const { name, value } = event.target;
  setEditedData(prev => ({ ...prev, [name]: value }));}
  const saveChanges = async () => {
    const userDocRef = doc(firestore, 'users', studentData.uid);  // Reference to the user's document
    console.log('this is the students uid', studentData.uid);
  
    const updatedData = {
      age: editedData.age || studentData.age,
      email: editedData.email || studentData.email,
      extraField: editedData.extraField || studentData.extraField,
      name: editedData.name || studentData.name,
      phone: editedData.phone || studentData.phone,
      profileImage: profileImage  // Assumes profileImage state is updated via handleImageUpload
    };
  
    try {
      await updateDoc(userDocRef, updatedData);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  
  const handleSaveChanges = () => {
    setEditMode(false);
    // Assuming saveChanges function exists and performs some operations
    saveChanges();
    fetchStudentData();
    
  };

  const cancelEdit=()=>{
    setEditMode(false);
  }


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    

    try {
      const storageRef = ref(storage, `profile_images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update Firestore document with new profile image URL
      const userDocRef = doc(firestore, 'users', studentData.uid);
      await updateDoc(userDocRef, { profileImage: downloadURL });

      setProfileImage(downloadURL);
      console.log("Image uploaded and profile updated with URL:", downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div style={styles.fullContent}>
    <div style={styles.profileHeader}>
    {!editMode && (
            <button style={styles.editButton} onClick={() => { setEditMode(true); setEditedData(studentData); }}>
              Edit
            </button>
          )}
      <div style={styles.headerDetails}>
        <img src={profileImage || '/public/images/image_2024-09-17_142924314-removebg-preview.png'} alt="Profile" style={styles.profileImage} />
        <div style={styles.nameAndButtonContainer}>
          <h3>{studentData.name}</h3>
          
        </div>
      </div>
    </div>
    <div style={styles.profileDetails}>
        <div style={styles.profileSection}>
          <h4>General Info</h4>
          {editMode ? (
            <>
              <p><strong>Email:</strong><input type="email" value={editedData.email || studentData.email} name="email" onChange={handleChange} /></p>
              <p><strong>Contact:</strong><input type="text" value={editedData.phone || studentData.phone} name="phone" onChange={handleChange} /></p>
              <p><strong>Age:</strong><input type="text" value={editedData.age || studentData.age} name="age" onChange={handleChange} /></p>
              <p><strong>Faculty:</strong><input type="text" value={editedData.extraField || studentData.extraField} name="extraField" onChange={handleChange} /></p>
              <h4>Upload Profile Photo</h4>
              <input type="file" onChange={handleImageUpload} />
              <div>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Email:</strong> {studentData.email}</p>
              <p><strong>Contact:</strong> {studentData.phone}</p>
              <p><strong>Age:</strong> {studentData.age || 'N/A'}</p>
              <p><strong>Faculty:</strong> {studentData.extraField || 'N/A'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


// Additional components unchanged, can add similar detail level as needed
const CoursesComponent = () => (
  <div style={styles.fullContent}>
    <h3>My Courses</h3>
    <p>List of courses and subjects you are enrolled in.</p>
  </div>
);

const MessagesComponent = () => (
  <div style={styles.fullContent}>
    <h3>Messages</h3>
    <p>Interactive chat system to communicate with teachers and students.</p>
  </div>
);

const SupportComponent = () => (
  <div style={styles.fullContent}>
    <h3>Support</h3>
    <p>Contact details and emails for support.</p>
  </div>
);

const AnnouncementsWidget = ({groupsData, studentData}) => {
  if (!groupsData) return <div>Loading...</div>; // Render loading state if data is undefined

 return (

  <div>
    <div style={styles.title}>Added groups</div>
    {groupsData.map((groupInfo,index) => {
        // Check if current user is either the teacher or in the studentEmails list
        console.log("Teacher name",groupInfo.teacher);
        console.log("Current username",studentData?.name );


        const isInGroup =
      groupInfo.teacher?.trim().toLowerCase() === studentData?.name?.trim().toLowerCase() ||
      groupInfo.listOfStudents?.some(email => email.trim().toLowerCase() === studentData?.email?.trim().toLowerCase()) ||
      groupInfo.client?.trim().toLowerCase() === studentData?.email?.trim().toLowerCase();

          console.log("is the user in the group", isInGroup);
          console.log('this is the key',groupInfo.id);

        return (
          isInGroup && (
            <GroupCard
              key={groupInfo.id||index}
              groupName={groupInfo.groupname}
              projectTitle={groupInfo.projectTitle}
              studentEmails={groupInfo.listOfStudents}
              description={groupInfo.description}
              client={groupInfo.client}
              fileUrl={groupInfo.fileDownloadUrl}
              chatId={groupInfo.chatId}
            />
          )
        );
      })}
  </div>      
 );

};

const StudentLandingPage = () => {
  const [activeSection, setActiveSection] = useState('announcements');
  const [profileImage, setProfileImage] = useState(null);
  const [studentData, setStudentData] = useState({}); // Changed from array to object
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [groupsData, setGroups] = useState([]);

  
useEffect(() => {
  const auth = getAuth(); // Initialize Firebase Auth

  // Wait for Firebase Auth to confirm user authentication state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in, fetch the teacher data from Firestore
      fetchStudentData();
      fetchGroups();
    } else {
      console.log("No user is currently logged in");
      setLoading(false); // Stop loading if no user is logged in
    }
  });

  // Cleanup the subscription to avoid memory leaks
  return () => unsubscribe();
}, []);


  const fetchGroups = async () => {
    try {
      // Assuming "groups" is your collection name in Firestore
      const groupsRef = collection(firestore, 'groups');
      const groupsSnapshot = await getDocs(groupsRef);

      const groupsList = groupsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('The group list',groupsList);

      setGroups(groupsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setLoading(false);
    }
  };
  
  const fetchStudentData = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.log('No user is currently logged in');
      setLoading(false);
      return;
    }
    
    try {
      const userQuery = query(
        collection(firestore, 'users'),
        where('uid', '==', currentUser.uid),
        where('role', '==', 'student')
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setStudentData(userData);
        setProfileImage(userData.profileImage || null);
      } else {
        console.log('No matching user document found.');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      history.push('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo} onClick={() => setActiveSection('announcements')}>HOME</div>
        <div style={styles.portalName}>Student Portal</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('profile')}>My Profile</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('courses')}>My Courses</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('messages')}>Messages</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('support')}>Support</div>
        <button style={styles.editButton}  onClick={handleLogout} >Log out</button>
      </div>
      <div style={styles.content}>
      {activeSection === 'profile' && <ProfileComponent studentData={studentData} profileImage={profileImage} setProfileImage={setProfileImage} fetchStudentData={fetchStudentData}/>}
        {activeSection === 'courses' && <CoursesComponent />}
        {activeSection === 'messages' && <MessagesComponent />}
        {activeSection === 'support' && <SupportComponent />}
        {activeSection === 'announcements' && <AnnouncementsWidget groupsData={groupsData} studentData={studentData}/>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  sidebar: {
    width: '255px',
    height: '100vh',
    backgroundColor: '#902bf5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  logo: {
    color: 'white',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  portalName: {
    color: 'white',
    marginBottom: '40px',
    fontSize: '16px',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#902bf5',
    color: 'white',
    padding: '25px 0',
    margin: '20px 0px',
    width: '90%',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    display: 'block',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 -4px 8px rgba(0,0,0,0.1), -4px 0 8px rgba(0,0,0,0.1), 4px 0 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  fullContent: {
    width: '100%',
    padding: '40px 50px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    position: 'absolute',  // Make the profile image positioned absolutely
    top: '20px',           // Adjust as needed to place it where you want
    left: '20px',          // Adjust as needed to place it in the corner
  },
  profileHeader: {
    position: 'relative',  // Make the header relative for absolute positioning of the image
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '40px',       // Add padding to ensure content doesn’t overlap with the image
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Aligns items in the center after the image is positioned separately
  },
  nameAndButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center aligns items horizontally
    justifyContent: 'flex-start',
    width: '100%',
  },
  editButton: {
    alignSelf: 'center',  // Keep the button in the center under the name and details
    marginTop: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileSection: {
    marginBottom: '10px',
  },
};

export default StudentLandingPage;

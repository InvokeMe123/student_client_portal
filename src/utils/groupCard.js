import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage methods
import { updateDoc,getDocs ,doc, where } from 'firebase/firestore'; // Firestore update methods
import { firestore, storage } from '../firebase_setup/firebase'; // Your Firebase setup
import React,{useState} from 'react';
import { collection,query} from 'firebase/firestore'; // Firestore functions


const GroupCard = ({groupName, projectTitle, studentEmails=[], description,fileUrl,client,isCreator}) => {
  const [isEditing, setIsEditing] = useState(false); // Control file upload form visibility
  const [newFileUrl, setNewFileUrl] = useState(fileUrl); // Track new file URL
  const [uploading, setUploading] = useState(false); // Track uploading state
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setUploading(true);
    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `group_files/${file.name}`);
      const filesnapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(filesnapshot.ref);
      console.log(groupName);
      // Log the download URL
      console.log("File uploaded to Firebase Storage:", downloadURL);
      
  
      // Fetch all groups and find the specific group by name
      const groupsRef = collection(firestore, 'groups');
      const snapshot = await getDocs(groupsRef);
      const groupDoc = snapshot.docs.find(doc => doc.data().groupname === groupName);
  
      if (groupDoc) {
        // Update the Firestore document
        await updateDoc(groupDoc.ref, { fileDownloadUrl: downloadURL });
        console.log('File URL updated in Firestore:', downloadURL);
        
  
        // Set new file URL in the state and stop editing
        setNewFileUrl(downloadURL);
        setIsEditing(false);
      } else {
        console.error('No matching group document found.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div style={styles.cardContainer}>
      <h2 style={styles.cardTitle}>{groupName}</h2>
      <h4 style={styles.cardSubtitle}>{projectTitle}</h4>
      <p><strong>Students:</strong> {studentEmails.join(', ')}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Client:</strong> {client}</p>
      {isEditing && (
        <div style={styles.fileUploadContainer}>
          <input type="file" onChange={handleFileChange} />
          {uploading && <p>Uploading...</p>} {/* Show uploading status */}
        </div>
      )}

      <div style={styles.buttonGroup}>
        <button onClick={() => window.open(fileUrl, "_blank")} style={styles.viewButton}>View File</button>
        <a href={fileUrl} download style={styles.downloadLink}>Download</a>
        <button style={styles.chatButton}>Open Chat</button>
        
        {isCreator && (
          <button onClick={() => setIsEditing(!isEditing)} style={styles.editButton}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
        {/* Show file upload option when editing is true */}
      
        
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  chatButton: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cardTitle: {
    color: '#1a73e8',
    fontSize: '22px',
    marginBottom: '10px',
  },
  cardSubtitle: {
    color: '#333',
    fontSize: '18px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  viewButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  downloadLink: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center'
  }
};

export default GroupCard;

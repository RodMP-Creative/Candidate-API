import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedUsers, setSavedUsers] = useState<Candidate[]>([]);

  useEffect(() => {
    const users: Candidate[] = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setSavedUsers(users);
  }, []);

  const deleteUser = (index: number) => {
    const updatedUsers = savedUsers.filter((_, i) => i !== index);
    setSavedUsers(updatedUsers);
    localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Saved Candidates</h2>
      {savedUsers.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        savedUsers.map((user, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              backgroundColor: 'lightblue',
              borderRadius: '8px',
              padding: '1rem',
            }}
          >
            <img src={user.avatar_url} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ borderRight: '1px solid gray', paddingRight: '1rem' }}>
                <h3>{user.login}</h3>
              </div>
              <div style={{ borderRight: '1px solid gray', paddingRight: '1rem' }}>
                <p>{user.location || 'Location: not available'}</p>
              </div>
              <div style={{ borderRight: '1px solid gray', paddingRight: '1rem' }}>
                <p>{user.company || 'Company: not available'}</p>
              </div>
              <div style={{ borderRight: '1px solid gray', paddingRight: '1rem' }}>
                <p>{user.bio || 'Bio: not available'}</p>
              </div>
              <div>
                <p>{user.email || 'Email: not available'}</p>
              </div>
            </div>
            <button onClick={() => deleteUser(index)} style={{ backgroundColor: 'red', color: 'white' }}>-</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;

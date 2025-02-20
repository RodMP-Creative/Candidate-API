import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const UserCard = () => {
  const [user, setUser] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const users: Candidate[] = await searchGithub();
      if (users.length > 0) {
        const fullUser = await searchGithubUser(users[0].login);
        if (fullUser.message === 'Not Found') {
          throw new Error('User not found');
        }
        setUser(fullUser);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError('User not found. Trying to fetch another user...');
      setTimeout(fetchUser, 2000); 
    }
  };

  const saveUser = () => {
    const savedUsers: Candidate[] = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    if (user) {
      savedUsers.push(user);
      localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
      fetchUser();
    }
  };

  const skipUser = () => {
    fetchUser();
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-card" style={{ textAlign: 'center' }}>
      <img src={user.avatar_url} alt="Profile" />
      <h2>{user.login}</h2>
      <p>{user.location || 'Location: not available'}</p>
      <p>{user.company || 'Company: not available'}</p>
      <p>{user.bio || 'Bio: not available'}</p>
      <p>{user.email || 'Email: not available'}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={saveUser} style={{ backgroundColor: 'green', color: 'white' }}>+</button>
        <button onClick={skipUser} style={{ backgroundColor: 'red', color: 'white' }}>-</button>
      </div>
    </div>
  );
};

export default UserCard;

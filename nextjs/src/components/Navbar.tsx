import React from 'react';
import Auth from '../components/Auth';

const Navbar: React.FC = () => 
{
  const handleLogout = () => 
  {
    const auth = new Auth();
    auth.logout();
    console.log('User logged out.');
  }

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Token Lab</h1>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Log Out
      </button>
    </nav>
  );
}

const styles = 
{
  navbar: 
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  title: 
  {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoutButton: 
  {
    padding: '8px 16px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  }
}

export default Navbar;

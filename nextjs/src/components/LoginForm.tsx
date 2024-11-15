import { useState } from 'react';
import apidatamanager from './APIDataManager';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apidatamanager.login(username, password);

      if (response && response.message) 
      {
        setMessage(response.message); 
      } 
      else 
      {
        throw new Error('Login failed: Invalid response!');
      }
    } 
    catch (error) 
    {
      console.error('Login error:', error);
      setMessage((error as Error).message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;

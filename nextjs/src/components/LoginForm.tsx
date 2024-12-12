import { useState } from 'react';
import Auth from './Auth';

const LoginForm: React.FC = () => 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessageState] = useState('');

  const handleSubmit = async (event: React.FormEvent) => 
  {
    event.preventDefault();
    const auth = new Auth();

    const resultMessage = await auth.login(username, password);
    await setMessage(resultMessage || 'Login successful');
  }

  async function setMessage(newMessage: string) 
  {
    setMessageState(newMessage);
    await resetMessage();
  }

  async function resetMessage() 
  {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setMessageState('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"/>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"/>
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
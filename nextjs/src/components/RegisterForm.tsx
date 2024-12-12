import { useState } from 'react'; 
import apidatamanager from './APIDataManager'; 
//import HashManager from '../shared_components/HashManager';
 
const RegisterForm: React.FC = () => 
{ 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [message, setMessageState] = useState(''); 
 
  const handleSubmit = async (event: React.FormEvent) => 
  { 
    event.preventDefault(); 

    //const passwordHash = HashManager.generateDefaultHash(password);
  //  const response = await apidatamanager.register(username, passwordHash, email); 

    const response = await apidatamanager.register(username, password, email); 
 
    if (response && response.message)  
    { 
      await setMessage(response.message); 
    } 
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
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter email" 
        /> 
        <br /> 
        <button type="submit">Register</button> 
      </form> 
 
      {message && <p>{message}</p>} 
    </div> 
  ); 
}
 
export default RegisterForm;
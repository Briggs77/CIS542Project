import { useState } from 'react';
import DynamicObject from '../shared_components/DynamicObject';
import apidatamanager from './APIDataManager';
import Auth from './Auth';

interface TestFormProps 
{
  collection: string;
}

const TestForm: React.FC<TestFormProps> = ({ collection }) => 
  {
  const [input, setInput] = useState('');
  const [message, setMessageState] = useState('');

  const auth = new Auth();
  const dynamicObject = new DynamicObject();

  async function handleSubmit(event: React.FormEvent) 
  {
    event.preventDefault();

    dynamicObject.addField('Field', input);

    const { metricsHash, currentTime, hashedCurrentTime } = auth.getMetrics_key();
    const token = auth.getToken();
    if (!token) 
    {
      console.error('No token found.');
      await setMessage('User not logged in');
      return;
    }

    const result = await apidatamanager.addDocument(collection, dynamicObject, token, metricsHash, currentTime, hashedCurrentTime);
    await setMessage(result.message);
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
        <label>
          Field:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
          />
        </label>
        <button type="submit">Add Document</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default TestForm;

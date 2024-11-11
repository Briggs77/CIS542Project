import { useState } from 'react';
import DynamicObject from '../shared_components/DynamicObject'; 

const TestForm: React.FC = () => {
  const [input1, setInput1] = useState('');  
  const [input2, setInput2] = useState('');  
  const [dynamicObject] = useState(new DynamicObject());
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dynamicObject.addField('field1', input1);
    dynamicObject.addField('field2', input2);

    const response = await fetch('/api/TestAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dynamicObject), 
    });

    const result = await response.json(); 
    setMessage(result.message); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter first text"
        />
        <br />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter second text"
        />
        <br />
        <button type="submit">Add to Object and Send to API</button>
      </form>

      {message && <p>{message}</p>} 
    </div>
  );
};

export default TestForm;
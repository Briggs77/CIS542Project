//https://www.w3schools.com/react/react_forms.asp
//https://www.w3schools.com/react/react_useeffect.asp

import { useState } from 'react';
import DropdownSelector from '../components/DropdownSelector';
import DynamicObject from '../shared_components/DynamicObject';
import apidatamanager from './APIDataManager';

interface TestFormProps {
  collection: string; 
}

const TestForm: React.FC<TestFormProps> = ({ collection }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [dynamicObject] = useState(new DynamicObject());
  const [message, setMessage] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  function handleSelectId(id: string | null) {
    setSelectedDocumentId(id);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    dynamicObject.addField('IpAddress', input1);
    dynamicObject.addField('AccessTime', input2);

    let result;
    if (selectedDocumentId != null) {
      console.log("ID before updateDocument:", selectedDocumentId);
      result = await apidatamanager.updateDocument(collection, selectedDocumentId, dynamicObject);
    } 
    else if (selectedDocumentId == null)
    {
      console.log("ID before addDocument:", selectedDocumentId);
      result = await apidatamanager.addDocument(collection, dynamicObject);
    }
    
    setMessage(result.message);
  };

  return (
    <div>
      <DropdownSelector
        collection={collection}
        onSelect={handleSelectId}
      />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <br />
        <button type="submit">Add to Object and Send to API</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TestForm;

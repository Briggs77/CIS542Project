import React, { useState, useEffect } from 'react';
import apidatamanager from './APIDataManager';

interface DropdownSelectorProps {
  collection: string;
  onSelect(selectedId: string | null): void;
}

function DropdownSelector({ collection, onSelect }: DropdownSelectorProps): React.ReactElement 
{
  const [ID_List, setID_List] = useState<string[]>([]); // ID_List initial value as empty string array. 

  useEffect(() => {  //useEffect is only runs when the component initilizes.
    async function fetchID_List() {
      const ids = await apidatamanager.getDocumentIds(collection);
      setID_List(ids);
    }
    
    fetchID_List();
  }, []); 

  function handleSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = event.target.value || null;
    onSelect(selectedId); //Passes SelectedID to parent component every time the value changes. 
  }

  return (
    <div>
      <label htmlFor="document-id-dropdown">Select Document ID:</label>
      <select id="document-id-dropdown" onChange={handleSelection}>
        <option value="">Add New Document</option>
        {ID_List.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelector;

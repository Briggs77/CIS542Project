import React from 'react';
import TestForm from '../components/TestForm';
import Button from '../components/HeaderButton';


const TestPage: React.FC = () => {
  const collectionName = "test"; 

  return (
    <div>
      <div>
            <h1>Send Text to API</h1>
            <TestForm collection={collectionName} />
      </div>
    </div>
  );
};

export default TestPage;

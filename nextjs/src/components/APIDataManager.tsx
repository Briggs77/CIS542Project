async function getDocumentIds(collection: string) {
  const response = await fetch(`/api/GetDocumentIds?collection=${collection}`, {
    method: 'GET',
  });

  if (response.ok) {
    const data = await response.json();
    return data.documentIds;
  }
  console.error('Error fetching document IDs:', response.statusText);


};

async function addDocument(collection: string, data: object) {
  const response = await fetch('/api/AddDocument', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection, ...data }),
  });

  if (response.ok) {
    return await response.json();

  }
  console.error('Error adding document:', response.statusText);

};

async function updateDocument(collection: string, id: string, data: object) {
  const response = await fetch('/api/UpdateDocument', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection, id, ...data }),
  });

  if (response.ok) {
    return await response.json();
  }
  console.error('Error updating document:', response.statusText);

};

async function getDocument(collection: string, id: string) {
  const response = await fetch('/api/GetDocument', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection, id}),
  });

  if (response.ok) {
    return await response.json();
  }
  console.error('Error getting document:', response.statusText);

};

const apidatamanager = {
  addDocument,
  updateDocument,
  getDocumentIds,
  getDocument,
};

export default apidatamanager;

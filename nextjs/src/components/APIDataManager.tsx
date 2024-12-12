async function addDocument(collection: string, data: object, token: string, metricsHash: string, currentTime: string, currentTimeHash: string) 
{
  const response = await fetch('/api/AddDocument', 
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
      body: JSON.stringify({ collection, token, metricsHash, currentTime, currentTimeHash, ...data }),
  })

  if (response.ok) 
  {
    const responseData = await response.json();
    return responseData || "MongoDB is not initialized.";
  }
}

async function login(username: string, password: string, metrics: Record<string, string>) 
{

  const response = await fetch('/api/login', 
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, metrics }),
  })

  if (response.ok) 
  {
    const data = await response.json();
    return data || "MongoDB is not initialized.";
  }
}

async function register(username: string, password: string, email: string) 
{
  const response = await fetch('/api/Register', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })

  if (response.ok) 
  {
    const data = await response.json();
    return data || "MongoDB is not initialized.";
  }
}

const apidatamanager = {addDocument, login, register};

export default apidatamanager;
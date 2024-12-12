import React, { useState } from 'react';
import Auth from './Auth';
import { jwtDecode } from 'jwt-decode';

const TokenInspector: React.FC = () => 
  {
  const [decodedToken, setDecodedToken] = useState<Record<string, any> | null>(null);

  const convertTo_readableTime = (timestamp: number): string => 
  {
    return new Date(timestamp * 1000).toLocaleString();
  }

  const inspectToken = () => 
  {
    const auth = new Auth();
    const token = auth.getToken();

    if (!token) 
    {
      setDecodedToken(null);
      return;
    }

    try 
    {
      const decodedToken = jwtDecode<Record<string, any>>(token);
      if (decodedToken.iat) 
      {
        decodedToken.iatReadable = convertTo_readableTime(decodedToken.iat);
      }
      if (decodedToken.exp) 
      {
        decodedToken.expReadable = convertTo_readableTime(decodedToken.exp);
      }
      setDecodedToken(decodedToken);
    } 
    catch (error) 
    {
      console.error('Could not decode token:', error);
      setDecodedToken(null);
    }
  }

  return (
    <div>
      <h2>Token Inspector</h2>
      <button onClick={inspectToken}>Inspect Token</button>
      {decodedToken ? (
        <div>
          <h3>Decoded Token:</h3>
          <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
        </div>
      ) : (
        <p>No token.</p>
      )}
    </div>
  );
}

export default TokenInspector;

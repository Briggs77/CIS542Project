import jwt from 'jsonwebtoken';

const SECRET_KEY = 'supersecretkey';

class TokenService 
{
  static createToken(userId: string): string 
  {
    const payload = { UID: userId }; 
    const options = { expiresIn: '1h' };

    const sessionToken = jwt.sign(payload, SECRET_KEY, options);
    return sessionToken;
  }

  static verifyToken(token: string): boolean 
  {
    try 
    {
      jwt.verify(token, SECRET_KEY);
      return true;
    } 
    catch 
    {
      return false;
    }
  }

  static isExpired(token: string): boolean 
  {
    const decodedToken = jwt.decode(token) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (currentTime > decodedToken.exp) 
    {
      return true;   
    }
    return false;     
  }
}

export default TokenService;
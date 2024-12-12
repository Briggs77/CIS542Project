import TokenService from './TokenService';
import HashManager from '../shared_components/HashManager';
import mongoDBService from './MongoDBService';
import { ObjectId } from 'mongodb';

export default class SessionManager 
{
  static async createSessionToken(userId: string, metrics: Record<string, string>): Promise<{ token: string; randomInt: number }> 
  {
    console.log('Session started');
    console.log('14Received metrics:', metrics);

    const randomInt = Math.floor(Math.random() * 900000) + 100000;
    const token = TokenService.createToken(userId);

    const tokenHash = HashManager.generateDefaultHash(token);

    const metricsString = JSON.stringify(metrics);
    const metricsHash = HashManager.generateDefaultHash(metricsString);

    const sessionDocument = 
    {
      userId,
      randomInt,
      metricsHash,
      tokenHash,
      active: true,
      expired: false
    };

    await mongoDBService.init();

    await mongoDBService.createDocument('sessions', sessionDocument);

    return { token, randomInt };
  }

  static async metricsCheck(session: any, currentTime: string, currentTimeHash: string): Promise<boolean> 
  {
    const salt = session.randomInt;
    const computedTimeHash = HashManager.generateHash(currentTime, salt);

    console.log('Provided time hash:', currentTimeHash);
    console.log('Computed time hash:', computedTimeHash);

    if (currentTimeHash !== computedTimeHash) 
    {
      return false;
    }

    const collection = 'usedHashes';
    const objectId = new ObjectId(session.userId);
    const existingDocument = await mongoDBService.readDocument(collection, { _id: objectId });

    if (!existingDocument) 
    {
      await mongoDBService.createDocument(collection, { _id: objectId, hashes: [currentTimeHash] });
      return true;
    }

    if (existingDocument.hashes.includes(currentTimeHash)) 
    {
      return false;
    }

    await mongoDBService.updateDocument(collection, session.userId, { $push: { hashes: currentTimeHash } as any });

    return true;
  }

  static async checkSession(token: string, metricsHash: string, currentTime: string, currentTimeHash: string): Promise<boolean> 
  {
    await mongoDBService.init();
    let tokenValidity = false;
    let isExpired_local = false;
  
    if (!TokenService.verifyToken(token)) 
    {
      return false;
    }
  
    if (TokenService.isExpired(token)) 
    {
      isExpired_local = true;
    }
  
    console.log('Metrics hash:', metricsHash);
    console.log('Current time:', currentTime);
    console.log('Current time hash:', currentTimeHash);
  
    const tokenHash = HashManager.generateDefaultHash(token);
    const session = await mongoDBService.readDocument('sessions', { tokenHash });
  
    if (!session) 
    {
      console.log('Invalid Token (should be impossible)');
      return false;
    }
  
    console.log('Session found:', session);
  
    if (isExpired_local) 
    {
      await mongoDBService.updateDocument('sessions', session._id.toString(), { expired: true, active: false });
      return false;
    }
  
    const timeHashValid = await this.metricsCheck(session, currentTime, currentTimeHash);
    if (!timeHashValid) 
    {
      await mongoDBService.updateDocument('sessions', session._id.toString(), { active: false });
      return false;
    }
    if (session.metricsHash !== metricsHash) 
    {
      console.log('Metrics hash mismatch');
      return false;
    }
    
    if (session.active === true) 
    {
      if (session.expired === false) 
      {
        tokenValidity = true;
      }
    }
    
    return tokenValidity;
  }
  
}

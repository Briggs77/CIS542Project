import mongoDBService from './MongoDBService';
import SessionManager from './SessionManager';

export default class AuthService 
{
    static async login(username: string, passwordHash: string, metrics: Record<string, string>) 
    {
        await mongoDBService.init();

        if (!username || !passwordHash) 
        {
            return { status: 201, message: 'Please Provide Username and password' };
        }

        const user = await mongoDBService.getUserByUsername(username);
        if (!user) 
        {
            return { status: 201, message: 'Invalid username' };
        }

        if (passwordHash !== user.passwordHash) {
            return { status: 201, message: 'Invalid password' };
        }

        const { token, randomInt } = await SessionManager.createSessionToken(user._id.toString(), metrics);
        return {status: 200, message: 'Access Granted!', token, randomInt};
    }
}
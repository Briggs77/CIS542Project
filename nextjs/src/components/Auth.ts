import apidatamanager from './APIDataManager';
import MetricsCollector from '../components/Metrics';
import HashManager from '../shared_components/HashManager';

class Auth 
{
  async login(username: string, password: string): Promise<string | undefined> 
  {
    const metricsCollector = new MetricsCollector();
    const metrics = metricsCollector.getMetrics();
    console.log('Password:', password);
    const passwordHash = HashManager.generateDefaultHash(password);
    console.log('PasswordHash:', passwordHash);

    const response = await apidatamanager.login(username, passwordHash, metrics);
    if (response && response.token) 
    {
      console.log('Token:', response.token);
      this.setToken(response.token);
      this.storeSalt(response.randomInt);
      return response.message;
    } 
    else if (response && response.message) 
    {
      return response.message;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('salt');
    console.log('Token and salt removed.');
  }

  setToken(token: string): void 
  {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null 
  {
    return localStorage.getItem('authToken');
  }

  storeSalt(salt: number): void 
  {
    console.log('Storing salt:', salt);
    localStorage.setItem('salt', salt.toString());
  }

  getSalt(): number 
  {
    const salt = localStorage.getItem('salt');
    return salt ? parseInt(salt, 10) : 0;
  }
  
  getMetrics_key(): { metricsHash: string; currentTime: string; hashedCurrentTime: string } 
  {
    const metricsCollector = new MetricsCollector();
    const metrics = metricsCollector.getMetrics();
    const currentTime = metricsCollector.getCurrentMs();
  
    const salt = this.getSalt();
    const hashedCurrentTime = HashManager.generateHash(currentTime, salt);
  
    const metricsString = JSON.stringify(metrics);
    const metricsHash = HashManager.generateDefaultHash(metricsString); 
  
    return {metricsHash, currentTime, hashedCurrentTime,};
  }
}

export default Auth;